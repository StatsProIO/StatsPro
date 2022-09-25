<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\DomainsController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ContactsController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/events', [EventsController::class, 'getEvents']);
    Route::get('/events/real-time/{domainName}', [EventsController::class, 'getEventsRealTime']);
    Route::get('/event-status/{domainName}', [EventsController::class, 'getEventStatus']);

    Route::get('/subscription-status', [SubscriptionController::class, 'getSubscriptionStatus']);

    Route::get('/user', function (Request $request) { return $request->user(); });

    Route::post('/domain', [DomainsController::class, 'postDomain'])->name('domain');
});


Route::post('/collect', [EventsController::class, 'postEvent']);
Route::post('/event/time-on-page', [EventsController::class, 'postTimeOnPage']);
Route::get('/2Vj2pBn.jpg', [EventsController::class, 'getTrackerPixel']);
Route::post('/contact', [ContactsController::class, 'postContact'])->name('contact');
