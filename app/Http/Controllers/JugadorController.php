<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveJugadorRequest;
use App\Models\Deporte;
use App\Models\Equipo;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JugadorController extends BaseController
{
    public function getJugadores(Request $request){
        $deporte = Deporte::findOrFail($request->input('deporte'));
        $equipo = Equipo::findOrFail($request->input('equipo'));

        // Obtengo todos los equipos que están en el deporte
        $equiposDelDeporte = Equipo::where('deporte_id', $deporte->id)->pluck('id')->toArray();

        // Obtengo todos los jugadores del equipo que estoy editando
        $jugadoresDelEquipo = DB::table('jugadores_equipo')->where('equipo_id', $equipo->id)->pluck('jugador_dni')->toArray();

        // Obtengo todos los jugadores que están en algún equipo del deporte seleccionado
        $jugadoresDeEquiposDelDeporte = DB::table('jugadores_equipo')->whereIn('equipo_id', $equiposDelDeporte)->pluck('jugador_dni')->toArray();

        // Lista de todos los DNI de los jugadores a excluir
        $jugadoresAExcluir = array_unique(array_merge($jugadoresDelEquipo, $jugadoresDeEquiposDelDeporte));

        // Obtengo todos los jugadores menos los excluidos
        $jugadores = Jugador::whereNotIn('dni', $jugadoresAExcluir)->get();

        return response()->json(
            $jugadores
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jugadores = Jugador::get();

        return Inertia::render('Jugador/Index', compact('jugadores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Deporte $deporte, Equipo $equipo)
    {
        return Inertia::render('Jugador/Create', compact('deporte', 'equipo'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveJugadorRequest $request, Deporte $deporte, Equipo $equipo)
    {
        $data = $request->validated();
        $jugador = new Jugador($data);
        $jugador->save();
        $jugador->equipos()->attach($equipo->id, ['jugador_dni' => $jugador->dni]);

        return to_route('deporte.equipo.jugador.index');
    }

    public function jugadorAsync(Request $request){
        $equipo = $request->input('equipo');

        $data = $request->input('data');

        $data = Validator::make($data, [
            'dni' => ['required', 'unique:jugadores,dni', 'numeric', 'max_digits:8'],
            'nombre' => ['required', 'string'],
            'apellido' => ['required', 'string'],
            'fechaNac' => ['required', 'date'],
            'genero' => ['required', 'string']
        ])->validate();

        $jugador = new Jugador($data);
        $jugador->save();
        $jugador->equipos()->attach($equipo, ['jugador_dni' => $jugador->dni]);
    }
    
    public function agregarJugadorAEquipo(Request $request){
        $equipo = $request->input('equipo');
        $elJugador = $request->input('jugadorSeleccionado');
        $jugador = new Jugador($elJugador);
        $jugador->equipos()->attach($equipo, ['jugador_dni' => $elJugador['dni']]);
        return null;
    }

    /**
     * Display the specified resource.
     */
    public function show(Jugador $jugador)
    {
        return Inertia::render('Jugador/Show', compact('jugador'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jugador $jugador)
    {
        return Inertia::render('Jugador/Edit', compact('jugador'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveJugadorRequest $request, Jugador $jugador)
    {
        $data = $request->validated();

        $jugador->update($data);

        return to_route('jugador.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugador $jugador)
    {
        //Lógica de borrado
        return to_route('jugador.index');
    }
}
