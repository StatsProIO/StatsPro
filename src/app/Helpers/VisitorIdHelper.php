<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\Repositories\EventSaltRepository;
use Illuminate\Http\Request;

class VisitorIdHelper
{

    public static function getVisitorId(Request $request) {
        $userAgent = $request->server('HTTP_USER_AGENT');

        $eventSalt = EventSaltRepository::getOrCreateCurrentEventSalt();
        return base64_encode(hash('sha256', $userAgent . '/' . VisitorIdHelper::getRealUserIp($request) . '/' . $eventSalt->salt));
    }


    private static function getRealUserIp($request){
        switch(true){
            case (!empty($_SERVER['HTTP_X_REAL_IP'])) : return $_SERVER['HTTP_X_REAL_IP'];
            case (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) : return $_SERVER['HTTP_X_FORWARDED_FOR'];
            default : $request->ip();
        }
    }

}



