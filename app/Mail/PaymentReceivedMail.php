<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Payment $payment,
        public ?Attendee $attendee = null
    ) {}

    public function envelope(): Envelope
    {
        $attendeeName = $this->attendee?->name ?? $this->payment->attendee?->name ?? 'Valued Guest';
        
        return new Envelope(
            subject: "Payment Received - OLQP Singles Dinner 2025",
            to: [$this->attendee?->email ?? $this->payment->attendee?->email],
        );
    }

    public function content(): Content
    {
        $attendee = $this->attendee ?? $this->payment->attendee;
        $ticketType = $attendee?->group_ticket_id ? 'Group-of-5' : 'Individual';
        
        return new Content(
            view: 'emails.payment-received',
            with: [
                'payment' => $this->payment,
                'attendee' => $attendee,
                'ticketType' => $ticketType,
            ],
        );
    }
}
