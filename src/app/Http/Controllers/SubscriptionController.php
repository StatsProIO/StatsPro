<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\SubscriptionService;
use Illuminate\Support\Facades\Log;


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
        try {
            return Inertia::location($request->user()->redirectToBillingPortal(route('subscriptions')));
        } catch ( \Exception $e ) {
            Log::error($e->getMessage());
        }
    }

    public function getSubscriptionStatus (Request $request) {
        return SubscriptionService::getSubscriptionStatus();

    }
}
