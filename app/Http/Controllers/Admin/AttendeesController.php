<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\Event;
use App\Models\Payment;
use App\Services\TicketPdfService;
use App\Mail\PaymentConfirmedMail;
use App\Mail\PaymentReminderMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
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

    public function resendTicket(Attendee $attendee): RedirectResponse
    {
        try {
            // Load attendee with payments and event
            $attendee = $attendee->load(['payments', 'event']);
            
            // Calculate total confirmed payments
            $totalConfirmedAmount = $attendee->payments
                ->where('status', 'confirmed')
                ->sum('amount');
            
            // Check if attendee is fully paid (4,999 and above)
            if ($totalConfirmedAmount < 4999) {
                return back()->with('error', 'Ticket can only be resent to fully paid attendees (Ksh. 4,999 and above).');
            }
            
            // Get the latest confirmed payment
            $latestPayment = $attendee->payments
                ->where('status', 'confirmed')
                ->sortByDesc('created_at')
                ->first();
            
            if (!$latestPayment) {
                return back()->with('error', 'No confirmed payment found for this attendee.');
            }
            
            // Send the ticket email
            Mail::to($attendee->email)->send(new PaymentConfirmedMail($latestPayment));
            
            Log::info('Ticket resent successfully', [
                'attendee_id' => $attendee->id,
                'attendee_name' => $attendee->name,
                'attendee_email' => $attendee->email,
                'total_confirmed' => $totalConfirmedAmount
            ]);
            
            return back()->with('success', 'Event ticket resent successfully to ' . $attendee->email);
            
        } catch (\Exception $e) {
            Log::error('Failed to resend ticket', [
                'attendee_id' => $attendee->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->with('error', 'Failed to resend ticket. Please try again.');
        }
    }

    public function sendReminder(Attendee $attendee): RedirectResponse
    {
        try {
            // Load attendee with payments and event
            $attendee = $attendee->load(['payments', 'event']);
            
            // Calculate total confirmed payments
            $totalPaid = $attendee->payments
                ->where('status', 'confirmed')
                ->sum('amount');
            
            $eventAmount = (float) $attendee->event->amount;
            $remainingBalance = $eventAmount - $totalPaid;
            
            // Check if attendee is not fully paid
            if ($totalPaid >= $eventAmount) {
                return back()->with('error', 'Reminder can only be sent to attendees who are not fully paid.');
            }
            
            // Calculate days remaining until event
            $eventDate = \Carbon\Carbon::create(2025, 10, 31); // October 31st, 2025
            $daysRemaining = max(0, $eventDate->diffInDays(now(), false));
            
            // Send the reminder email
            Mail::to($attendee->email)->send(new PaymentReminderMail(
                $attendee, 
                $totalPaid, 
                $remainingBalance, 
                $daysRemaining
            ));
            
            Log::info('Payment reminder sent successfully', [
                'attendee_id' => $attendee->id,
                'attendee_name' => $attendee->name,
                'attendee_email' => $attendee->email,
                'total_paid' => $totalPaid,
                'remaining_balance' => $remainingBalance,
                'days_remaining' => $daysRemaining
            ]);
            
            return back()->with('success', 'Payment reminder sent successfully to ' . $attendee->email);
            
        } catch (\Exception $e) {
            Log::error('Failed to send payment reminder', [
                'attendee_id' => $attendee->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->with('error', 'Failed to send reminder. Please try again.');
        }
    }

    public function bulkSendReminders(): RedirectResponse
    {
        try {
            $event = Event::query()->orderBy('date')->first();
            if (!$event) {
                return back()->with('error', 'No event found.');
            }

            // Get all attendees who are not fully paid
            $attendees = Attendee::query()
                ->with(['payments', 'event'])
                ->where('event_id', $event->id)
                ->get();

            $partiallyPaidAttendees = $attendees->filter(function ($attendee) {
                $totalPaid = $attendee->payments->where('status', 'confirmed')->sum('amount');
                return $totalPaid < 4999;
            });

            if ($partiallyPaidAttendees->isEmpty()) {
                return back()->with('info', 'No partially paid attendees found to send reminders to.');
            }

            $eventAmount = (float) $event->amount;
            $eventDate = \Carbon\Carbon::create(2025, 10, 31); // October 31st, 2025
            $daysRemaining = max(0, $eventDate->diffInDays(now(), false));

            $successCount = 0;
            $errorCount = 0;

            foreach ($partiallyPaidAttendees as $attendee) {
                try {
                    $totalPaid = $attendee->payments->where('status', 'confirmed')->sum('amount');
                    $remainingBalance = $eventAmount - $totalPaid;

                    Mail::to($attendee->email)->send(new PaymentReminderMail(
                        $attendee,
                        $totalPaid,
                        $remainingBalance,
                        $daysRemaining
                    ));

                    $successCount++;
                } catch (\Exception $e) {
                    $errorCount++;
                    Log::error('Failed to send bulk reminder to attendee', [
                        'attendee_id' => $attendee->id,
                        'error' => $e->getMessage()
                    ]);
                }
            }

            Log::info('Bulk reminders sent', [
                'total_attempted' => $partiallyPaidAttendees->count(),
                'successful' => $successCount,
                'failed' => $errorCount
            ]);

            if ($errorCount > 0) {
                return back()->with('warning', "Reminders sent to {$successCount} attendees. {$errorCount} failed to send.");
            }

            return back()->with('success', "Payment reminders sent successfully to {$successCount} attendees.");

        } catch (\Exception $e) {
            Log::error('Failed to send bulk reminders', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'Failed to send bulk reminders. Please try again.');
        }
    }

    public function bulkResendTickets(): RedirectResponse
    {
        try {
            $event = Event::query()->orderBy('date')->first();
            if (!$event) {
                return back()->with('error', 'No event found.');
            }

            // Get all attendees who are fully paid
            $attendees = Attendee::query()
                ->with(['payments', 'event'])
                ->where('event_id', $event->id)
                ->get();

            $fullyPaidAttendees = $attendees->filter(function ($attendee) {
                $totalPaid = $attendee->payments->where('status', 'confirmed')->sum('amount');
                return $totalPaid >= 4999;
            });

            if ($fullyPaidAttendees->isEmpty()) {
                return back()->with('info', 'No fully paid attendees found to resend tickets to.');
            }

            $successCount = 0;
            $errorCount = 0;

            foreach ($fullyPaidAttendees as $attendee) {
                try {
                    $latestPayment = $attendee->payments
                        ->where('status', 'confirmed')
                        ->sortByDesc('created_at')
                        ->first();

                    if ($latestPayment) {
                        Mail::to($attendee->email)->send(new PaymentConfirmedMail($latestPayment));
                        $successCount++;
                    } else {
                        $errorCount++;
                        Log::warning('No confirmed payment found for fully paid attendee', [
                            'attendee_id' => $attendee->id
                        ]);
                    }
                } catch (\Exception $e) {
                    $errorCount++;
                    Log::error('Failed to resend ticket to attendee', [
                        'attendee_id' => $attendee->id,
                        'error' => $e->getMessage()
                    ]);
                }
            }

            Log::info('Bulk tickets resent', [
                'total_attempted' => $fullyPaidAttendees->count(),
                'successful' => $successCount,
                'failed' => $errorCount
            ]);

            if ($errorCount > 0) {
                return back()->with('warning', "Tickets resent to {$successCount} attendees. {$errorCount} failed to send.");
            }

            return back()->with('success', "Event tickets resent successfully to {$successCount} attendees.");

        } catch (\Exception $e) {
            Log::error('Failed to resend bulk tickets', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'Failed to resend bulk tickets. Please try again.');
        }
    }
}
