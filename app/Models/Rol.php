<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $fillable = ['nombre'];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_rol');
    }
}