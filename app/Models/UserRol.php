<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserRol extends Model
{
    use HasFactory;
    
    protected $table = 'user_rol';

    function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    function rol(): BelongsTo {
        return $this->belongsTo(Rol::class);
    }
}
