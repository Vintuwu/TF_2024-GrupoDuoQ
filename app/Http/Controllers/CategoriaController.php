<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCategoriaRequest;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::get();

        return Inertia::render('Categoria/Show', compact('categorias'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categoria/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveCategoriaRequest $request)
    {
        $data = $request->validated();

        Categoria::create($data);

        return to_route('categoria.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        return Inertia::render('Categoria/Show', compact('categoria'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        return Inertia::render('Categoria/Edit', compact('categoria'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveCategoriaRequest $request, Categoria $categoria)
    {
        $data = $request->validated();

        $categoria->update($data);

        return to_route('categoria.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        //Lógica de borrado
        return to_route('categoria.index');
    }
}
