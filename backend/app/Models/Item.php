<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['item_name', 'item_description', 'qty', 'category', 'price'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            $lastItem = static::latest('id')->first();
            $id = $lastItem ? $lastItem->id + 1 : 1;
            $item->item_code = 'ITEM-' . $id;
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
