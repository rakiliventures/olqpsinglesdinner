<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentsController extends Controller
{
    public function index(): Response
    {
        $event = Event::query()->orderBy('date')->first();

        $query = Payment::query()
            ->with(['attendee:id,name,event_id', 'attendee.event:id,name'])
            ->orderByDesc('created_at');

        if ($event) {
            $query->whereHas('attendee', function ($q) use ($event) {
                $q->where('event_id', $event->id);
            });
        }

        $payments = $query->get(['id', 'attendee_id', 'amount', 'mpesa_code', 'status', 'method', 'created_at']);

        $payments = $payments->map(function (Payment $p) {
            return [
                'id' => $p->id,
                'attendee_name' => $p->attendee?->name,
                'event_name' => $p->attendee?->event?->name,
                'amount' => (float) $p->amount,
                'mpesa_code' => $p->mpesa_code,
                'status' => $p->status,
                'method' => $p->method,
                'created_at' => $p->created_at?->toDateTimeString(),
            ];
        });

        return Inertia::render('Admin/Payments/Index', [
            'event' => $event ? [
                'id' => $event->id,
                'name' => $event->name,
                'date' => $event->date->toDateString(),
            ] : null,
            'payments' => $payments,
        ]);
    }

    public function update(Request $request, Payment $payment): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,confirmed,failed'],
        ]);

        $payment->update(['status' => $validated['status']]);

        return back()->with('success', 'Payment updated.');
    }
}
