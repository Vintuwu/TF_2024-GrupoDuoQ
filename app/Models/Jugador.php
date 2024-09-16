<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    use HasFactory;
    
    protected $fillable = ['nombre', 'apellido', 'fechaNac', 'genero'];
    
    public function equipos()
    {
        return $this->belongsToMany(Equipo::class, 'jugadores_equipo');
    }
}
