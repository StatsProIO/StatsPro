<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->integer('domain_id')->nullable()->change();
            $table->integer('short_link_id')->unsigned()->nullable()->references('id')->on('short_links');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('events')->whereNull('domain_id')->update(['domain_id' => 0]);

        Schema::table('events', function (Blueprint $table) {
            $table->integer('domain_id')->default(0)->change();
            $table->dropColumn('short_link_id');
        });
    }
};
