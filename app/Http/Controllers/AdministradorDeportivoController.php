<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveAdministradorDeportivoRequest;
use App\Models\AdministradorDeportivo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdministradorDeportivoController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $administradorDeportivos = AdministradorDeportivo::get();

        return Inertia::render('AdmDeportivo/index', compact('administradorDeportivos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AdmDeportivo/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveAdministradorDeportivoRequest $request)
    {
        $data = $request->validated();

        AdministradorDeportivo::create($data);

        return to_route('admDeportivo.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(AdministradorDeportivo $administradorDeportivo)
    {
        return Inertia::render('AdmDeportivo/show', compact('administradorDeportivo'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdministradorDeportivo $administradorDeportivo)
    {
        return Inertia::render('AdmDeportivo/Edit', compact('administradorDeportivo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveAdministradorDeportivoRequest $request, AdministradorDeportivo $administradorDeportivo)
    {
        $data = $request->validated();

        $administradorDeportivo->update($data);

        return to_route('admDeportivo.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdministradorDeportivo $administradorDeportivo)
    {
        // Lógica de eliminado lógico
        // No tiene que ser eliminado de base de datos por integridad
        return to_route('admDeportivo.index');
    }
}
