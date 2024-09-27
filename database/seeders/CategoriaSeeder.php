<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            [
                'nombre' => 'U19 M',
                'edadMaxima' => 19,
                'genero' => 'Masculino',
            ],
            [
                'nombre' => 'U19 F',
                'edadMaxima' => 19,
                'genero' => 'Femenino',
            ],
            [
                'nombre' => 'SUB18 M',
                'edadMaxima' => 18,
                'genero' => 'Masculino',
            ],
            [
                'nombre' => 'SUB18 F',
                'edadMaxima' => 18,
                'genero' => 'Femenino',
            ],
            [
                'nombre' => 'U17 M',
                'edadMaxima' => 17,
                'genero' => 'Masculino',
            ],
            [
                'nombre' => 'U17 F',
                'edadMaxima' => 17,
                'genero' => 'Femenino',
            ],
            [
                'nombre' => 'U15 M',
                'edadMaxima' => 15,
                'genero' => 'Masculino',
            ],
            [
                'nombre' => 'U15 F',
                'edadMaxima' => 15,
                'genero' => 'Femenino',
            ],
            [
                'nombre' => 'U12 M',
                'edadMaxima' => 12,
                'genero' => 'Masculino',
            ],
            [
                'nombre' => 'U12 F',
                'edadMaxima' => 12,
                'genero' => 'Femenino',
            ],
            [
                'nombre' => 'Adultos M',
                'edadMaxima' => 35,
                'genero' => 'Masculino',
            ],
            [
                'nombre' => 'Adultos F',
                'edadMaxima' => 35,
                'genero' => 'Femenino',
            ],
            [
                'nombre' => 'Mixto Juvenil',
                'edadMaxima' => 19,
                'genero' => 'Mixto',
            ],
            [
                'nombre' => 'Mixto Adultos',
                'edadMaxima' => 35,
                'genero' => 'Mixto',
            ],
        ];
        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
