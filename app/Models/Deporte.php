<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deporte extends Model
{
    protected $fillable = ['nombre', 'nombreImagen'];
    
    public function torneos()
    {
        return $this->hasMany(Torneo::class);
    }

    public function administradoresDeportivos()
    {
        return $this->hasMany(AdministradorDeportivo::class);
    }

    public function arbitros()
    {
        return $this->hasMany(Arbitro::class);
    }

    public function noticias()
    {
        return $this->hasMany(Noticia::class);
    }
}
