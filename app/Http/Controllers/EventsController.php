<?php

namespace App\Http\Controllers;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EventsController extends Controller
{
    public function singlesEvent()
    {
        return Inertia::render('Events/SinglesEvent');
    }

    public function purchaseTicket(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'event_id' => ['nullable', 'integer', 'exists:events,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', 'max:255'],
            'is_olqp_member' => ['required', 'boolean'],
            'amount' => ['required', 'numeric', 'min:0'],
            'mpesa_code' => ['required', 'string', 'max:255'],
        ]);

        $event = null;
        if (! empty($validated['event_id'])) {
            $event = Event::query()->find($validated['event_id']);
        }

        if (! $event) {
            $event = Event::query()->orderBy('date')->first();
        }

        if (! $event) {
            throw ValidationException::withMessages([
                'event_id' => 'No events are available at the moment. Please contact the administrator.',
            ]);
        }

        try {
            DB::beginTransaction();

            $attendee = Attendee::query()->create([
                'event_id' => $event->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'whatsapp' => $validated['whatsapp'],
                'gender' => $validated['gender'],
                'is_olqp_member' => (bool) $validated['is_olqp_member'],
            ]);

            $attendee->payments()->create([
                'amount' => $validated['amount'],
                'mpesa_code' => $validated['mpesa_code'],
                'status' => 'pending',
                'method' => 'mpesa',
            ]);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Failed to purchase ticket', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw ValidationException::withMessages([
                'name' => 'We could not process your request at this time. Please try again.',
            ]);
        }

        return back()->with('success', 'Ticket recorded successfully.');
    }
}
