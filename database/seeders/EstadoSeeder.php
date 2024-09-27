<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Estado;

class EstadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estados = [
            [
                'nombre' => 'Preparación',
                'descripcion' => 'El torneo está en fase de preparación y aún no tiene fechas ni estructura definidas.',
            ],
            [
                'nombre' => 'Pendiente',
                'descripcion' => 'El torneo o partido está programado pero aún no ha comenzado.',
            ],
            [
                'nombre' => 'En Progreso',
                'descripcion' => 'El torneo ha comenzado y está en curso.',
            ],
            [
                'nombre' => 'Finalizado',
                'descripcion' => 'El torneo o partido ha concluido y se ha determinado el resultado final.',
            ],
            [
                'nombre' => 'Cancelado',
                'descripcion' => 'El torneo o partido ha sido cancelado y no se llevará a cabo.',
            ],
            [
                'nombre' => 'Postergado',
                'descripcion' => 'El partido ha sido aplazado para una fecha futura.',
            ],
            [
                'nombre' => 'Suspendido',
                'descripcion' => 'El partido fue detenido temporalmente y no se ha reanudado ni concluido.',
            ],
        ];
        foreach ($estados as $estado) {
            Estado::create($estado);
        }
    }
}
