<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Deporte;
use App\Models\AdministradorDeportivo;

class UserRolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear los usuarios generales
        $users = [
            [
                'nombre' => 'Usuario',
                'apellido' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'nombre' => 'Usuario',
                'apellido' => 'Arbitro',
                'email' => 'arbitro@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'nombre' => 'Usuario',
                'apellido' => 'Periodista',
                'email' => 'periodista@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'nombre' => 'Usuario',
                'apellido' => 'Regular',
                'email' => 'user@example.com',
                'password' => Hash::make('password'),
            ]
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);
            
            // Asignar roles
            switch ($user->email) {
                case 'admin@example.com':
                    $user->roles()->attach([1]); // Administrador
                    break;
                case 'arbitro@example.com':
                    $user->roles()->attach([3]); // Árbitro
                    break;
                case 'periodista@example.com':
                    $user->roles()->attach([4]); // Periodista
                    break;
                case 'user@example.com':
                    $user->roles()->attach([5]); // Usuario
                    break;
            }
        }

        // Crear un Administrador Deportivo para cada deporte existente
        $deportes = Deporte::all(); // Obtener todos los deportes de la tabla deportes
        
        foreach ($deportes as $deporte) {
            $userDeportivo = User::create([
                'nombre' => 'Administrador',
                'apellido' => ($deporte->nombre),
                'email' => 'admin_' . strtolower($deporte->nombre) . '@example.com',
                'password' => Hash::make('password'),
            ]);

            // Asignar el rol de Administrador Deportivo (rol_id = 2, por ejemplo)
            $userDeportivo->roles()->attach([2]);

            // Relacionar al administrador con su deporte en la tabla administrador_deportivos
            AdministradorDeportivo::create([
                'user_id' => $userDeportivo->id,
                'deporte_id' => $deporte->id,
            ]);
        }
    }
}
