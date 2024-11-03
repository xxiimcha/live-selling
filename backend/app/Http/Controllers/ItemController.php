<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return ItemResource::collection($items);
    }

    public function store(Request $request)
    {
        $item = Item::create([
            'item_name' => $request->input('item_name'),
            'item_description' => $request->input('item_description'),
            'category' => $request->input('category'),
            'qty' => $request->input('qty'),
            'price' => $request->input('price'),
        ]);

        return new ItemResource($item);
    }

    public function show($itemId)
    {
        $item = Item::find($itemId);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }
        return new ItemResource($item);
    }

    public function show_by_category()
    {
        $items = Item::select('category', \DB::raw('COUNT(*) as total'))
            ->groupBy('category')
            ->get();
        return $items;
    }

    public function get_items_by_category($category)
    {
        $items = Item::where('category', $category)->get();
        return ItemResource::collection($items);
    }

    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        // Validate and update category
        $item->update($request->all());
        return new ItemResource($item);
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return response()->json(null, 204);
    }

    public function items_with_less_stock()
    {
        $items = Item::where('qty', '<', 5)->get();

        return ItemResource::collection($items);
    }

    public function get_item_by_item_code(Request $request)
    {
        $item = Item::where('item_code', $request->item_code)->first();

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }
        return new ItemResource($item);
    }
}