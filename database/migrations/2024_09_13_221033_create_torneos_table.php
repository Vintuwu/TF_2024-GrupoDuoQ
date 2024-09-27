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
        Schema::create('torneos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->date('fechaInicio')->nullable();
            $table->date('fechaFin')->nullable();
            $table->string('ubicacion');
            $table->foreignId('categoria_id')->constrained()->onDelete('cascade');
            $table->foreignId('deporte_id')->constrained()->onDelete('cascade');
            $table->foreignId('estado_id')->constrained()->default(1); // Relación con estados, asignar por defecto a 'Preparación'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('torneos');
    }
};
