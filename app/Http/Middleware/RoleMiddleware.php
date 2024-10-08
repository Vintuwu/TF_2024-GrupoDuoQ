<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, int $role): Response
    {
        if (!Auth::check()){
            return redirect('login');
        }

        $user = Auth::user();

        //Verifico que user sea Admin
        if (!$user->roles()->where('rol_id', $role)->exists()){
            return redirect('/');
        }
        return $next($request);
    }
}
