<?php
namespace App\Services;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SubscriptionService
{
    public static function getSubscriptionStatus () {
        $returnValue = [];
        $returnValue['subscription_product_id'] = 'free';

        if(Auth::user()->subscription('default') && Auth::user()->subscription('default')->recurring() /*user is not on a trial*/) {
            $returnValue['isSubscribed'] = Auth::user()->subscribed('default');

            if (Auth::user()->subscribedToProduct(config('app.vite_stripe_entrepreneur_product_id'), 'default')) {
                $returnValue['subscription_product_id'] = config('app.vite_stripe_entrepreneur_product_id');
            } else if (Auth::user()->subscribedToProduct(config('app.vite_stripe_professional_product_id'), 'default')) {
                $returnValue['subscription_product_id'] = config('app.vite_stripe_professional_product_id');
            } else if (Auth::user()->subscribedToProduct(config('app.vite_stripe_professional_plus_product_id'), 'default')) {
                $returnValue['subscription_product_id'] = config('app.vite_stripe_professional_plus_product_id');
            }
        } else {
            $returnValue['isSubscribed'] = false;
        }

        return $returnValue;
    }
}
