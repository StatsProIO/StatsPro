<?php

namespace App\Http\Controllers;

use App\Repositories\EventSaltRepository;
use Carbon\Carbon;
use DateTimeZone;
use GeoIp2\Database\Reader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class TestPageController extends Controller
{
    public function get()
    {
        return view('test-page');
    }

     public function getNested()
     {
        return view('test-page-nested');
     }

     public function parse() {

         $data = new KnuckleLog('/var/www/access.log', '%h %l %u %t "%r" %>s %O "%{Referer}i" \"%{User-Agent}i"', 0, 42000);

         $array = $data->worker();

         $cityDbReader = new Reader('/var/www/GeoLite2-City.mmdb');

         echo '

         <table>
            <tbody>
            <tr>
                <th>Country (Tz to Location vs Control)</th>
                <th>City (Tz to Location vs Control)</th>
                <th>Lat/Long (Tz to Location vs Control)</th>
                <th>Distance</th>

            </tr>

         ';

         $totalRows = 0;
         $matchingCountries = 0;
         $matchingCities = 0;
         $distanceDiffTotal = 0;

         $countires= [];

         $pointsBlue = [];
         $pointsGreen = [];

         foreach ($array['data'] as $line) {

             if (str_contains($line->HeaderUserAgent, 'SemrushBot') || str_contains($line->HeaderUserAgent, 'DotBot')  || str_contains($line->HeaderUserAgent, 'Bytespider') || str_contains($line->HeaderUserAgent, 'Googlebot')
                 || str_contains($line->HeaderUserAgent, 'MojeekBot') || str_contains($line->HeaderUserAgent, 'bingbot') || str_contains($line->HeaderUserAgent, 'AhrefsBot') || str_contains($line->HeaderUserAgent, 'applebot')
                 || str_contains($line->HeaderUserAgent, 'Google-Read-Aloud') || str_contains($line->HeaderUserAgent, 'Baiduspider')

             ) {
                 continue;
             }

             if (str_contains($line->request, '.png') || str_contains($line->request, '.js') || str_contains($line->request, '.woff') || str_contains($line->request, '.css')  ) {
                 continue;
             }

             //find the matching event in the DB based on visitor_id and path
             try {
                 $path = explode(' ', $line->request)[1];
             } catch(\Throwable $e) {
                 continue;
             }

             $dateOfNginxRequest = (new Carbon($line->stamp));
             $matchingEvent = DB::select(
                 DB::raw("SELECT *
                FROM events
                WHERE path = :path AND user_agent = :user_agent AND EXTRACT(HOUR from created_at) = :hour AND EXTRACT(MINUTE from created_at) = :minute
                ")->getValue(DB::connection()->getQueryGrammar()),
                 array('user_agent' => str_replace('" "-', '', $line->HeaderUserAgent), 'path' => $path, 'hour' => $dateOfNginxRequest->hour, 'minute' => $dateOfNginxRequest->minute)
             );

             if ($matchingEvent) {
                 $record = $cityDbReader->city($line->host);
                 $tz = new DateTimeZone($matchingEvent[0]->time_zone);

                 $totalRows++;

                 if($tz->getLocation()['country_code'] == $record->country->isoCode ) {
                     $matchingCountries++;
                     $countires[] = $tz->getLocation()['country_code'];
                 }

                 if ($matchingEvent[0]->region == $record->city->name) {
                     $matchingCities++;
                 }

                 $distanceDiff = $this->distance($tz->getLocation()['latitude'], $tz->getLocation()['longitude'], $record->location->latitude, $record->location->longitude, "M");

                 $pointsBlue[] = [$tz->getLocation()['longitude'], $tz->getLocation()['latitude']];
                 $pointsGreen[] = [$record->location->longitude, $record->location->latitude];

                 $distanceDiffTotal += $distanceDiff;
                echo '
                    <tr>
                        <td>' . $tz->getLocation()['country_code'] . ' vs ' . $record->country->isoCode . ($tz->getLocation()['country_code'] == $record->country->isoCode ? ' ✅' : ' ❌') . '</td>
                        <td>' . $matchingEvent[0]->region . ' vs ' . $record->city->name . ($matchingEvent[0]->region == $record->city->name ? ' ✅' : ' ❌') . '</td>
                        <td>(' . $tz->getLocation()['latitude'] . ',' .$tz->getLocation()['longitude']. ') vs (' . $record->location->latitude .','.$record->location->longitude . ')</td>
                        <td>' . $distanceDiff . ' Miles Apart</td>
                    </tr>
                ';
             }
         }

         echo '</tbody></table>';

         echo 'Total rows: ' . $totalRows . '<br/>';
         echo 'Matching countries: ' . $matchingCountries . ': ' . ($matchingCountries/$totalRows)  . '<br/>';
         echo 'Total cities: ' . $matchingCities . ': ' . ($matchingCities/$totalRows) . '<br/>';
         echo 'Average distance diff: ' . ($distanceDiffTotal/ $totalRows) . '<br/>';
         echo 'Unique countries: ' . (count(array_unique($countires))) . '<br/>';

         echo json_encode($this->generateGeoJSON($pointsBlue, $pointsGreen));

         echo '<script src="https://gist.github.com/StatsProIO/b0b7dc30fbc2fc7c0043c17898728cd0.js"></script>';

     }

    function distance($lat1, $lon1, $lat2, $lon2, $unit) {

        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if ($unit == "K") {
            return ($miles * 1.609344);
        } else if ($unit == "N") {
            return ($miles * 0.8684);
        } else {
            return $miles;
        }


    }


    function generateGeoJSON($pointsBlue, $pointsGreen) {
        $geoJson = [];
        $geoJson['type'] = 'FeatureCollection';

        $features = [];

        $colorsByPoint = [];

        $uniquePointsBlue = array_unique($pointsBlue, SORT_REGULAR);
//        foreach($uniquePointsBlue as $point) {
//            $features[] = $this->generatePointFeature($point, '#0000ff');
//        }

        foreach($pointsBlue as $index=>$point) {
            $features[] = $this->generateLineFeature($point, $pointsGreen[$index], '#0000ff', $colorsByPoint);

        }



        $geoJson['features'] = $features;

        return $geoJson;
    }

    function rand_color() {
        return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    }


    function generateLineFeature($pointA, $pointB, $color, $colorsByPoint) {

        $key = implode("-", $pointA);
        if (!array_key_exists($key, $colorsByPoint)) {
            $colorsByPoint[$key] = $this->rand_color();
        }

//        dd($arr);

        $feature = [];
        $feature['type'] = 'Feature';
        $feature['properties'] = [];
        $feature['properties']['stroke'] = $colorsByPoint[$key];
        $feature['properties']['strokeColor'] = $colorsByPoint[$key];
        $feature['properties']['stroke-width'] = 2;
        $feature['properties']['strokeWidth'] = 2;
        $feature['properties']['stroke-opacity'] = 1;

        $feature['geometry'] = [];
        $feature['geometry']['coordinates'] = [$pointA, $pointB];
        $feature['geometry']['type'] = 'LineString';

        return $feature;
    }

    function generatePointFeature($point, $color) {
        $feature = [];
        $feature['type'] = 'Feature';
        $feature['properties'] = [];
        $feature['properties']['marker-color'] = $color;

        $feature['geometry'] = [];
        $feature['geometry']['coordinates'] = $point;
        $feature['geometry']['type'] = 'Point';

        return $feature;

    }


}
