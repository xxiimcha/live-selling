<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Attempt login with 'customers' guard
        if (Auth::guard('customers')->attempt($credentials)) {
            $user = Auth::guard('customers')->user();
            $token = $user->createToken('MyAppToken')->plainTextToken;

            return response()->json([
                'token' => $token,
                'role' => 'customer',
                'email' => $user->email,
                'currentUser' => $user->id,
            ], 200);
        }

        // Attempt login with 'web' guard
        if (Auth::guard('web')->attempt($credentials)) {
            $user = Auth::guard('web')->user();
            $token = $user->createToken('MyAppToken')->plainTextToken;

            return response()->json([
                'token' => $token,
                'role' => $user->role,
                'currentUser' => $user->id,
            ], 200);
        }

        // If authentication fails
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
