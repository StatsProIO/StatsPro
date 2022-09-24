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

//TODO: verify all these are actually authenticated
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/get-visitor-id', [EventsController::class, 'getVisitorId']);
Route::post('/collect', [EventsController::class, 'postEvent']);
Route::post('/event/time-on-page', [EventsController::class, 'postTimeOnPage']);
Route::get('/2Vj2pBn.jpg', [EventsController::class, 'getTrackerPixel']);

Route::middleware('auth:sanctum')->get('/events', [EventsController::class, 'getEvents']);
Route::middleware('auth:sanctum')->get('/events/real-time', [EventsController::class, 'getEventsRealTime']);
Route::middleware('auth:sanctum')->get('/event-status/{domainName}', [EventsController::class, 'getEventStatus']);
Route::middleware('auth:sanctum')->post('/domain', [DomainsController::class, 'postDomain'])->name('domain');

Route::middleware('auth:sanctum')->get('/subscription-status', [SubscriptionController::class, 'getSubscriptionStatus']);


Route::post('/contact', [ContactsController::class, 'postContact'])->name('contact');
