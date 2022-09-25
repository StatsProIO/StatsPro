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
        try {
            $user = \App\Models\User::factory()->create([
                'name' => 'Test User',
                'email' => 'user1@gmail.com',
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
          	$user = \App\Models\User::where('email', 'user1@gmail.com')->first();
      }

        try {
             \App\Models\Domain::factory()->create([
                'user_id' => $user->id,
                'domain_name' => 'mydomain.com',
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
          	\App\Models\Domain::where('domain_name', 'mydomain.com')->first();
          }

         \App\Models\User::factory(10)->create();
         \App\Models\Domain::factory(10)->create();
        \App\Models\Event::factory(200)->create();
    }
}
