<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Item;
use App\Models\LiveSellingTrx;
use App\Http\Resources\PurchaseResource;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::all();
        return PurchaseResource::collection($purchases);
    }

    public function store(Request $request)
    {
        $item = Item::where('item_code', $request->item_code)->first();
        if($item['qty'] > 0) {
            $item['qty'] = $item['qty'] - $request->qty;
            $item->update([$item['qty']]);
            $purchase = Purchase::create($request->all());
            $trx = LiveSellingTrx::findOrFail($request->trxId);
            $trx->update([
                'status' => 'Done'
            ]);
            return new PurchaseResource($purchase);
        } else {
            return response()->json(['message' => 'Item Out of Stock'], 200);
        }
    }

    public function show($id)
    {
        $purchase = Purchase::find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }
        return new PurchaseResource($purchase);
    }

    public function update(Request $request, $id)
    {
        $purchase = Purchase::find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }

        // Validate and update purchase
        $purchase->update($request->all());
        return new PurchaseResource($purchase);
    }

    public function destroy($id)
    {
        $purchase = Purchase::find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }

        $purchase->delete();
        return response()->json(['message' => 'Purchase deleted successfully'], 200);
    }

    public function get_purchase_by_email(Request $request)
    {
        $purchases = Purchase::where('ordered_by', $request->email)->get();
        if (!$purchases) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }
        return PurchaseResource::collection($purchases);
    }

    public function most_bought_items() {
        $topItems = \DB::table('purchases')
            ->join('items', 'items.item_code', '=', 'purchases.item_code')
            ->select('items.item_name as item_name', \DB::raw('COUNT(*) as count'))
            ->groupBy('items.item_code', 'items.item_name')
            ->orderByDesc('count')
            ->limit(5)
            ->get();
        return $topItems->toArray();
    }
}