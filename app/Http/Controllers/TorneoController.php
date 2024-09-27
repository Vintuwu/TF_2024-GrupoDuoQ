<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveTorneoRequest;
use App\Models\Torneo;
use App\Models\Deporte;
use App\Models\Categoria;
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
        return Inertia::render('Torneo/Show', [
            'torneo' => $torneo,
            'deporte' => $deporte,
            'estado' => $torneo->estado,
            'categoria' => $torneo->categoria,
        ]);
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
