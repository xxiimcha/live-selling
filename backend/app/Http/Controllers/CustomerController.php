<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Resources\CustomerResource;

class CustomerController extends Controller
{
    public function index()
    {
        $users = Customer::all();
        return CustomerResource::collection($users);
    }

    public function store(Request $request)
    {
        $user_req = Customer::create($request->all());
        if($user_req) {
            $user = Customer::findOrFail($user_req->id);
            $hashed_password = Hash::make($request->password);
            if($user) {
                $user->update([
                    'password' => $hashed_password
                ]);
            }
        }
        return new CustomerResource($user);
    }

    public function show($id)
    {
        $user = Customer::find($id);
        if (!$user) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        return new CustomerResource($user);
    }

    public function update(Request $request, $id)
    {
        $user = Customer::find($id);
        if (!$user) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        // Validate and update user
        $user->update($request->all());
        return new CustomerResource($user);
    }

    public function destroy($id)
    {
        $user = Customer::find($id);
        if (!$user) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'Customer deleted successfully'], 200);
    }
}
