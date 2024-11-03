<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $customer = \App\Models\Customer::where('email', $this->ordered_by)->first();

        $item = \App\Models\Item::where('item_code', $this->item_code)->first();

        return [
            'id' => $this->id,
            'sales_invoice' => sprintf('%09d', $this->id),
            'ordered_by' => $this->ordered_by,
            'item_code' => $this->item_code,
            'item_name' => $item ? $item->item_name : null,
            'qty' => $this->qty,
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'created_at' => $this->created_at ? $this->created_at->setTimezone('Asia/Manila')->format('F d, Y') : null,
            'due_by' => $this->created_at ? $this->created_at->setTimezone('Asia/Manila')->modify('+5 days')->format('F d, Y') : null,
            'ordered_by_name' => $customer ? $customer->first_name . ' ' . $customer->last_name : null,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
