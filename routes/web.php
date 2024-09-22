<?php

use App\Http\Controllers\ArbitroController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\DeporteController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\PeriodistaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\TorneoController;
use App\Models\AdministradorDeportivo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Rutas de los controllers
Route::resource('admDeportivo', AdministradorDeportivo::class);
Route::resource('arbitro', ArbitroController::class);
Route::resource('categoria', CategoriaController::class)->parameters([
    'categoria' => 'categoria'
]);
Route::resource('comentario', ComentarioController::class);
Route::resource('deporte', DeporteController::class);

//Confirmo que el usuario que quiera entrar está logeado y al mismo tiempo que tenga el rol de Administrador//id=1
Route::middleware('auth')->group(function () {
    Route::get('/deporte/create', function (){
        $rol = DB::table('user_rol')->where('user_id', Auth::user()->id)->where('rol_id', 1)->exists();
        if ($rol){
            return (new DeporteController())->create();
        }
        return redirect('/');
    })->name('deporte.create');
});

Route::resource('equipo', EquipoController::class);
Route::resource('estado', EstadoController::class);
Route::resource('jugador', JugadorController::class);
Route::resource('noticia', NoticiaController::class)->parameters([
    'noticia' => 'noticia'
]);
Route::resource('partido', PartidoController::class);
Route::resource('periodista', PeriodistaController::class)->parameters([
    'periodista' => 'periodista'
]);
Route::resource('rol', RolController::class);
Route::resource('torneo', TorneoController::class);

require __DIR__.'/auth.php';
