<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveEquipoRequest;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function create()
    {
        return Inertia::render('Equipo/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveEquipoRequest $request)
    {
        $data = $request->validated();

        Equipo::create($data);

        return to_route('equipo.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        return Inertia::render('Equipo/Show', compact('equipo'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipo $equipo)
    {
        return Inertia::render('Equipo/Edit', compact('equipo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveEquipoRequest $request, Equipo $equipo)
    {
        $data = $request->validated();

        $equipo->update($data);

        return to_route('equipo.index');
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
