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
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\WelcomeController;
use App\Models\AdministradorDeportivo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

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
Route::middleware('auth')->group(function(){
    Route::resource('user', UserController::class)->middleware(RoleMiddleware::class);
    Route::post('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::get('/deporte/create', [DeporteController::class, 'create'])->name('deporte.create')->middleware(RoleMiddleware::class);
});

require __DIR__.'/auth.php';
