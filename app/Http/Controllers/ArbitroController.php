<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveArbitroRequest;
use App\Models\Arbitro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArbitroController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arbitros = Arbitro::get();

        return Inertia::render('Arbitro/Index', compact('arbitros'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Arbitro/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveArbitroRequest $request)
    {
        $data = $request->validated();

        Arbitro::create($data);

        return to_route('arbitro.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Arbitro $arbitro)
    {
        return Inertia::render('Arbitro/Show', compact('arbitro'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Arbitro $arbitro)
    {
        return Inertia::render('Arbitro/Edit', compact('arbitro'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveArbitroRequest $request, Arbitro $arbitro)
    {
        $data = $request->validated();

        $arbitro->update($data);

        return to_route('arbitro.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Arbitro $arbitro)
    {
        //Lógica de borrado lógico del árbitro
        return to_route('arbitro.index');
    }
}
