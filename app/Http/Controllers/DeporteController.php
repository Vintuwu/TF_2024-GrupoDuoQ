<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveDeporteRequest;
use App\Models\Deporte;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeporteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deportes = Deporte::get();

        return Inertia::render('Deporte/Index', compact('deportes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::Render('Deporte/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveDeporteRequest $request)
    {
        $data = $request->validated();

        Deporte::create($data);

        return to_route('deporte.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Deporte $deporte)
    {
        return Inertia::Render('Deporte/Show', compact('deporte'));
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

        $deporte->update($data);

        return to_route('deporte.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deporte $deporte)
    {
        //Lógica de borrado
        return to_route('deporte.index');
    }
}
