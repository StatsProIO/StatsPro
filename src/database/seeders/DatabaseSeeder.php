<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $user = \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'user1@gmail.com',
        // ]);

        //  \App\Models\Domain::factory()->create([
        //     'user_id' => $user->id,
        //     'domain_name' => 'mydomain.com',
        // ]);

        // \App\Models\User::factory(10)->create();
        // \App\Models\Domain::factory(10)->create();
        \App\Models\Event::factory(1000)->create();
    }
}
