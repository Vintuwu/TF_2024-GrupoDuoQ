<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveNoticiaRequest;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticiaController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $noticias = Noticia::get();

        return Inertia::render('Noticia/Index', compact('noticias'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Noticia/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveNoticiaRequest $request)
    {
        $data = $request->validated();

        Noticia::create($data);

        return to_route('noticia.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Noticia $noticia)
    {
        return Inertia::render('Noticia/Show', compact('noticia'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Noticia $noticia)
    {
        return Inertia::render('Noticia/Show', compact('noticia'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveNoticiaRequest $request, Noticia $noticia)
    {
        $data = $request->validated();

        $noticia->update($data);

        return to_route('noticia.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Noticia $noticia)
    {
        //Lógica de borrado
        return to_route('noticia.index');
    }
}
