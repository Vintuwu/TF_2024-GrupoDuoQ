<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavePartidoRequest;
use App\Models\Partido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partidos = Partido::get();

        return Inertia::render('Partido/Index', compact('partidos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Partido/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SavePartidoRequest $request)
    {
        $data = $request->validated();

        Partido::create($data);

        return to_route('partido.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Partido $partido)
    {
        return Inertia::render('Partido/Show', compact('partido'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partido $partido)
    {
        return Inertia::render('Partido/Edit', compact('partido'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SavePartidoRequest $request, Partido $partido)
    {
        $data = $request->validated();

        $partido->update($data);

        return to_route('partido.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partido $partido)
    {
        //Lógica de borrado
        return to_route('partido.index');
    }
}
