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
Route::resource('deporte', DeporteController::class)->parameters([
    'deporte' => 'deporte:nombre'
]);
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

Route::middleware('auth')->group(function(){
    Route::resource('user', UserController::class)->middleware(RoleMiddleware::class.':1');
    Route::post('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::get('/deporte/create', [DeporteController::class, 'create'])->name('deporte.create')->middleware(RoleMiddleware::class.':1');
    Route::get('/deporte/{deporte}/torneo/create', [TorneoController::class, 'create'])->name('deporte.torneo.create')->middleware(RoleMiddleware::class.':1'); // esto deberia ser id 2 + verificacion de que este vinculado al deporte
    Route::resource('deporte.torneo', TorneoController::class)->parameters([
        'deporte' => 'deporte:nombre'
    ]);
});
Route::get('/deporte/{deporte:nombre}/torneo/{torneo}', [TorneoController::class, 'show'])->name('deporte.torneo.show');


require __DIR__.'/auth.php';
