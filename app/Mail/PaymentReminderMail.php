<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PaymentReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public Attendee $attendee;
    public Event $event;
    public float $totalPaid;
    public float $remainingBalance;
    public int $daysRemaining;

    /**
     * Create a new message instance.
     */
    public function __construct(Attendee $attendee, float $totalPaid, float $remainingBalance, int $daysRemaining)
    {
        $this->attendee = $attendee->load('event');
        $this->event = $attendee->event;
        $this->totalPaid = $totalPaid;
        $this->remainingBalance = $remainingBalance;
        $this->daysRemaining = $daysRemaining;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Reminder - OLQP Singles Dinner 2025',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // Determine ticket type
        $ticketType = $this->attendee->group_ticket_id ? 'Group-of-5' : 'Individual';
        
        return new Content(
            view: 'emails.payment-reminder',
            with: [
                'attendee' => $this->attendee,
                'event' => $this->event,
                'totalPaid' => $this->totalPaid,
                'remainingBalance' => $this->remainingBalance,
                'daysRemaining' => $this->daysRemaining,
                'eventAmount' => (float) $this->event->amount,
                'ticketType' => $ticketType,
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
