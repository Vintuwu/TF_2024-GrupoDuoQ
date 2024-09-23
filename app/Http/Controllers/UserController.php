<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::get();
        return Inertia::render('User/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles');
        $roles = Rol::get();
        
        return Inertia::render('User/Edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'roles' => 'required|array',   // Asegurarse de que roles es un array
            'roles.*' => 'integer|exists:roles,id',  // Cada valor debe ser un ID de rol existente
        ]);


        // Sincronizar los roles del usuario
        $user->roles()->sync($validatedData['roles']);  // Actualizar los roles del usuario

        // Redirigir de vuelta con un mensaje de éxito
        return redirect()->back()->with('success', 'Roles actualizados correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function cambiarRol(Request $request, User $user){
        $validated = $request->validate([
            'rol_id' => 'required|exists:roles,id'
        ]);

        $user->roles()->sync($validated['rol_id']);

        return back()->with('success', 'Rol actualizado correctamente');
    }
}
