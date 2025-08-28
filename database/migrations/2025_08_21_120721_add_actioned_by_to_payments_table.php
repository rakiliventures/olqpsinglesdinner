<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->foreignId('actioned_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('actioned_at')->nullable();
        });

        // Update existing payments that have been actioned (confirmed or failed)
        // to assign the first user in the database as the actioner
        $firstUser = DB::table('users')->first();
        if ($firstUser) {
            DB::table('payments')
                ->whereIn('status', ['confirmed', 'failed'])
                ->update([
                    'actioned_by' => $firstUser->id,
                    'actioned_at' => DB::raw('updated_at')
                ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['actioned_by']);
            $table->dropColumn(['actioned_by', 'actioned_at']);
        });
    }
};
