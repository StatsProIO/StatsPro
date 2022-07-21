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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('domain_id')->references('domains', 'id');
            $table->string('event_name');
            $table->string('ip_address')->nullable(); //will be removed after initial testing
            $table->string('user_agent')->nullable(); //will be removed after initial testing
            $table->string('visitor_hash');
            $table->string('request_hash');
            $table->string('is_unique');
            $table->string('location_href');
            $table->string('host');
            $table->string('path')->nullable();
            $table->string('referrer')->nullable();
            $table->integer('inner_width')->nullable();
            $table->string('language')->nullable();
            $table->string('country')->nullable();
            $table->string('browser')->nullable();
            $table->string('device')->nullable();
            $table->string('time_zone')->nullable();
            $table->string('client_time')->nullable();
            $table->datetime('enter_time');
            $table->datetime('exit_time')->nullable();
            


            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
};
