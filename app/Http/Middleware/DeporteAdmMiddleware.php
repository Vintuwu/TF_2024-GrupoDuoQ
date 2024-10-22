<?php

namespace App\Http\Middleware;

use App\Models\Deporte;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DeporteAdmMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, int $rol): Response
    {
        if (!Auth::check()){
            return redirect('login');
        }

        $user = Auth::user();
        $deporteId = $request->route('deporte')->id;
        $deporte = Deporte::findOrFail($deporteId);

        
        if (!$user->roles()->where('rol_id', $rol)->exists() ||
            !$deporte->administradoresDeportivos()->where('user_id', $user->id)->exists()){
            return redirect('/');
        }
        return $next($request);
    }
}
