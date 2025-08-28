<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\PaymentConfirmedMail;
use App\Models\Event;
use App\Models\Payment;
use App\Services\WhatsAppService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class PaymentsController extends Controller
{
    protected WhatsAppService $whatsappService;

    public function __construct(WhatsAppService $whatsappService)
    {
        $this->whatsappService = $whatsappService;
    }

    public function index(): Response
    {
        $event = Event::query()->orderBy('date')->first();

        $query = Payment::query()
            ->with(['attendee:id,name,event_id,email,whatsapp', 'attendee.event:id,name', 'actionedBy:id,name'])
            ->orderByDesc('created_at');

        if ($event) {
            $query->whereHas('attendee', function ($q) use ($event) {
                $q->where('event_id', $event->id);
            });
        }

        $payments = $query->get(['id', 'attendee_id', 'amount', 'mpesa_code', 'status', 'method', 'created_at', 'actioned_by', 'actioned_at']);

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
                'actioned_by_name' => $p->actionedBy?->name,
                'actioned_at' => $p->actioned_at?->toDateTimeString(),
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

        $oldStatus = $payment->status;
        $newStatus = $validated['status'];

        // Only update actioned_by and actioned_at if the status is changing to confirmed or failed
        $updateData = ['status' => $newStatus];
        
        if (in_array($newStatus, ['confirmed', 'failed']) && $oldStatus !== $newStatus) {
            $updateData['actioned_by'] = Auth::id();
            $updateData['actioned_at'] = now();
        }

        $payment->update($updateData);

        // Send notifications only when status changes to 'confirmed'
        if ($oldStatus !== 'confirmed' && $newStatus === 'confirmed') {
            $this->sendPaymentConfirmationNotifications($payment);
        }

        return back()->with('success', 'Payment updated successfully.');
    }

    protected function sendPaymentConfirmationNotifications(Payment $payment): void
    {
        try {
            // Load the attendee and event relationships
            $payment->load(['attendee.event']);

            if (!$payment->attendee) {
                Log::warning('No attendee found for payment', ['payment_id' => $payment->id]);
                return;
            }

            $attendee = $payment->attendee;
            $notificationsSent = [];

            // Send email notification
            if ($attendee->email) {
                try {
                    Mail::to($attendee->email)->send(new PaymentConfirmedMail($payment));
                    $notificationsSent[] = 'email';
                    Log::info('Payment confirmation email sent', [
                        'payment_id' => $payment->id,
                        'attendee_id' => $attendee->id,
                        'email' => $attendee->email
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to send payment confirmation email', [
                        'payment_id' => $payment->id,
                        'attendee_id' => $attendee->id,
                        'email' => $attendee->email,
                        'error' => $e->getMessage()
                    ]);
                }
            } else {
                Log::warning('No email address found for attendee', [
                    'payment_id' => $payment->id,
                    'attendee_id' => $attendee->id,
                    'attendee_name' => $attendee->name
                ]);
            }

            // Send WhatsApp notification
            if ($attendee->whatsapp) {
                try {
                    $whatsappSent = $this->whatsappService->sendPaymentConfirmation($payment);
                    if ($whatsappSent) {
                        $notificationsSent[] = 'whatsapp';
                        Log::info('Payment confirmation WhatsApp message sent', [
                            'payment_id' => $payment->id,
                            'attendee_id' => $attendee->id,
                            'whatsapp' => $attendee->whatsapp
                        ]);
                    }
                } catch (\Exception $e) {
                    Log::error('Failed to send payment confirmation WhatsApp message', [
                        'payment_id' => $payment->id,
                        'attendee_id' => $attendee->id,
                        'whatsapp' => $attendee->whatsapp,
                        'error' => $e->getMessage()
                    ]);
                }
            } else {
                Log::warning('No WhatsApp number found for attendee', [
                    'payment_id' => $payment->id,
                    'attendee_id' => $attendee->id,
                    'attendee_name' => $attendee->name
                ]);
            }

            // Log summary of notifications sent
            if (!empty($notificationsSent)) {
                Log::info('Payment confirmation notifications sent', [
                    'payment_id' => $payment->id,
                    'attendee_id' => $attendee->id,
                    'attendee_name' => $attendee->name,
                    'notifications_sent' => $notificationsSent
                ]);
            } else {
                Log::warning('No notifications sent for payment confirmation', [
                    'payment_id' => $payment->id,
                    'attendee_id' => $attendee->id,
                    'attendee_name' => $attendee->name,
                    'has_email' => !empty($attendee->email),
                    'has_whatsapp' => !empty($attendee->whatsapp)
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Error in payment confirmation notification process', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
