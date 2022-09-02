<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{

    public function getSubscriptionsPage (Request $request) {
        return Inertia::render('Subscriptions');
    }

    public function getSubscriptionCheckoutPage(Request $request) {
        if(!$request->has('price')) {
             return response()->json([
                'errors' => 'No price provided'
            ], 409);
        }

        $url = $request->user()
            ->newSubscription('default', $request->get('price'))
            ->checkout([
            'success_url' => route('subscription-success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('subscription-cancel'),
        ])->url;

        return Inertia::location($url);
    }

    public function getSubscriptionSuccessPage (Request $request) {
        $checkoutSession = $request->user()->stripe()->checkout->sessions->retrieve($request->get('session_id'));
        return Inertia::render('SubscriptionSuccess');
    }

    public function getSubscriptionCancelPage  (Request $request) {
        return redirect('/subscriptions')->with('message', 'Checkout cancelled!');
    }

    public function getSubscriptionBillingPortalPage (Request $request) {
        return Inertia::location($request->user()->redirectToBillingPortal(route('subscriptions')));
    }

    public function getSubscriptionStatus (Request $request) {
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
