<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'current_user',
        'sender_id',
        'recipient_id',
        'content',
        'image_name',
        'attachments'
    ];
}
