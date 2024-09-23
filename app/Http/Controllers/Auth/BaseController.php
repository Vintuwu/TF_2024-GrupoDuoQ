<?php

namespace App\Http\Controllers;

use App\Models\UserRol;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BaseController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (Auth::check()) {
                // Obtener los roles del usuario autenticado
                $userRoles = UserRol::where('user_id', Auth::id())->get();
                // Compartir los roles con todas las vistas de Inertia
                Inertia::share('userRoles', $userRoles);
            }

            return $next($request);
        });
    }
}
