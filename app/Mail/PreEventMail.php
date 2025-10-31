<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\Payment;
use App\Services\TicketPdfService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PreEventMail extends Mailable
{
    use Queueable, SerializesModels;

    public Attendee $attendee;
    public Event $event;
    public Payment $payment;
    protected TicketPdfService $ticketPdfService;

    /**
     * Create a new message instance.
     */
    public function __construct(Payment $payment, Attendee $attendee)
    {
        $this->payment = $payment;
        $this->attendee = $attendee->load(['event', 'payments']);
        $this->event = $this->attendee->event;
        $this->ticketPdfService = app(TicketPdfService::class);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Masks Available at Venue Tonight! - Singles Dinner',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.pre-event',
            with: [
                'attendee' => $this->attendee,
                'event' => $this->event,
                'payment' => $this->payment,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        try {
            // Generate the PDF ticket content directly
            $pdfContent = $this->ticketPdfService->generateTicketPdfContent($this->attendee, $this->payment);
            
            if (!$pdfContent) {
                Log::warning('PDF content not generated', [
                    'attendee_id' => $this->attendee->id
                ]);
                return [];
            }
            
            return [
                Attachment::fromData(
                    fn() => $pdfContent,
                    "OLQP_Singles_Dinner_Ticket_{$this->attendee->id}.pdf"
                )->withMime('application/pdf')
            ];
        } catch (\Exception $e) {
            // Log the error but don't fail the email sending
            Log::error('Failed to generate ticket PDF for pre-event email', [
                'attendee_id' => $this->attendee->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return [];
        }
    }
}
