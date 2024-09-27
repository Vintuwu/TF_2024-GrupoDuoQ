<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolSeeder::class,
            DeporteSeeder::class,
            CategoriaSeeder::class,
            EstadoSeeder::class,
            UserRolSeeder::class
        ]);
        // // User::factory(10)->create();

        // User::factory()->create([
        //     'nombre' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
