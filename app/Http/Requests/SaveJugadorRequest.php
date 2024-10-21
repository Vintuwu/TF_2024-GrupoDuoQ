<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveJugadorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dni' => ['required', 'unique:jugadores,dni', 'numeric', 'max_digits:8'],
            'nombre' => ['required', 'string'],
            'apellido' => ['required', 'string'],
            'fechaNac' => ['required', 'date'],
            'genero' => ['required', 'string']
        ];
    }
}
