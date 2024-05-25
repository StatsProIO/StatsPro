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
        $hour = intval((\Carbon\Carbon::now())->format('H'));

        $random = rand(2, 7);
        while ($count <  intval(sin(.13 * $hour) + (sin($hour)/3) + 7)) { //send 5 to 8 requests a minute

            try {
                $client = new \GuzzleHttp\Client();
                $response = $client->request('POST', (config('app.env') === 'local' ? 'webnginx' : config('app.url')) . '/api/collect', [
                    'headers' => [
                        'User-Agent' => $faker->userAgent(),
                    ],
                    'json' => [
                        "event_name" => "pageview",
                        "location_href" => $faker->randomElement(array('https://demo.com/blog/example-1', 'https://demo.com/', 'https://demo.com/blog-example-2', 'https://demo.com/blog/example-1', 'https://demo.com/', 'https://demo.com/blog-example-2', 'https://demo.com/search', 'https://demo.com/help', 'https://demo.com/terms-of-service', 'https://demo.com/privacy')),
                        "location_host" => "demo.com",
                        "location_pathname" => $faker->randomElement(array('/blog/example-1', '/', '/blog-example-2', '/blog/example-1', '/', '/blog-example-2', '/search', '/help', '/terms-of-service', '/privacy')),
                        "domain" => "demo.com",
                        "referrer" => $faker->randomElement(array(null, 'https://www.google.com/', 'https://www.google.com/', 'https://www.google.com/', 'http://baidu.com/', 'https://reddit.com/', 'https://reddit.com/', 'https://t.co/')),
                        "inner_width" => $faker->randomNumber(),
                        "lang" => $faker->languageCode() . '-' . $faker->countryCode(),
                        "client_time_zone" => $faker->timezone(),
                        "client_time" => \Carbon\Carbon::now(),
                    ]]);
            } catch (\Throwable $e) {
                Log::error($e->getMessage());
            }

            $count++;

            Log::info("Sleeping for 8 seconds....");
            sleep(8);
        }


        return 'DONE';
    }
}
