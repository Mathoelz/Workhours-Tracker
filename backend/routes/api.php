<?php

use Illuminate\Http\Request;
use StudyApp\Http\Controllers\WorkhoursController;

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

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Auth\AuthController@login')->name('login');
    Route::post('register', 'Auth\AuthController@register');
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'Auth\AuthController@logout');
        Route::put('update', 'Auth\AuthController@update');
        Route::get('delete', 'Auth\AuthController@delete');
        Route::get('user', 'Auth\AuthController@user');
        Route::get('test', 'Auth\AuthController@test');
        // Anlegen, Laden, Löschen usw.
    });
});

Route::group(['prefix' => 'user'],
function () {
    Route::get('getUsers', 'UserController@index');
    Route::get('getUser/{id}', 'UserController@show');
});

Route::group(['prefix' => 'workhours'],
function () {
    Route::post('insert', 'WorkhoursController@insertEntry');
    Route::post('update', 'WorkhoursController@updateEntry');
    Route::post('delete', 'WorkhoursController@deleteEntry');
    Route::post('month', 'WorkhoursController@getMonth');
    Route::post('month2', 'WorkhoursController@getMonth2');
    Route::post('insertEmptyEntry', 'WorkhoursController@insertEmptyEntry');
    Route::post('updateStartTime', 'WorkhoursController@updateStartTime');
    Route::post('updateEndTime', 'WorkhoursController@updateEndTime');
    Route::post('updateBreakTime', 'WorkhoursController@updateBreakTime');
    Route::post('updateDrivenTime', 'WorkhoursController@updateDrivenTime');
});

