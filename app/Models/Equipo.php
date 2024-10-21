<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'nombre',
        'habilitado',
        'deporte_id',
    ];
    
    public function deporte()
    {
        return $this->belongsTo(Deporte::class);
    }

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'categorias_equipo');
    }
    
    public function jugadores()
    {
        return $this->belongsToMany(Jugador::class, 'jugadores_equipo', 'equipo_id', 'jugador_dni', 'id', 'dni');
    }

    public function torneos()
    {
        return $this->belongsToMany(Torneo::class, 'torneos_equipo');
    }

    public function partidosComoEquipoUno()
    {
        return $this->hasMany(Partido::class, 'equipo_uno_id');
    }

    public function partidosComoEquipoDos()
    {
        return $this->hasMany(Partido::class, 'equipo_dos_id');
    }

    
}
