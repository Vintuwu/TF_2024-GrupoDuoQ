<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Torneo;
use App\Models\Equipo; // Asegúrate de importar el modelo de Equipo
use Illuminate\Http\Request;
use App\Http\Controllers\TorneoController;
use Carbon\Carbon;

class TorneoSeeder extends Seeder
{
    public function run()
    {
        // Crear el controlador
        $torneoController = new TorneoController();

        // Crear el primer torneo (Fútbol)
        $torneoFutbol = Torneo::create([
            'nombre' => 'Torneo de Fútbol U17',
            'fechaInicio' => Carbon::create(2024, 10, 20), // Fecha de inicio
            'fechaFin' => null,
            'ubicacion' => 'Calle Fútbol 123',
            'formato' => 'Eliminación Simple',
            'categoria_id' => 5,
            'deporte_id' => 1,
            'estado_id' => 1,
        ]);

        // Obtener IDs de equipos de fútbol (IDs 1, 2, 3 y 4)
        $equiposFutbolIds = [1, 2, 3, 4];

        // Preparar datos para la solicitud
        $requestFutbol = new Request([
            'dias' => ['Sábado', 'Domingo'],
            'rangosHorarios' => [
                'Sábado' => ['start' => '13:00', 'end' => '19:00'],
                'Domingo' => ['start' => '14:00', 'end' => '18:00']
            ],
            'canchas' => 1,
            'duracionPartido' => 90,
            'formatoTorneo' => 'elimination',
            'equiposSeleccionados' => $equiposFutbolIds, // Usa el arreglo de IDs aquí
        ]);

        // Llamar a la función de configurar fixture
        $torneoController->configurarFixture($requestFutbol, $torneoFutbol);

        // Crear el segundo torneo (Básquet)
        $torneoBasquet = Torneo::create([
            'nombre' => 'Torneo de Básquet U15',
            'fechaInicio' => Carbon::create(2024, 11, 5), // Fecha de inicio
            'fechaFin' => null,
            'ubicacion' => 'Calle Básquet 456',
            'formato' => 'Round Robin',
            'categoria_id' => 8,
            'deporte_id' => 2,
            'estado_id' => 1,
        ]);

        // Obtener IDs de equipos de básquet (IDs 7, 8, 9 y 10)
        $equiposBasquetIds = [7, 8, 9, 10];

        // Preparar datos para la solicitud
        $requestBasquet = new Request([
            'dias' => ['Viernes', 'Sábado'],
            'rangosHorarios' => [
                'Viernes' => ['start' => '18:00', 'end' => '18:40'],
                'Sábado' => ['start' => '09:00', 'end' => '13:00']
            ],
            'canchas' => 1,
            'duracionPartido' => 40,
            'formatoTorneo' => 'round_robin',
            'equiposSeleccionados' => $equiposBasquetIds, // Usa el arreglo de IDs aquí
        ]);

        // Llamar a la función de configurar fixture
        $torneoController->configurarFixture($requestBasquet, $torneoBasquet);

        // Crear el tercer torneo (Vóley)
        Torneo::create([
            'nombre' => 'Torneo de Vóley Mixto Juvenil',
            'fechaInicio' => Carbon::create(2024, 12, 10), // Fecha de inicio
            'fechaFin' => null,
            'ubicacion' => 'Calle Vóley 789',
            'formato' => null, // Sin formato
            'categoria_id' => 13,
            'deporte_id' => 3,
            'estado_id' => 1,
        ]);
    }
}
