<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\DomainsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/collect', [EventsController::class, 'postEvent']);

Route::middleware('auth:sanctum')->post('/domain', [DomainsController::class, 'postDomain']);

//TODO: this needs to be authenticated
Route::get('/events', [EventsController::class, 'getEvents']);


