<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ComputerController;
use App\Http\Controllers\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

Route::group(['prefix' => 'data'], function () {
    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::group(['prefix' => 'computers'], function () {
            Route::get('all', [ComputerController::class, 'index']);
            Route::get('byUser', [ComputerController::class, 'getByUserId']);
            Route::post('create', [ComputerController::class, 'create']);
            Route::post('save', [ComputerController::class, 'update']);
            Route::post('delete', [ComputerController::class, 'destroy']);
        });
        Route::group(['prefix' => 'jobs'], function () {
            Route::get('all', [JobController::class, 'index']);
            Route::get('byComputer', [JobController::class, 'getByComputerId']);
            Route::post('create', [JobController::class, 'create']);
            Route::post('save', [JobController::class, 'update']);
            Route::post('delete', [JobController::class, 'destroy']);
        });
    });
});
