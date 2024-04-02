<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->index(['domain_id', 'event_name', 'created_at']);
            $table->index(['domain_id', 'event_name', 'created_at', 'source']);
            $table->index(['domain_id', 'event_name', 'created_at', 'path']);
            $table->index(['domain_id', 'event_name', 'created_at', 'device']);
            $table->index(['domain_id', 'event_name', 'created_at', 'country']);
            $table->index(['domain_id', 'event_name', 'created_at', 'browser']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropIndex(['domain_id', 'event_name', 'created_at']);
            $table->dropIndex(['domain_id', 'event_name', 'created_at', 'source']);
            $table->dropIndex(['domain_id', 'event_name', 'created_at', 'path']);
            $table->dropIndex(['domain_id', 'event_name', 'created_at', 'device']);
            $table->dropIndex(['domain_id', 'event_name', 'created_at', 'country']);
            $table->dropIndex(['domain_id', 'event_name', 'created_at', 'browser']);
        });
    }
};
