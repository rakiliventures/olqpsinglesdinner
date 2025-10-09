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
use Barryvdh\DomPDF\Facade\Pdf;

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
                'attendee_phone' => $p->attendee?->whatsapp,
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

    public function destroy(Payment $payment): RedirectResponse
    {
        try {
            $payment->delete();
            return back()->with('success', 'Payment deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to delete payment', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage()
            ]);
            return back()->with('error', 'Failed to delete payment. Please try again.');
        }
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

    public function exportPdf(Request $request)
    {
        $search = $request->get('search', '');
        $status = $request->get('status', 'all');

        $query = Payment::query()
            ->with(['attendee:id,name,event_id,email,whatsapp', 'attendee.event:id,name', 'actionedBy:id,name'])
            ->orderByDesc('created_at');

        // Apply search filter
        if ($search) {
            $query->whereHas('attendee', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('whatsapp', 'like', "%{$search}%");
            })->orWhere('mpesa_code', 'like', "%{$search}%");
        }

        // Apply status filter
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $payments = $query->get();

        $data = [
            'payments' => $payments,
            'search' => $search,
            'status' => $status,
            'exported_at' => now()->format('Y-m-d H:i:s'),
        ];

        $pdf = Pdf::loadView('pdfs.payments-export', $data);
        return $pdf->download('payments-export-' . now()->format('Y-m-d-H-i-s') . '.pdf');
    }

    public function exportExcel(Request $request)
    {
        $search = $request->get('search', '');
        $status = $request->get('status', 'all');

        $query = Payment::query()
            ->with(['attendee:id,name,event_id,email,whatsapp', 'attendee.event:id,name', 'actionedBy:id,name'])
            ->orderByDesc('created_at');

        // Apply search filter
        if ($search) {
            $query->whereHas('attendee', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('whatsapp', 'like', "%{$search}%");
            })->orWhere('mpesa_code', 'like', "%{$search}%");
        }

        // Apply status filter
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $payments = $query->get();

        $data = $payments->map(function (Payment $p) {
            return [
                'ID' => $p->id,
                'Attendee Name' => $p->attendee?->name ?? '-',
                'Phone Number' => $p->attendee?->whatsapp ?? '-',
                'Event' => $p->attendee?->event?->name ?? '-',
                'Amount' => $p->amount,
                'M-Pesa Code' => $p->mpesa_code,
                'Status' => ucfirst($p->status),
                'Method' => ucfirst($p->method),
                'Created At' => $p->created_at?->format('Y-m-d H:i:s'),
                'Actioned By' => $p->actionedBy?->name ?? '-',
                'Actioned At' => $p->actioned_at?->format('Y-m-d H:i:s'),
            ];
        });

        // Generate CSV content
        $csvContent = $this->generateCsvContent($data);
        
        return response($csvContent)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="payments-export-' . now()->format('Y-m-d-H-i-s') . '.csv"');
    }

    private function generateCsvContent($data)
    {
        if (empty($data)) {
            return "No data available\n";
        }

        // Get headers from the first row
        $headers = array_keys($data[0]);
        
        // Start output buffering
        $output = fopen('php://temp', 'r+');
        
        // Write headers
        fputcsv($output, $headers);
        
        // Write data rows
        foreach ($data as $row) {
            fputcsv($output, array_values($row));
        }
        
        // Get the content
        rewind($output);
        $csvContent = stream_get_contents($output);
        fclose($output);
        
        return $csvContent;
    }
}
