<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;
    
    protected $fillable = ['fecha', 'hora', 'ronda', 'puntaje_equipo_uno', 'puntaje_equipo_dos'];

    protected $casts = [
        'ronda' => 'integer',
    ];

    public function arbitros()
    {
        return $this->belongsToMany(Arbitro::class, 'arbitros_partido');
    }

    public function equipoUno()
    {
        return $this->belongsTo(Equipo::class, 'equipo_uno_id');
    }

    public function equipoDos()
    {
        return $this->belongsTo(Equipo::class, 'equipo_dos_id');
    }

    public function torneo()
    {
        return $this->belongsTo(Torneo::class);
    }

    public function estado()
    {
        return $this->belongsTo(Estado::class);
    }
}
