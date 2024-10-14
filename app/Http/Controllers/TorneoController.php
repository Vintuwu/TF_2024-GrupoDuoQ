<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveTorneoRequest;
use Illuminate\Http\Request;
use App\Models\Torneo;
use App\Models\Deporte;
use App\Models\Categoria;
use App\Models\Equipo;
use App\Models\Partido;
use Exception;
use Inertia\Inertia;

class TorneoController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $torneos = Torneo::get();

        return Inertia::render('Torneo/Index', compact('torneos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Deporte $deporte)
    {
        $categorias = Categoria::all(); // Obtén todas las categorías
        return Inertia::render('Torneo/Create', [
            'deporte' => $deporte,
            'categorias' => $categorias,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveTorneoRequest $request, Deporte $deporte)
    {
        // Validar los datos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fechaInicio' => 'nullable|date',
            'fechaFin' => 'nullable|date',
            'ubicacion' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        // Crear el torneo con estado 'Preparación' (id 1)
        $torneo = Torneo::create([
            'nombre' => $request->nombre,
            'fechaInicio' => $request->fechaInicio,
            'fechaFin' => $request->fechaFin,
            'ubicacion' => $request->ubicacion,
            'categoria_id' => $request->categoria_id,
            'deporte_id' => $deporte->id,
            'estado_id' => 1, // Asignar automáticamente el estado 'Preparación'
        ]);

        // Redireccionar o devolver una respuesta
        return redirect()->route('deporte.torneo.show', [$deporte->nombre, $torneo->id])
            ->with('success', 'Torneo creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Deporte $deporte, Torneo $torneo)
    {
        $equiposElegibles = [];
        if ($torneo->estado->nombre === 'Preparación') {
            // Obtener los equipos habilitados que coincidan con la categoría y el deporte del torneo
            $equiposElegibles = Equipo::whereHas('categorias', function ($query) use ($torneo) {
                $query->where('categoria_id', $torneo->categoria_id);
            })->where('deporte_id', $torneo->deporte_id)->get()->where('habilitado', true);
        }

        return Inertia::render('Torneo/Show', [
            'torneo' => $torneo,
            'deporte' => $deporte,
            'estado' => $torneo->estado,
            'categoria' => $torneo->categoria,
            'equiposElegibles' => $equiposElegibles,
        ]);
    }

    public function configurarFixture(Request $request, Torneo $torneo)
    {
        $validated = $request->validate([
            'dias' => 'required|array',
            'rangosHorarios' => 'required|array',
            'rangosHorarios.*.start' => 'required|date_format:H:i',
            'rangosHorarios.*.end' => 'required|date_format:H:i',
            'canchas' => 'required|integer|min:1',
            'duracionPartido' => 'required|integer|min:1',
            'formatoTorneo' => 'required|string',
            'equiposSeleccionados' => 'required|array|min:2',
        ]);



        // Validar que el número de equipos seleccionados sea una potencia de 2 si el formato es eliminación directa
        if ($request->formatoTorneo === 'elimination') {
            $numEquipos = count($request->equiposSeleccionados);
            if ($numEquipos < 2 || !$this->isPowerOfTwo($numEquipos)) {
                return back()->withErrors(['equiposSeleccionados' => 'El número de equipos seleccionados debe ser una potencia de 2 (2, 4, 8, 16, etc.) para la eliminación directa.']);
            }
        }

        // Guardar el formato del torneo
        $torneo->formato = $validated['formatoTorneo'];
        $torneo->estado_id = 2;
        $torneo->save();

        $torneo->equipos()->attach($validated['equiposSeleccionados']);

        // Crear los partidos basados en el formato del torneo
        if ($validated['formatoTorneo'] == 'round_robin') {
            $this->generateRoundRobinMatches($torneo, $validated);
        } else if ($validated['formatoTorneo'] == 'elimination') {
            $this->generateSingleEliminationMatches($torneo, $validated);
        }

        return redirect()->route('deporte.torneo.show', [$torneo->deporte->nombre, $torneo->id])
            ->with('success', 'Torneo creado exitosamente.');
    }

    // Función para verificar si un número es potencia de 2
    function isPowerOfTwo($num)
    {
        return $num && (($num & ($num - 1)) === 0);
    }

    private function generateRoundRobinMatches($torneo, $data)
    {
        $equipos = $data['equiposSeleccionados']; // IDs de los equipos seleccionados
        $dias = $data['dias']; // Días seleccionados

        // Ordenar los días seleccionados por el orden de la semana (comenzando el lunes)
        $ordenDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        usort($dias, function ($a, $b) use ($ordenDias) {
            return array_search($a, $ordenDias) - array_search($b, $ordenDias);
        });

        $rangosHorarios = $data['rangosHorarios']; // Rango horario por día
        $duracionPartido = $data['duracionPartido'];
        $canchas = $data['canchas']; // Número de canchas
        $fechaInicio = \Carbon\Carbon::parse($torneo->fechaInicio); // Fecha de inicio del torneo

        // Mapeo de días en español a inglés
        $diasMapeados = [
            'Lunes' => 'Monday',
            'Martes' => 'Tuesday',
            'Miércoles' => 'Wednesday',
            'Jueves' => 'Thursday',
            'Viernes' => 'Friday',
            'Sábado' => 'Saturday',
            'Domingo' => 'Sunday'
        ];

        $numEquipos = count($equipos);

        // Si el número de equipos es impar, añadimos un equipo ficticio
        if ($numEquipos % 2 !== 0) {
            $equipos[] = null; // Equipo ficticio (fecha libre)
            $numEquipos++;
        }

        $numRondas = $numEquipos - 1; // Cantidad de rondas (todos contra todos)
        $partidos = [];
        $dia = $dias[0];
        $fechaSemana = (clone $fechaInicio)->next($diasMapeados[$dia]); // Ajustar la fecha para el día correspondiente

        // Generar partidos únicos para cada ronda
        for ($ronda = 0; $ronda < $numRondas; $ronda++) {
            $partidosDeRonda = []; // Reiniciar el array de partidos de la ronda actual

            // Generar los partidos para la ronda actual
            for ($match = 0; $match < $numEquipos / 2; $match++) {
                $equipoUno = $equipos[$match];
                $equipoDos = $equipos[$numEquipos - 1 - $match];

                // Si hay un equipo "bye", no se genera el partido
                if ($equipoUno !== null && $equipoDos !== null) {
                    $partidosDeRonda[] = [
                        'equipo_uno_id' => $equipoUno,
                        'equipo_dos_id' => $equipoDos,
                        'torneo_id' => $torneo->id,
                        'ronda' => $ronda + 1,
                        'puntaje_equipo_uno' => null,
                        'puntaje_equipo_dos' => null,
                        'estado_id' => 2, // Estado pendiente
                    ];
                }
            }

            // Asignar fechas y horarios a los partidos de la ronda actual
            $i = 0;
            $dia = $dias[$i];
            $rango = $rangosHorarios[$dia];
            $horaInicio = \Carbon\Carbon::createFromFormat('H:i', $rango['start']);
            $horaFin = \Carbon\Carbon::createFromFormat('H:i', $rango['end']);

            shuffle($partidosDeRonda); // Para asignar los partidos en orden aleatorio
            // Asignar horarios a los partidos
            foreach ($partidosDeRonda as $partido) {
                $canchasUsadas = 0;
                // Si no queda tiempo, se pasa al próximo día seleccionado
                if ($horaInicio >= $horaFin) {
                    $dia = $dias[$i + 1];
                    $fechaSemana = (clone $fechaSemana)->next($diasMapeados[$dia]);
                    $rango = $rangosHorarios[$dia];
                    $horaInicio = \Carbon\Carbon::createFromFormat('H:i', $rango['start']);
                    $horaFin = \Carbon\Carbon::createFromFormat('H:i', $rango['end']);
                }

                $partido['fecha'] = $fechaSemana->format('Y-m-d');
                $partido['hora'] = $horaInicio->format('H:i:s');

                $canchasUsadas++;
                if ($canchasUsadas >= $canchas) {
                    // Aumentar la hora de inicio por la duración del partido más el tiempo de descanso
                    $horaInicio->addMinutes($duracionPartido + 10); // 10 minutos de descanso
                }

                // Agregar el partido ya con fecha y hora asignada al arreglo de partidos
                $partidos[] = $partido;
            }

            // Rotar los equipos para la próxima ronda
            if ($numEquipos > 1) {
                $fixed = array_shift($equipos); // El primer equipo queda fijo
                $last = array_pop($equipos);
                array_unshift($equipos, $last);
                array_unshift($equipos, $fixed);
            }

            // Aumentar la fecha para la próxima ronda
            $fechaSemana = (clone $fechaSemana)->next($diasMapeados[$dias[0]]);
        }

        // Insertar partidos en la base de datos
        Partido::insert($partidos);

        return true;
    }

    private function generateSingleEliminationMatches($torneo, $data)
    {
        $equipos = $data['equiposSeleccionados']; // IDs de los equipos seleccionados
        $dias = $data['dias']; // Días seleccionados
        $rangosHorarios = $data['rangosHorarios']; // Rango horario por día
        $duracionPartido = $data['duracionPartido'];
        $canchas = $data['canchas']; // Número de canchas
        $fechaInicio = \Carbon\Carbon::parse($torneo->fechaInicio); // Fecha de inicio del torneo

        // Mapeo de días en español a inglés
        $diasMapeados = [
            'Lunes' => 'Monday',
            'Martes' => 'Tuesday',
            'Miércoles' => 'Wednesday',
            'Jueves' => 'Thursday',
            'Viernes' => 'Friday',
            'Sábado' => 'Saturday',
            'Domingo' => 'Sunday'
        ];

        $numEquipos = count($equipos);

        // Asegurarse de que el número de equipos sea una potencia de 2
        if (!($numEquipos && !($numEquipos & ($numEquipos - 1)))) {
            throw new Exception("El número de equipos debe ser una potencia de 2.");
        }

        $numRondas = log($numEquipos, 2); // Calcular el número de rondas
        $partidos = [];
        $dia = $dias[0];
        $fechaSemana = (clone $fechaInicio)->next($diasMapeados[$dia]); // Ajustar la fecha para el día correspondiente

        // Generar partidos para cada ronda
        for ($ronda = 0; $ronda < $numRondas; $ronda++) {
            $partidosDeRonda = []; // Reiniciar el array de partidos de la ronda actual
            $numPartidos = count($equipos) / 2; // Número de partidos en esta ronda

            // Generar partidos para la ronda actual
            for ($match = 0; $match < $numPartidos; $match++) {
                $equipoUno = $equipos[$match];
                $equipoDos = $equipos[count($equipos) - 1 - $match]; // Usar count(equipos) en lugar de numEquipos

                // Crear partido sin equipos asignados para las rondas posteriores
                $partidosDeRonda[] = [
                    'equipo_uno_id' => ($ronda == 0) ? $equipoUno : null,
                    'equipo_dos_id' => ($ronda == 0) ? $equipoDos : null,
                    'torneo_id' => $torneo->id,
                    'ronda' => $ronda + 1,
                    'puntaje_equipo_uno' => null,
                    'puntaje_equipo_dos' => null,
                    'estado_id' => 2, // Estado pendiente
                ];
            }

            // Asignar fechas y horarios a los partidos de la ronda actual
            $i = 0;
            $dia = $dias[$i];
            $rango = $rangosHorarios[$dia];
            $horaInicio = \Carbon\Carbon::createFromFormat('H:i', $rango['start']);
            $horaFin = \Carbon\Carbon::createFromFormat('H:i', $rango['end']);
            $canchasUsadas = 0; // Contador de canchas utilizadas

            // Asignar horarios a los partidos
            foreach ($partidosDeRonda as &$partido) {
                // Si no queda tiempo, se pasa al próximo día seleccionado
                while ($horaInicio >= $horaFin) {
                    $i++; // Avanzar al siguiente día
                    if ($i < count($dias)) {
                        $dia = $dias[$i];
                        $fechaSemana = (clone $fechaSemana)->next($diasMapeados[$dia]);
                        $rango = $rangosHorarios[$dia];
                        $horaInicio = \Carbon\Carbon::createFromFormat('H:i', $rango['start']);
                        $horaFin = \Carbon\Carbon::createFromFormat('H:i', $rango['end']);
                        $canchasUsadas = 0; // Reiniciar contador al cambiar de día
                    } else {
                        return; // No hay más días disponibles
                    }
                }

                // Asignar la fecha y hora al partido
                $partido['fecha'] = $fechaSemana->format('Y-m-d');
                $partido['hora'] = $horaInicio->format('H:i:s');

                // Incrementar el contador de canchas utilizadas
                $canchasUsadas++;

                // Si se han utilizado todas las canchas, aumentar la hora de inicio
                if ($canchasUsadas >= $canchas) {
                    // Aumentar la hora de inicio por la duración del partido más el tiempo de descanso
                    $horaInicio->addMinutes($duracionPartido + 10); // 10 minutos de descanso
                    $canchasUsadas = 0; // Reiniciar el contador de canchas
                }
            }

            // Actualizar los equipos para la próxima ronda (eliminando los perdedores)
            $equipos = array_slice($equipos, 0, count($equipos) / 2);

            // Aumentar la fecha para la próxima ronda
            $fechaSemana = (clone $fechaSemana)->next($diasMapeados[$dias[0]]);
            // Agregar los partidos ya con fecha y hora asignada al arreglo de partidos
            $partidos = array_merge($partidos, $partidosDeRonda);
        }

        // Insertar partidos en la base de datos
        Partido::insert($partidos);

        return true;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Torneo $torneo)
    {
        return Inertia::render('Torneo/Edit', compact('torneo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveTorneoRequest $request, Torneo $torneo, Deporte $deporte)
    {
        $data = $request->validated();

        $torneo->update($data);

        return redirect()->route('deporte.torneo.show', [$deporte->nombre, $torneo->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Torneo $torneo)
    {
        //Lógica de borrado
        return to_route('torneo.index');
    }
}
