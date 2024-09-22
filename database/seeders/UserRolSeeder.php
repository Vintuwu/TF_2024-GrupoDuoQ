<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserRolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear los usuarios
        $users = [
            [
                'nombre' => 'Usuario',
                'apellido' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'nombre' => 'Administrador',
                'apellido' => 'Deportivo',
                'email' => 'deportivo@example.com',
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
                case 'deportivo@example.com':
                    $user->roles()->attach([2]); // Administrador Deportivo
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
    }
}
