<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function messages(Request $request) {
        $user = Auth::user();
        if($user->role === "super admin") {
            $msgs = Message::where('current_user', $request->chat['userId'])
            ->orWhere('current_user', $user->id)
            ->orderBy('id', 'asc')
            ->get();
        } else {
            $msgs = Message::where('sender_id', $user->id)
            ->orWhere('recipient_id', $user->id)
            ->orderBy('id', 'asc')
            ->get();
        }
        return response()->json($msgs, 200);
    }

    public function __store(Request $request) {
        $user = Auth::user();
        $msg = Message::create([
            'current_user' => $user->id,
            'sender_id' => $request->sender_id,
            'recipient_id' => $request->recipient_id,
            'content' => $request->content,
            'image_name' => $request->img_name,
            'attachments' => $request->img
        ]);

        return $msg;
    }

    public function store(Request $request) {
        $user = Auth::user();
    
        $msg = Message::create([
            'current_user' => $user->id,
            'sender_id' => $request->sender_id,
            'recipient_id' => $request->recipient_id,
            'content' => $request->content,
            'image_name' => $request->img_name,
            'attachments' => $request->img
        ]);
    
        return response()->json($msg);
    }    
}
