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
            $table->string('keyword')->nullable();
            $table->string('q')->nullable();
            $table->string('ref')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('utm_content')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_source')->nullable();
            $table->string('utm_term')->nullable();
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
            $table->dropColumn('keyword')->nullable();
            $table->dropColumn('q')->nullable();
            $table->dropColumn('ref')->nullable();
            $table->dropColumn('utm_campaign')->nullable();
            $table->dropColumn('utm_content')->nullable();
            $table->dropColumn('utm_medium')->nullable();
            $table->dropColumn('utm_source')->nullable();
            $table->dropColumn('utm_term')->nullable();
        });
    }
};
