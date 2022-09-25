<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;
use App\Models\Domain;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $domainIds = Domain::all()->pluck('id')->toArray();

        $referrer = $this->faker->url();
        return [
            'domain_id' => $this->faker->randomElement($domainIds),
            'event_name' =>  'pageview',
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => $this->faker->userAgent(),
            'is_unique' => $this->faker->boolean(),
            'location_href' => $this->faker->url(),
            'host' => $this->faker->domainName(),
            'path' => implode('/', $this->faker->words(4)),
            'referrer' => $referrer,
            'source' => parse_url($referrer)['host'],
            'inner_width' => $this->faker->randomNumber(),
            'language' => $this->faker->languageCode() . '-' . $this->faker->countryCode(),
            'country' => $this->faker->randomElement(['USA', 'AUS', 'CAN', 'SWZ']),
            'region' => $this->faker->city(),
            'browser' => $this->faker->word(),
            'device' => $this->faker->word(),
            'os' => $this->faker->word(),
            'time_zone' => $this->faker->timezone(),
            'client_time' => $this->faker->dateTimeBetween('-1 days', '+0 days')
        ];
    }
}
