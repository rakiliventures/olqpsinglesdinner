<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->decimal('total_amount', 10, 2); // 22,500 for 5 pax
            $table->decimal('amount_per_person', 10, 2); // 4,500 per person
            $table->string('mpesa_code')->unique();
            $table->string('status')->default('pending'); // pending, confirmed, failed
            $table->string('method')->default('mpesa');
            $table->timestamps();

            $table->index(['event_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_tickets');
    }
};
