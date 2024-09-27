<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'nombre',
        'fechaInicio',
        'fechaFin',
        'ubicacion',
        'categoria_id',
        'deporte_id',
        'estado_id',
    ];
    
    public function deporte()
    {
        return $this->belongsTo(Deporte::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function estado()
    {
        return $this->belongsTo(Estado::class);
    }

    public function partidos()
    {
        return $this->hasMany(Partido::class);
    }

    public function equipos()
    {
        return $this->belongsTo(Equipo::class);
    }
}
