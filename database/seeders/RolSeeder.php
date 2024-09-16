<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            ['nombre' => 'Administrador'],
            ['nombre' => 'Administrador deportivo'],
            ['nombre' => 'Árbitro'],
            ['nombre' => 'Periodista'],
            ['nombre' => 'Usuario']
        ];

        foreach ($roles as $rol) {
            Rol::create($rol);
        }
    }
}
