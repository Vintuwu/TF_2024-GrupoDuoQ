<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    
    protected $fillable = ['nombre', 'edadMaxima', 'genero'];

    protected $casts = [
        'edadMaxima' => 'integer',
    ];

    public function equipos()
    {
        return $this->belongsToMany(Partido::class, 'categorias_equipo');
    }

    public function torneos()
    {
        return $this->hasMany(Torneo::class);
    }
}
