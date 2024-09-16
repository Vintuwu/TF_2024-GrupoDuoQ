<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodista extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function noticias()
    {
        return $this->hasMany(Noticia::class);
    }
}
