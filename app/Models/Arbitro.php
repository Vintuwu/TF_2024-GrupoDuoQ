<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arbitro extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function partidos()
    {
        return $this->belongsToMany(Partido::class, 'arbitros_partido');
    }

    public function deporte()
    {
        return $this->belongsTo(Deporte::class);
    }
}
