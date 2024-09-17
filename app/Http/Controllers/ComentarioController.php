<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveComentarioRequest;
use App\Models\Comentario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comentarios = Comentario::get();
        return Inertia::render('Comentario/Index', compact('comentarios'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Comentario/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveComentarioRequest $request)
    {
        $data = $request->validated();

        Comentario::create($data);

        return to_route('comentario.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        return Inertia::render('Comentario/Show', compact('comentario'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        return Inertia::render('Comentario/Edit', compact('comentario'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveComentarioRequest $request, Comentario $comentario)
    {
        $data = $request->validated();

        $comentario->update($data);

        return to_route('categoria.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //Lógica de borrado
        return to_route('categoria.index');
    }
}
