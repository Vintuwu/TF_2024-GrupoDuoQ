<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveUserRequest;
use App\Models\AdministradorDeportivo;
use App\Models\Arbitro;
use App\Models\Deporte;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('habilitado', true)->get();
        return Inertia::render('User/Index', compact('users'));
    }

    public function deshabilitados(){
        $users = User::where('habilitado', false)->get();
        return Inertia::render('User/Deshabilitados', compact('users'));
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
        $admRol = AdministradorDeportivo::where('user_id', $user->id)->first();
        $roles = Rol::get();
        $arbitroDeporte = Arbitro::where('user_id', $user->id)->first();
        $deportes = Deporte::get();
        
        return Inertia::render('User/Edit', compact('user', 'roles', 'deportes', 'admRol', 'arbitroDeporte'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveUserRequest $request, User $user)
    {
        $validatedData = $request->validated();

        // Sincronizar los roles del usuario
        $user->roles()->sync($validatedData['roles']);  // Actualizar los roles del usuario

        if (!$validatedData['deporteAdm'] == ''){
            AdministradorDeportivo::updateOrCreate(
                ['user_id' => $user->id],  // Condición para buscar el registro existente
                ['deporte_id' => $validatedData['deporteAdm']]  // Datos a actualizar
            );
        }

        if ($validatedData['arbitroDeporte'] != ''){
            Arbitro::updateOrCreate(
                ['user_id' => $user->id],
                ['deporte_id' => $validatedData['arbitroDeporte']]
            );
        }

        if ($validatedData['newPassword'] != ''){
            $user->update([
                'password' => Hash::make($validatedData['newPassword'])
            ]);
        }

        // Redirigir de vuelta con un mensaje de éxito
        return redirect()->back()->with('success', 'Roles actualizados correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->update(['habilitado' => false]);
        return to_route('user.index');
    }

    public function habilitar(User $user){
        $user->update(['habilitado' => true]);
        return to_route('user.index');
    }

    public function cambiarRol(Request $request, User $user){
        $validated = $request->validate([
            'rol_id' => 'required|exists:roles,id'
        ]);

        $user->roles()->sync($validated['rol_id']);

        return back()->with('success', 'Rol actualizado correctamente');
    }
}
