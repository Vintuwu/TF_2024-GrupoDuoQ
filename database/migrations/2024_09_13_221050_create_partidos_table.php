<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('torneo_id')->constrained('torneos')->onDelete('cascade');
            $table->foreignId('equipo_uno_id')->constrained('equipos')->onDelete('cascade');
            $table->foreignId('equipo_dos_id')->constrained('equipos')->onDelete('cascade');
            $table->foreignId('estado_id')->constrained('estados')->onDelete('cascade');
            $table->date('fecha');
            $table->time('hora');
            $table->integer('ronda');
            $table->integer('puntaje_equipo_uno')->nullable();
            $table->integer('puntaje_equipo_dos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidos');
    }
};
