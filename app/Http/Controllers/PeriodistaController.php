<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavePeriodistaRequest;
use App\Models\Periodista;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodistaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $periodistas = Periodista::get();

        return Inertia::render('Periodista/Index', compact('periodistas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Periodista/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SavePeriodistaRequest $request)
    {
        $data = $request->validated();

        Periodista::create($data);

        return to_route('periodista.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Periodista $periodista)
    {
        return Inertia::render('Periodista/Show', compact('periodista'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Periodista $periodista)
    {
        return Inertia::render('Periodista/Edit', compact('periodista'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SavePeriodistaRequest $request, Periodista $periodista)
    {
        $data = $request->validated();

        $periodista->update($data);

        return to_route('periodista.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Periodista $periodista)
    {
        //Lógica de borrado
        return to_route('periodista.index');
    }
}
