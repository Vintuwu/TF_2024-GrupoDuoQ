<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $fillable = ['nombre'];

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'categorias_equipo');
    }
    
    public function jugadores()
    {
        return $this->belongsToMany(Jugador::class, 'jugadores_equipo');
    }

    public function partidosComoEquipoUno()
    {
        return $this->hasMany(Partido::class, 'equipo_uno_id');
    }

    public function partidosComoEquipoDos()
    {
        return $this->hasMany(Partido::class, 'equipo_dos_id');
    }

    public function torneo()
    {
        return $this->belongsTo(Torneo::class);
    }
}
