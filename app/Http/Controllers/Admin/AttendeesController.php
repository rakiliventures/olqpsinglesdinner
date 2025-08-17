<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\Event;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AttendeesController extends Controller
{
    public function index(): Response
    {
        $event = Event::query()->orderBy('date')->first();

        $attendees = collect();
        if ($event) {
            $attendees = Attendee::query()
                ->with(['payments' => function ($q) {
                    $q->select('id', 'attendee_id', 'amount', 'status');
                }])
                ->where('event_id', $event->id)
                ->orderBy('name')
                ->get(['id', 'event_id', 'name', 'email', 'whatsapp', 'gender', 'is_olqp_member']);
        }

        $attendees = $attendees->map(function (Attendee $a) use ($event) {
            $total = (float) ($a->payments->sum('amount'));
            $status = $a->payments->last()?->status ?? 'pending';
            return [
                'id' => $a->id,
                'name' => $a->name,
                'email' => $a->email,
                'whatsapp' => $a->whatsapp,
                'gender' => $a->gender,
                'is_olqp_member' => $a->is_olqp_member,
                'total_amount' => $total,
                'status' => $status,
                'event_name' => $event?->name,
            ];
        });

        return Inertia::render('Admin/Attendees/Index', [
            'event' => $event ? [
                'id' => $event->id,
                'name' => $event->name,
                'date' => $event->date->toDateString(),
                'amount' => (float) $event->amount,
            ] : null,
            'attendees' => $attendees,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $event = Event::query()->orderBy('date')->firstOrFail();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'is_olqp_member' => ['required', 'boolean'],
            'amount' => ['nullable', 'numeric', 'min:0'],
            'status' => ['nullable', 'string', 'in:pending,confirmed,failed'],
        ]);

        DB::transaction(function () use ($validated, $event, $request) {
            $attendee = Attendee::query()->create([
                'event_id' => $event->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'whatsapp' => $validated['whatsapp'],
                'gender' => $validated['gender'] ?? null,
                'is_olqp_member' => (bool) $validated['is_olqp_member'],
            ]);

            if (! empty($validated['amount'])) {
                $attendee->payments()->create([
                    'amount' => $validated['amount'],
                    'mpesa_code' => $request->string('mpesa_code', ''),
                    'status' => $validated['status'] ?? 'pending',
                    'method' => 'manual',
                ]);
            }
        });

        return back()->with('success', 'Attendee created.');
    }

    public function update(Request $request, Attendee $attendee): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'is_olqp_member' => ['required', 'boolean'],
            'status' => ['nullable', 'string', 'in:pending,confirmed,failed'],
        ]);

        $attendee->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'gender' => $validated['gender'] ?? null,
            'is_olqp_member' => (bool) $validated['is_olqp_member'],
        ]);

        if ($request->filled('status')) {
            $payment = $attendee->payments()->latest('id')->first();
            if ($payment) {
                $payment->update(['status' => $validated['status']]);
            }
        }

        return back()->with('success', 'Attendee updated.');
    }

    public function destroy(Attendee $attendee): RedirectResponse
    {
        $attendee->delete();

        return back()->with('success', 'Attendee deleted.');
    }
}
