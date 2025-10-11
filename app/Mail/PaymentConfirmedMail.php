<?php

namespace App\Mail;

use App\Models\Payment;
use App\Models\Attendee;
use App\Services\TicketPdfService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PaymentConfirmedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Payment $payment,
        public ?Attendee $attendee = null
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Confirmed - OLQP Singles Dinner 2025',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // Use provided attendee or load from payment
        $attendee = $this->attendee ?? $this->payment->attendee->load('payments');
        
        // Calculate payment summaries
        $totalConfirmedAmount = $attendee->payments
            ->where('status', 'confirmed')
            ->sum('amount');
            
        $pendingAmount = $attendee->payments
            ->where('status', 'pending')
            ->sum('amount');
            
        $failedAmount = $attendee->payments
            ->where('status', 'failed')
            ->sum('amount');

        // Determine ticket type
        $ticketType = $attendee->group_ticket_id ? 'Group-of-5' : 'Individual';

        return new Content(
            view: 'emails.payment-confirmed',
            with: [
                'attendee' => $attendee,
                'payment' => $this->payment,
                'event' => $attendee->event,
                'totalConfirmedAmount' => $totalConfirmedAmount,
                'pendingAmount' => $pendingAmount,
                'failedAmount' => $failedAmount,
                'ticketType' => $ticketType,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        
        try {
            // Generate PDF ticket if attendee is fully paid
            $ticketService = new TicketPdfService();
            $pdfPath = $ticketService->generateTicketPdf($this->payment->attendee, $this->payment);
            
            if ($pdfPath) {
                $attachments[] = Attachment::fromPath($pdfPath)
                    ->as('OLQP_Singles_Dinner_2025_Ticket.pdf')
                    ->withMime('application/pdf');
                    
                Log::info('PDF ticket attached to email', [
                    'attendee_id' => $this->payment->attendee_id,
                    'pdf_path' => $pdfPath
                ]);
            } else {
                Log::info('No PDF ticket generated - attendee not fully paid', [
                    'attendee_id' => $this->payment->attendee_id
                ]);
            }
            
        } catch (\Exception $e) {
            Log::error('Failed to attach PDF ticket to email', [
                'attendee_id' => $this->payment->attendee_id,
                'error' => $e->getMessage()
            ]);
        }
        
        return $attachments;
    }
}
