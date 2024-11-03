<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\URLController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LiveSellingTrxController;
use App\Http\Controllers\MessageController;

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

Route::get('open-in-desktop', [URLController::class, 'open_in_desktop']);

Route::get('get_access_token', [FacebookController::class, 'get_access_token']);
Route::get('get_latest_post', [FacebookController::class, 'get_latest_post']);
Route::get('get_comment_list/{post_id}', [FacebookController::class, 'get_comment_list']);
Route::get('get_comment/{comment_id}', [FacebookController::class, 'get_comment']);

Route::post('login', [AuthController::class, 'login']);

Route::get('/purchases', [PurchaseController::class, 'index']);
Route::post('/purchases', [PurchaseController::class, 'store']);
Route::get('/purchases/{id}', [PurchaseController::class, 'show']);
Route::patch('/purchases/{id}', [PurchaseController::class, 'update']);
Route::delete('/purchases/{id}', [PurchaseController::class, 'destroy']);
Route::post('/my-purchases', [PurchaseController::class, 'get_purchase_by_email']);
Route::get('/most_bought_items', [PurchaseController::class, 'most_bought_items']);

Route::post('/verify_credentials', [LiveSellingTrxController::class, 'verify_credentials']);
Route::get('/live_selling_trx/{id}', [LiveSellingTrxController::class, 'live_selling_trx']);
Route::get('/get_item_by_item_code/{item_code}', [ItemController::class, 'get_item_by_item_code']);

Route::post('/new-customer', [CustomerController::class, 'store']);

function sendMessageToWebSocket($message) {
    $data = [
        'sender_id' => $message->sender_id,
        'receiver_id' => $message->receiver_id,
        'content' => $message->content,
    ];

    $wsUrl = 'http://localhost:3000/send-message';
    $ch = curl_init($wsUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_exec($ch);
    curl_close($ch);
}

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users', [UserController::class, 'users']);
    Route::post('/users', [UserController::class, 'store']);
    Route::patch('/users', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/users/{id}', [UserController::class, 'get_user']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::patch('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::get('/items/all', [ItemController::class, 'index']);
    Route::post('/items', [ItemController::class, 'store']);
    Route::get('/items', [ItemController::class, 'show_by_category']);
    Route::get('/items/{category}', [ItemController::class, 'get_items_by_category']);
    Route::get('/items-with-less-stock', [ItemController::class, 'items_with_less_stock']);
    Route::get('/item/{itemId}', [ItemController::class, 'show']);
    Route::patch('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);

    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::patch('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    Route::post('/mine', [LiveSellingTrxController::class, 'store']);
    Route::get('/miner-list/{item_code}', [LiveSellingTrxController::class, 'transaction_by_item']);

    Route::post('/chat-history', [MessageController::class, 'messages']);
    Route::post('/save-chat', [MessageController::class, 'store']);

    Route::post('/send-message', function (Request $request) {
        $message = new Message();
        $message->sender_id = $request->input('sender_id');
        $message->receiver_id = $request->input('receiver_id');
        $message->content = $request->input('message');
        $message->save();

        sendMessageToWebSocket($message);

        return response()->json(['status' => 'Message sent!']);
    });
});
