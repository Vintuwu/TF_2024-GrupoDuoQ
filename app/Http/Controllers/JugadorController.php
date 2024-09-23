<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveJugadorRequest;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JugadorController extends BaseController
{
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
    public function create()
    {
        return Inertia::render('Jugador/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveJugadorRequest $request)
    {
        $data = $request->validated();

        Jugador::create($data);

        return to_route('jugador.index');
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
