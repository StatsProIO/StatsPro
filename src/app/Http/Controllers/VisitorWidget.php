<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Repositories\EventRepository;
use App\Utility\TimeRangeInfo;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VisitorWidget extends Controller
{
    // returns the widget image, if `visits` query param is specified that widget is returned otherwise we look up
    // visits count by domain
    public function getWidget(Request $request) {

        if (!$request->has('color-variant')) {
            return response()->json(['error' => 'color-variant parameter required'], 400);
        }

        if ($request->has('visits')) {
            return $this->getByVisitsAndVariant($request->get('visits'), $request->get('color-variant'));
        } else {
            $domain = null;

            $referer = $request->header('referer');
            return response()->json($request->headers->all(), 200);

            if ($referer) {
                $fullDomain = parse_url($referer)['host']; //gets google.com, www.google.com, subdomain.google.com, etc
                $domain = Domain::where('domain_name', $fullDomain)->first();

                if (!$domain) {
                    $domainParts = explode('.', $fullDomain); //get the domain in parts

                    //if there are 3 or more parts (subdomain.google.com or domain.co.uk), take the first 2 parts and see if there is a domain match
                    if (count($domainParts) >= 3) {
                        $domainWithOutFirstSegment = implode(".", array_slice($domainParts, 1));
                        $domain = Domain::where('domain_name', $fullDomain)->first();
                    }
                }
            }
            //TODO: need to make sure events can be sent even if there isn't a domain record added

            $visits = 0;
            if ($domain) {
                $timeRangeInfo = TimeRangeInfo::rangeStringToQueryInfo('24h');
                $visits = EventRepository::getVisitorsCount($timeRangeInfo->getInterval(), $domain);
            }

            return $this->getByVisitsAndVariant($visits, $request->get('color-variant'));
        }


    }

    public function getByVisitsAndVariant($visits, $variant)
    {
        $animations = [
            'walk' => ['speed' => 20 , 'length' => null],
            'run' => ['speed' => 50 , 'length' => null],
            'sit' => ['speed' => 5 , 'length' => 2],
            'idle' => ['speed' => 5 , 'length' => 2],
            'lay' => ['speed' => 5 , 'length' => 2],
            'pee' => ['speed' => 5 , 'length' => 2]
        ];

        $variantToColors = [
            1 => ['borderColor' => '#343434', 'boxColor' => '#f4bb83'],
            2 => ['borderColor' => '#393939', 'boxColor' => '#eddfd1'],
            3 => ['borderColor' => '#ca8052', 'boxColor' => '#eddfd1'],
            4 => ['borderColor' => '#9a9a9a', 'boxColor' => '#eddfd1']
        ];


        $optionsByStartPosition = [
            0 => [
                ['name' => 'walk', 'endPosition' => 50],
                ['name' => 'walk', 'endPosition' => 25],
                ['name' => 'walk', 'endPosition' => 75],
                ['name' => 'sit', 'endPosition' => 0],
                ['name' => 'idle', 'endPosition' => 0],
                ['name' => 'lay', 'endPosition' => 0],
                ['name' => 'run', 'endPosition' => 50],
            ],
            25 => [
                ['name' => 'sit', 'endPosition' => 25],
                ['name' => 'idle', 'endPosition' => 25],
                ['name' => 'lay', 'endPosition' => 25],
                ['name' => 'pee', 'endPosition' => 25],
                ['name' => 'walk', 'endPosition' => 0],
            ],
            50 => [
                ['name' => 'walk', 'endPosition' => 100],
                ['name' => 'run', 'endPosition' => 100],
                ['name' => 'walk', 'endPosition' => 0],
                ['name' => 'sit', 'endPosition' => 50],
                ['name' => 'idle', 'endPosition' => 50],
                ['name' => 'pee', 'endPosition' => 50],
                ['name' => 'lay', 'endPosition' => 50],
            ],
            75 => [
                ['name' => 'walk', 'endPosition' => 100],
                ['name' => 'walk', 'endPosition' => 0],
                ['name' => 'sit', 'endPosition' => 75],
                ['name' => 'idle', 'endPosition' => 75],
                ['name' => 'lay', 'endPosition' => 75],
            ],
            100 => [
                ['name' => 'walk', 'endPosition' => 50],
                ['name' => 'walk', 'endPosition' => 0],
                ['name' => 'sit', 'endPosition' => 100],
                ['name' => 'idle', 'endPosition' => 100],
                ['name' => 'lay', 'endPosition' => 100],
            ]
        ];

        function positionPercentageToAbsolutePosition($positionPercentage) {
            return ($positionPercentage/100) * 250; //250 is the walkable area for the overlay animal
        }

        function animationToPositionFormula($direction, $startPositionPercentage, $animation) {
            $startPosition = positionPercentageToAbsolutePosition($startPositionPercentage);

            if ($animation === 'walk') {
               return $direction . 't*20+' . $startPosition;
            }

            if ($animation === 'run') {
                return $direction . 't*50+' . $startPosition;
            }

            if ($animation === 'sit') {
                return $direction . $startPosition;
            }

            if ($animation === 'idle') {
                return $direction . $startPosition;
            }

            if ($animation === 'lay') {
                return $direction . $startPosition;
            }

            if ($animation === 'pee') {
                return $direction . $startPosition;
            }
        }

        // generate clips for all of our transitions for each color variant

        for($colorVariantIndex = 1; $colorVariantIndex <=4; $colorVariantIndex++) {

            foreach ($optionsByStartPosition as $startPositionPercentage => $possibleTransitions) {
                foreach ($possibleTransitions as $transition) {

                    $outputName = 'dog-' . $colorVariantIndex . '-' . $transition['name'] . '-' . $startPositionPercentage . '-' . $transition['endPosition'] . '.webm';
                    if (!file_exists('images/visitor-widget/' . $outputName)) {
                        $animation =  'dog-' . $colorVariantIndex . '-' . $transition['name'] . '.gif';

                        $animationStartPosition = positionPercentageToAbsolutePosition($startPositionPercentage) - 25;
                        $animationEndPosition = positionPercentageToAbsolutePosition($transition['endPosition']) - 25; //subtract the size of image so end position is calculated in middle of image
                        $lengthOfClip = $animations[$transition['name']]['length'] ?? (abs($animationEndPosition - $animationStartPosition)) / $animations[$transition['name']]['speed'];
                        $direction = $animationStartPosition > $animationEndPosition ? '-1*' : '1*';
                        $positionFormula = animationToPositionFormula($direction, $startPositionPercentage, $transition['name']);

                        $borderColor = $variantToColors[$colorVariantIndex]['borderColor'];
                        $boxColor = $variantToColors[$colorVariantIndex]['boxColor'];

                        shell_exec("ffmpeg -y -loop 1 -t ${lengthOfClip} -i images/background.png -ignore_loop 0 -i images/${animation} -quality good " .
                            "-filter_complex \"" .
                            "drawbox=c=${borderColor}:t=fill:w=290:h=40:x=5:y=38:replace=1[bg_with_border]; " . //border
                            "[bg_with_border]drawbox=c=${boxColor}:t=fill:w=280:h=30:x=10:y=43:replace=1[bg_wih_border_and_box]; " . //box
                            "[1:v]" . ($direction == '-1*' ? "hflip" : 'null') . "[myoverlay]; " .
                            "[bg_wih_border_and_box][myoverlay]overlay=x=${animationStartPosition}:x=${positionFormula}:y=0:shortest=1:repeatlast=0\" " .
                            "-c:v libvpx-vp9  -crf 0 -r 5 images/visitor-widget/${outputName} 2>&1");
                    }
                }
            }
        }

        //now generate the actual full widget video
        $i = $visits;
        $requestedColorVariant = $variant;

        $clipOutputName = "images/visitor-widget/clips/dog-${requestedColorVariant}-clip-${i}.webm";
        if (!file_exists($clipOutputName)) {


            $currentPosition = 0;
            $clipsToMerge = ['dog-' . $requestedColorVariant . '-lay-0-0.webm']; //always start with a lay

            do {
                $randomTransitionIndex = array_rand($optionsByStartPosition[$currentPosition]);
                $transition = $optionsByStartPosition[$currentPosition][$randomTransitionIndex];
                $clipsToMerge[] = 'dog-' . $requestedColorVariant . '-' . $transition['name'] . '-' . $currentPosition . '-' . $transition['endPosition'] . '.webm';
                $currentPosition = $transition['endPosition'];

                count($clipsToMerge) . " ";

            } while(($currentPosition != 0 || count($clipsToMerge) < 6) && count($clipsToMerge) < 8 );

            if ($currentPosition !== 0) {
               $clipsToMerge[] = 'dog-' . $requestedColorVariant . "-walk-${currentPosition}-0.webm"; //walk back to the starting if you didn't make it back on your own
            }

            $fileDescriptor = "";
            foreach($clipsToMerge as $clip) {
                $fileDescriptor .= ("file '/var/www/public/images/visitor-widget/${clip}'\n");
            }

            $displayVisit = 0;
            $lengthOfVisitsNumber = $displayVisit !== 0 ? floor(log10($displayVisit) + 1) : 1;
            $displayText = "visits" . str_pad($i, 15-$lengthOfVisitsNumber, " ", STR_PAD_LEFT);

            file_put_contents("/var/www/public/images/visitor-widget/concat-instructions-${i}.txt", $fileDescriptor);
            shell_exec("ffmpeg -y -f concat -safe 0 -c:v libvpx-vp9 -i /var/www/public/images/visitor-widget/concat-instructions-${i}.txt -filter_complex \"drawtext=fontfile=images/visitor1.ttf:text='${displayText}':fontcolor=#343434:fontsize=24:box=0:x=(w-text_w)/2:y=52\" -c:v libvpx-vp9 ${clipOutputName} 2>&1");
        }

        return response()->file($clipOutputName, ['content-type' => 'video/webm']);
    }
}
