<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

// This is called from the cron job generate-demo-data
class SendDemoRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'demo:send-requests';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send curl requests to app for the demo Domain';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::info("Starting to send demo requests");
        $faker = \Faker\Factory::create();

        $count = 0;
        while ($count < 5) { //send 5 total requests per minute
            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST',  config('app.url') . '/api/collect', [
            'headers' => [
                'User-Agent' => $faker->userAgent(),
            ],
            'json' => [
                "event_name" => "pageview",
                "location_href" => $faker->randomElement(array( 'https://demo.com/blog/example-1', 'https://demo.com/', 'https://demo.com/blog-example-2', 'https://demo.com/blog/example-1', 'https://demo.com/', 'https://demo.com/blog-example-2', 'https://demo.com/search', 'https://demo.com/help', 'https://demo.com/terms-of-service', 'https://demo.com/privacy')),
                "location_host" => "demo.com",
                "location_pathname" => $faker->randomElement(array( '/blog/example-1', '/', '/blog-example-2', '/blog/example-1', '/', '/blog-example-2', '/search', '/help', '/terms-of-service', '/privacy')),
                "domain" => "demo.com",
                "referrer" => $faker->randomElement(array (null,'https://www.google.com/', 'https://www.google.com/', 'https://www.google.com/','http://baidu.com/', 'https://reddit.com/', 'https://reddit.com/', 'https://t.co/')),
                "inner_width" => $faker->randomNumber(),
                "lang" => $faker->languageCode() . '-' . $faker->countryCode(),
                "client_time_zone" => $faker->timezone(),
                "client_time" => \Carbon\Carbon::now(),
            ]]);

            $count++;

            $hour = intval((\Carbon\Carbon::now())->format('H'));
            Log::info("Hour " . $hour);
            $sleepTime = intval((((sin((.261 * $hour)) + 1)*20) + sin($hour* 5) + 2) * 1000000);

            Log::info("Sleep " . $sleepTime);
            usleep($sleepTime);

        }

        $statusCode = $response->getStatusCode();
        $content = $response->getBody();

        return $statusCode;
    }
}
