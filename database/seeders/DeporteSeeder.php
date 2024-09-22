<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Deporte;

class DeporteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Lista de deportes con sus nombres e imágenes
        $deportes = [
            ['nombre' => 'Fútbol', 'nombreImagen' => 'deportes/futbol.jpg'],
            ['nombre' => 'Básquet', 'nombreImagen' => 'deportes/basquet.jpg'],
            ['nombre' => 'Voley', 'nombreImagen' => 'deportes/voley.webp'],
            ['nombre' => 'Tenis', 'nombreImagen' => 'deportes/tenis.webp'],
            ['nombre' => 'Handball', 'nombreImagen' => 'deportes/handball.jpg'],
        ];

        foreach ($deportes as $deporte) {
            Deporte::create($deporte);
        }
    }
}
