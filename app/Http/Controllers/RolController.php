<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveRolRequest;
use App\Models\Rol;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Rol::get();
        
        return Inertia::render('Rol/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Rol/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveRolRequest $request)
    {
        $data = $request->validated();

        Rol::create($data);

        return to_route('rol.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rol $rol)
    {
        return Inertia::render('Rol/Show', compact('rol'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rol $rol)
    {
        return Inertia::render('Rol/Edit', compact('rol'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveRolRequest $request, Rol $rol)
    {
        $data = $request->validated();

        $rol->update($data);

        return to_route('rol.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rol $rol)
    {
        //Lógica de borrado
        return to_route('rol.index');
    }
}
