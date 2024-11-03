<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveSellingTrx extends Model
{
    use HasFactory;
    protected $table = 'live_selling_trx';

    protected $fillable = [
        'item_code',
        'ordered_by',
        'status'
    ];
}