<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    protected $fillable = ['titulo', 'contenido', 'nombreImagen'];

    public function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    public function deporte()
    {
        return $this->belongsTo(Deporte::class);
    }

    public function periodista()
    {
        return $this->belongsTo(Periodista::class);
    }
}
