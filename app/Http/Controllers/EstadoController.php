<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveEstadoRequest;
use App\Models\Estado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstadoController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estados = Estado::get();

        return Inertia::render('Estado/Index', compact('estados'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Estado/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveEstadoRequest $request)
    {
        $data = $request->validated();

        Estado::create($data);

        return to_route('estado.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Estado $estado)
    {
        return Inertia::render('Estado/Show', compact('estado'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estado $estado)
    {
        return Inertia::Render('Estado/Edit', compact('estado'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveEstadoRequest $request, Estado $estado)
    {
        $data = $request->validated();

        $estado->update($data);

        return to_route('estado.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estado $estado)
    {
        //Lógica de borrado
        return to_route('estado.index');
    }
}
