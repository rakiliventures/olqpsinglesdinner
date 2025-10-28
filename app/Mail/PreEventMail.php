<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PreEventMail extends Mailable
{
    use Queueable, SerializesModels;

    public Attendee $attendee;
    public Event $event;
    public Payment $payment;

    /**
     * Create a new message instance.
     */
    public function __construct(Payment $payment, Attendee $attendee)
    {
        $this->payment = $payment;
        $this->attendee = $attendee->load(['event', 'payments']);
        $this->event = $this->attendee->event;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🎉 You\'re Invited! - OLQP Singles Dinner 2025',
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
        return [];
    }
}
