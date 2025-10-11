<?php

namespace App\Http\Controllers;

use App\Mail\NewPaymentNotificationMail;
use App\Models\Attendee;
use App\Models\Event;
use App\Models\GroupTicket;
use App\Models\Payment;
use App\Services\TicketPdfService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EventsController extends Controller
{
    public function singlesEvent()
    {
        return Inertia::render('Events/SinglesEvent');
    }

    public function findAttendee(Request $request)
    {
        $validated = $request->validate([
            'attendee_id' => ['required', 'integer', 'exists:attendees,id'],
        ]);

        $attendee = Attendee::with('payments')
            ->where('id', $validated['attendee_id'])
            ->first();

        if (!$attendee) {
            return response()->json([
                'error' => 'Attendee not found. Please check the ID and try again.'
            ], 404);
        }

        return response()->json([
            'attendee' => $attendee
        ]);
    }

    public function addPayment(Request $request)
    {
        $validated = $request->validate([
            'attendee_id' => ['required', 'integer', 'exists:attendees,id'],
            'mpesa_code' => [
                'required', 
                'string', 
                'max:20',
                'min:6',
                'regex:/^[A-Z0-9]+$/',
                'unique:payments,mpesa_code'
            ],
            'amount' => ['required', 'numeric', 'min:0'],
        ], [
            'mpesa_code.regex' => 'M-Pesa code should only contain letters and numbers.',
            'mpesa_code.unique' => 'This M-Pesa code has already been used. Please check your code and try again.',
            'mpesa_code.min' => 'M-Pesa code should be at least 6 characters long.',
            'mpesa_code.max' => 'M-Pesa code should not exceed 20 characters.',
        ]);

        $attendee = Attendee::with('payments')->find($validated['attendee_id']);

        if (!$attendee) {
            return response()->json([
                'error' => 'Attendee not found.'
            ], 404);
        }

        // Check if total confirmed payments would exceed 4999
        $totalConfirmedPayments = $attendee->payments()
            ->where('status', 'confirmed')
            ->sum('amount');

        if (($totalConfirmedPayments + $validated['amount']) > 4999) {
            return response()->json([
                'error' => 'Payment amount would exceed the total required amount of Ksh. 4,999.'
            ], 422);
        }

        try {
            DB::beginTransaction();

            $payment = $attendee->payments()->create([
                'amount' => $validated['amount'],
                'mpesa_code' => $validated['mpesa_code'],
                'status' => 'pending',
                'method' => 'mpesa',
            ]);

            // Send admin notification
            try {
                Mail::send(new NewPaymentNotificationMail($payment, $attendee));
            } catch (\Exception $e) {
                Log::error('Failed to send admin notification for additional payment', [
                    'error' => $e->getMessage(),
                    'payment_id' => $payment->id,
                ]);
            }

            DB::commit();

            // Return updated attendee data
            $updatedAttendee = Attendee::with('payments')->find($attendee->id);

            return response()->json([
                'message' => 'Payment has been successfully recorded and is now awaiting confirmation.',
                'attendee' => $updatedAttendee
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Failed to add payment', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'We could not process your payment at this time. Please try again.'
            ], 500);
        }
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
            'mpesa_code' => [
                'required', 
                'string', 
                'max:20',
                'min:6',
                'regex:/^[A-Z0-9]+$/',
                'unique:payments,mpesa_code'
            ],
        ], [
            'mpesa_code.regex' => 'M-Pesa code should only contain letters and numbers.',
            'mpesa_code.unique' => 'This M-Pesa code has already been used. Please check your code and try again.',
            'mpesa_code.min' => 'M-Pesa code should be at least 6 characters long.',
            'mpesa_code.max' => 'M-Pesa code should not exceed 20 characters.',
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

            $payment = $attendee->payments()->create([
                'amount' => $validated['amount'],
                'mpesa_code' => $validated['mpesa_code'],
                'status' => 'pending',
                'method' => 'mpesa',
            ]);

            // Send admin notification
            try {
                Mail::send(new NewPaymentNotificationMail($payment, $attendee));
            } catch (\Exception $e) {
                Log::error('Failed to send admin notification', [
                    'error' => $e->getMessage(),
                    'payment_id' => $payment->id,
                ]);
            }

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

    public function downloadTicket(Attendee $attendee)
    {
        // Load attendee with payments, event, and group ticket
        $attendee = $attendee->load(['payments', 'event', 'groupTicket']);
        
        // Check if attendee is fully paid using the model method
        if (!$attendee->isFullyPaid()) {
            abort(403, 'Ticket download is only available for fully paid attendees.');
        }
        
        // Calculate total confirmed payments for display
        $totalConfirmedAmount = $attendee->payments
            ->where('status', 'confirmed')
            ->sum('amount');
        
        // Get the latest confirmed payment for the ticket
        $latestPayment = $attendee->payments
            ->where('status', 'confirmed')
            ->sortByDesc('created_at')
            ->first();
        
        if (!$latestPayment) {
            abort(404, 'No confirmed payment found for this attendee.');
        }
        
        try {
            $ticketService = new TicketPdfService();
            $pdfPath = $ticketService->generateTicketPdf($attendee, $latestPayment);
            
            if (!$pdfPath || !file_exists($pdfPath)) {
                abort(500, 'Failed to generate ticket PDF.');
            }
            
            $filename = "OLQP_Singles_Dinner_2025_Ticket_{$attendee->id}.pdf";
            
            return response()->download($pdfPath, $filename, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"'
            ])->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            Log::error('Failed to download ticket PDF', [
                'attendee_id' => $attendee->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            abort(500, 'Failed to generate ticket PDF. Please try again.');
        }
    }

    public function purchaseGroupTicket(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'event_id' => ['nullable', 'integer', 'exists:events,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'mpesa_code' => [
                'required', 
                'string', 
                'max:20',
                'min:6',
                'regex:/^[A-Z0-9]+$/',
                'unique:group_tickets,mpesa_code'
            ],
            'attendees' => ['required', 'array', 'size:5'],
            'attendees.*.name' => ['required', 'string', 'max:255'],
            'attendees.*.email' => ['required', 'email', 'max:255'],
            'attendees.*.whatsapp' => ['required', 'string', 'max:255'],
            'attendees.*.gender' => ['required', 'string', 'max:255'],
            'attendees.*.is_olqp_member' => ['required', 'boolean'],
        ], [
            'mpesa_code.regex' => 'M-Pesa code should only contain letters and numbers.',
            'mpesa_code.unique' => 'This M-Pesa code has already been used. Please check your code and try again.',
            'mpesa_code.min' => 'M-Pesa code should be at least 6 characters long.',
            'mpesa_code.max' => 'M-Pesa code should not exceed 20 characters.',
            'attendees.size' => 'Exactly 5 attendees are required for group registration.',
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

        // Validate group amount
        if ($validated['amount'] !== 22500) {
            throw ValidationException::withMessages([
                'amount' => 'Group ticket amount must be exactly Ksh. 22,500 for 5 people.',
            ]);
        }

        try {
            DB::beginTransaction();

            // Create group ticket
            $groupTicket = GroupTicket::create([
                'event_id' => $event->id,
                'total_amount' => 22500,
                'amount_per_person' => 4500, // 22500 / 5
                'mpesa_code' => $validated['mpesa_code'],
                'status' => 'pending',
                'method' => 'mpesa',
            ]);

            // Create attendees for the group first
            $attendees = [];
            foreach ($validated['attendees'] as $attendeeData) {
                $attendee = Attendee::create([
                    'event_id' => $event->id,
                    'group_ticket_id' => $groupTicket->id,
                    'payment_id' => null, // Will be set after creating payment
                    'name' => $attendeeData['name'],
                    'email' => $attendeeData['email'],
                    'whatsapp' => $attendeeData['whatsapp'],
                    'gender' => $attendeeData['gender'],
                    'is_olqp_member' => (bool) $attendeeData['is_olqp_member'],
                ]);

                $attendees[] = $attendee;
            }

            // Create a single payment record for the entire group (22,500)
            $groupPayment = Payment::create([
                'attendee_id' => $attendees[0]->id, // Link to first attendee as primary payer
                'amount' => 22500, // Total group amount
                'mpesa_code' => $validated['mpesa_code'],
                'status' => 'pending',
                'method' => 'mpesa',
            ]);

            // Update all attendees to link them to the payment
            foreach ($attendees as $attendee) {
                $attendee->update(['payment_id' => $groupPayment->id]);
            }

            // Send admin notification
            try {
                Mail::send(new NewPaymentNotificationMail($groupPayment, $attendees[0]));
            } catch (\Exception $e) {
                Log::error('Failed to send admin notification for group ticket', [
                    'error' => $e->getMessage(),
                    'payment_id' => $groupPayment->id,
                ]);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Failed to purchase group ticket', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw ValidationException::withMessages([
                'attendees' => 'We could not process your group registration at this time. Please try again.',
            ]);
        }

        return back()->with('success', 'Group ticket registered successfully for 5 people.');
    }

    public function checkMpesaCode(Request $request)
    {
        $request->validate([
            'mpesa_code' => 'required|string|max:20'
        ]);

        $mpesaCode = strtoupper(trim($request->mpesa_code));
        
        // Check if M-Pesa code already exists in payments table
        $exists = Payment::where('mpesa_code', $mpesaCode)->exists();
        
        return response()->json([
            'exists' => $exists
        ]);
    }
}
