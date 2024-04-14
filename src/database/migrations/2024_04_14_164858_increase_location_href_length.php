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
        Schema::table('events', function (Blueprint $table) {
            $table->string('location_href', 2048)->change();
            $table->string('path', 2048)->change();
            $table->string('referrer', 2048)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('location_href', 256)->change();
            $table->string('path', 256)->change();
            $table->string('referrer', 256)->change();
        });
    }
};
