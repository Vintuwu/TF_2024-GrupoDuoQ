<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $fillable = ['nombre', 'descripcion'];

    public function torneos()
    {
        return $this->hasMany(Torneo::class);
    }

    public function partidos()
    {
        return $this->hasMany(Partido::class);
    }
}
