<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SavePartidoRequest extends FormRequest
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
            'torneo_id' => ['required', 'exists:torneos,id'],
            'equipo_uno_id' => ['required', 'exists:equipos,id'],
            'equipo_dos_id' => ['required', 'exists:equipos,id'],
            'estado_id' => ['required', 'exists:estados,id'],
            'fecha' => ['required', 'date_format:d-m-Y'],
            'hora' => ['required', 'date_format:H:i'],
            'ronda' => ['required', 'numeric'],
            'puntaje_equipo_uno' => ['nullable', 'numeric'],
            'puntaje_equipo_dos' => ['nullable', 'numeric']

        ];
    }
}
