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
}
