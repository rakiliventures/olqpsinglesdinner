<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attendee extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'event_id',
        'group_ticket_id',
        'payment_id',
        'name',
        'email',
        'whatsapp',
        'gender',
        'is_olqp_member',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_olqp_member' => 'bool',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function groupTicket(): BelongsTo
    {
        return $this->belongsTo(GroupTicket::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    /**
     * Check if the attendee is fully paid based on their ticket type
     */
    public function isFullyPaid(): bool
    {
        // For group ticket attendees, check if their linked payment is confirmed
        if ($this->group_ticket_id && $this->payment_id) {
            $payment = $this->payment;
            return $payment && $payment->status === 'confirmed' && $payment->amount >= 22500;
        }

        // For individual tickets, check their individual payments
        $totalConfirmedPayments = $this->payments()
            ->where('status', 'confirmed')
            ->sum('amount');

        return $totalConfirmedPayments >= 4999;
    }

    /**
     * Get the required amount for this attendee based on their ticket type
     */
    public function getRequiredAmount(): float
    {
        // For group ticket attendees, they need 22,500 total group amount
        if ($this->group_ticket_id) {
            return 22500;
        }

        // For individual tickets, they need 4,999
        return 4999;
    }
}
