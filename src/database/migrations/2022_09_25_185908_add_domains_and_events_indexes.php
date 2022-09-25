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
        Schema::table('domains', function (Blueprint $table) {
            $table->index('domain_name');
        });

        Schema::table('events', function (Blueprint $table) {
            $table->index('domain_id', 'created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('domains', function (Blueprint $table) {
            $table->dropIndex('domain_name');
        });

        Schema::table('events', function (Blueprint $table) {
            $table->dropIndex('domain_id', 'created_at');
        });
    }
};
