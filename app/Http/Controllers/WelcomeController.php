<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class WelcomeController extends BaseController
{
    public function index()
    {
        return Inertia::render('Welcome');
    }
}
