<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\LiveSellingTrx;
use App\Models\Customer;
use App\Http\Resources\LiveSellingTrxResource;
use Illuminate\Support\Facades\Hash;

class LiveSellingTrxController extends Controller
{
    public function store(Request $request) {
        $user = Auth::user();
        $trx = LiveSellingTrx::create([
            'item_code' => $request->input('val'),
            'status' => $request->input('status'),
            'ordered_by' => $user->email
        ]);
        return new LiveSellingTrxResource($trx);
    }

    public function transaction_by_item(Request $request) {
        $trxs = LiveSellingTrx::select('live_selling_trx.id', 'live_selling_trx.item_code', 'live_selling_trx.ordered_by', 'customers.first_name', 'customers.last_name', 'customers.password', \DB::raw('MAX(live_selling_trx.created_at) as latest_created_at'))
            ->leftJoin('customers', 'live_selling_trx.ordered_by', '=', 'customers.email')
            ->where('live_selling_trx.item_code', $request->item_code)
            ->where('status', '!=', 'Close')
            ->groupBy('live_selling_trx.id', 'live_selling_trx.item_code', 'live_selling_trx.ordered_by', 'customers.first_name', 'customers.last_name', 'customers.password')
            ->orderBy('latest_created_at', 'desc')
            ->get();
    
        // Add index suffix to the transactions
        $trxs = $trxs->values()->map(function ($item, $index) {
            $suffix = ($index % 10 == 0 && $index % 100 != 10) ? 'st' :
                      (($index % 10 == 1 && $index % 100 != 11) ? 'nd' :
                      (($index % 10 == 2 && $index % 100 != 12) ? 'rd' : 'th'));
            $item->index = ($index + 1) . $suffix;
            return $item;
        });
    
        return response()->json($trxs);
    }
    

    public function verify_credentials(Request $request) {
        $customer = Customer::where('email', $request['email'])->first();
        
        if (!$customer) {
            return response()->json(['error' => 'Invalid Credentials'], 200);
        }
        if(Hash::check($request['inputPassword'], $request['password'])) {
            if(Hash::check($request['inputPassword'], $customer->password)) {
                return response()->json(['success' => 'Customer Matches'], 200);
            } else {
                return response()->json(['error' => 'Invalid Credentials'], 200);
            }
        } else {
            return response()->json(['error' => 'Invalid Credentials'], 200);
        }
    }

    public function live_selling_trx(Request $request) {
        $trx = LiveSellingTrx::findOrFail($request->id);
        return new LiveSellingTrxResource($trx);
    }
}
