<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveTorneoRequest;
use App\Models\Torneo;
use Illuminate\Http\Request;
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
    public function create()
    {
        return Inertia::render('Torneo/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveTorneoRequest $request)
    {
        $data = $request->validated();

        Torneo::create($data);

        return to_route('torneo.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Torneo $torneo)
    {
        return Inertia::render('Torneo/Show', compact('torneo'));
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
    public function update(SaveTorneoRequest $request, Torneo $torneo)
    {
        $data = $request->validated();

        $torneo->update($data);

        return to_route('torneo.index');
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
