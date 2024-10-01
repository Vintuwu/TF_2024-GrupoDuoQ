<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipo;
use App\Models\Deporte;
use App\Models\Categoria;

class EquiposSeeder extends Seeder
{
    public function run()
    {
        // Obtener todos los deportes
        $deportes = Deporte::all();

        // Obtener todas las categorías
        $categorias = Categoria::all();

        // Iterar sobre cada deporte
        foreach ($deportes as $deporte) {
            // Crear varios equipos para cada deporte
            for ($i = 1; $i <= 5; $i++) { // 5 es el número de equipos que se van a crear por deporte
                // Crear el equipo
                $equipo = Equipo::create([
                    'nombre' => "{$deporte->nombre} Equipo {$i}",
                    'habilitado' => true, // o false dependiendo de tus necesidades
                    'deporte_id' => $deporte->id, // Asignar el ID del deporte
                ]);

                // Seleccionar aleatoriamente 8 categorías para este equipo
                $categoriasAleatorias = $categorias->random(8); // Obtiene 8 categorías aleatorias

                // Asumimos que existe una relación 'categorias' en el modelo Equipo
                $equipo->categorias()->attach($categoriasAleatorias); // Adjuntar las categorías aleatorias al equipo
            }
        }
    }
}
