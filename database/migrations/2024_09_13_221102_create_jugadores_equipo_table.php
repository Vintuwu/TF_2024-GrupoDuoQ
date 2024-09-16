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
        Schema::create('jugadores_equipo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_equipo')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugadores_equipo');
    }
};
