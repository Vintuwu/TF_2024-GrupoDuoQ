<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveDeporteRequest;
use App\Models\Deporte;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DeporteController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deportes = Deporte::get();

        return Inertia::render('Deporte/Index', ['deportes' => $deportes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $userRoles = UserRol::get();

        return Inertia::render('Deporte/Create');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveDeporteRequest $request)
    {
        $data = $request->validated();

        $request->validate([
            'nombre' => 'required|unique:deportes,nombre',
            'nombreImagen' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('nombreImagen')) {
            $data['nombreImagen'] = $request->file('nombreImagen')->store('deportes', 'public');
        }

        Deporte::create($data);

        return to_route('deporte.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(Deporte $deporte)
    {
        // Cargar torneos junto con estado y categoría
        $torneos = $deporte->torneos()->with(['estado', 'categoria'])->get();
        
        $equipos = $deporte->equipos()->get();

        $administradores = $deporte->administradoresDeportivos()->get();

        return Inertia::render('Deporte/Show', [
            'torneos' => $torneos,
            'deporte' => $deporte,
            'equipos' => $equipos,
            'administradores' => $administradores
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deporte $deporte)
    {
        return Inertia::render('Deporte/Edit', compact('deporte'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveDeporteRequest $request, Deporte $deporte)
    {
        $data = $request->validated();

        // Verificar si se ha subido una nueva imagen
        if ($request->hasFile('nombreImagen')) {
            // Eliminar la imagen anterior si existe
            if ($deporte->nombreImagen) {
                Storage::disk('public')->delete($deporte->nombreImagen);
            }

            // Guardar la nueva imagen
            $data['nombreImagen'] = $request->file('nombreImagen')->store('deportes', 'public');
        }

        $deporte->update($data);

        return to_route('deporte.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deporte $deporte)
    {
        // Eliminar la imagen si existe
        if ($deporte->nombreImagen) {
            Storage::disk('public')->delete($deporte->nombreImagen);
        }

        $deporte->delete();

        return to_route('deporte.index');
    }
}
