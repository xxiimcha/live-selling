<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FacebookController extends Controller
{
    public function get_access_token(Request $request) {
        $secret = config('facebook.fb_secret');
        $client = config('facebook.fb_app');
        $url = "https://graph.facebook.com/oauth/access_token?client_id={$client}&client_secret={$secret}&grant_type=client_credentials";

        $response = Http::get($url);
        return response($response->body(), $response->status())->header('Content-Type', 'application/json');
    }

    public function get_latest_post(Request $request)
    {
        $accessToken = config('facebook.fb_token');
        $url = "https://graph.facebook.com/v20.0/me?fields=posts&access_token={$accessToken}";

        $response = Http::get($url);
        return response($response->body(), $response->status())->header('Content-Type', 'application/json');
    }

    public function get_comment_list(Request $request, $post_id)
    {
        $accessToken = config('facebook.fb_token');
        $url = "https://graph.facebook.com/v20.0/{$post_id}/comments?access_token={$accessToken}";
        $response = Http::get($url);
        return response($response->body(), $response->status())->header('Content-Type', 'application/json');
    }

    public function get_comment(Request $request, $comment_id) {
        $accessToken = config('facebook.fb_token');
        $url = "https://graph.facebook.com/v20.0/{$comment_id}?access_token={$accessToken}";
        $response = Http::get($url);
        return response($response->body(), $response->status())->header('Content-Type', 'application/json');
    }
}
