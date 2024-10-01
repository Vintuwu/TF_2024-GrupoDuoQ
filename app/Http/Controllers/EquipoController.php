<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveEquipoRequest;
use App\Models\Equipo;
use Illuminate\Http\Request;
use App\Models\Deporte;
use App\Models\Categoria;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class EquipoController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipos = Equipo::get();

        return Inertia::render('Equipo/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Deporte $deporte)
    {
        return Inertia::render('Equipo/Create', [
            'deporte' => $deporte,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveEquipoRequest $request, Deporte $deporte)
    {
        // Validar los datos
        $request->validate([
            'nombre' => 'required|unique:equipos,nombre|max:255',
        ]);

        // Crear el equipo
        Equipo::create([
            'nombre' => $request->nombre,
            'habilitado' => true,
            'deporte_id' => $deporte->id,
        ]);

        // Redireccionar o devolver una respuesta
        return redirect()->route('deporte.show', [$deporte->nombre])
            ->with('success', 'Equipo creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Deporte $deporte, Equipo $equipo)
    {
        return Inertia::render('Equipo/Show', [
            'equipo' => $equipo,
            'deporte' => $deporte,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deporte $deporte, Equipo $equipo)
{
    $equipo->load('categorias');
    // Obtener todas las categorías para la vista
    $categorias = Categoria::all();

    // Pasar datos a la vista Inertia
    return Inertia::render('Equipo/Edit', [
        'equipo' => $equipo,
        'categorias' => $categorias,
        'deporte' => $deporte,
    ]);
}



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Deporte $deporte, Equipo $equipo)
    {
        // Validar la entrada
        $validatedData = $request->validate([
            'nombre' => [
                'required',
                'string',
                Rule::unique('equipos')->ignore($equipo->id), // Ignorar el equipo actual al validar unicidad
            ],
            'habilitado' => ['required', 'boolean'],
            'categorias' => ['array'],
            'categorias.*' => ['integer', 'exists:categorias,id'], // Validar que cada categoría exista
        ]);
    
        // Actualizar los datos del equipo
        $equipo->update([
            'nombre' => $validatedData['nombre'],
            'habilitado' => $validatedData['habilitado'],
        ]);
    
        // Sincronizar categorías (actualizar relaciones)
        if (isset($validatedData['categorias'])) {
            $equipo->categorias()->sync($validatedData['categorias']);
        }
    
        return redirect()->route('deporte.equipo.edit', [$deporte->nombre, $equipo->id])
                     ->with('success', 'Equipo actualizado correctamente.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipo $equipo)
    {
        //Lógica de borrado
        return to_route('equipo.index');
    }
}
