<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Domain>
 */
class DomainFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $userIds = User::all()->pluck('id')->toArray();

        return [
            'user_id' =>  $this->faker->randomElement($userIds),
            'domain_name' => $this->faker->domainName()
        ];
    }
}
