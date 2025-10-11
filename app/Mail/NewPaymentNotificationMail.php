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

class NewPaymentNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Payment $payment,
        public ?Attendee $attendee = null
    ) {}

    public function envelope(): Envelope
    {
        $attendeeName = $this->attendee?->name ?? $this->payment->attendee?->name ?? 'Unknown';
        
        return new Envelope(
            subject: "Dinner New Payment - {$attendeeName}",
            to: ['mobiwecraft@gmail.com'],
            cc: ['nevillemuchalwa@gmail.com'],
        );
    }

    public function content(): Content
    {
        $attendee = $this->attendee ?? $this->payment->attendee;
        $ticketType = $attendee?->group_ticket_id ? 'Group-of-5' : 'Individual';
        
        return new Content(
            view: 'emails.new-payment-notification',
            with: [
                'payment' => $this->payment,
                'attendee' => $attendee,
                'ticketType' => $ticketType,
            ],
        );
    }
}
