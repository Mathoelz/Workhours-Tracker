<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//User
Route::get('/user', 'UserController@getIndex');
Route::get('/user/index', 'UserController@getIndex');

// User
Route::get('/user/add', 'UserController@getAdd');
Route::post('/user/add', 'UserController@postAdd');
Route::get('/user/edit/{id?}', 'UserController@getEdit');
Route::post('/user/edit/{id?}', 'UserController@postEdit');
Route::get('/user/show/{id?}', 'UserController@getShow');
Route::get('/user/delete/{id?}', 'UserController@getDelete');

Auth::routes();

Route::get('/courseelement_user/{user_id}', 'CourseelementController@getCourseelementUserIndex');



