<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveTorneoRequest extends FormRequest
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
            'deporte_id' => ['required', 'exists:deportes,id'],
            'categoria_id' => ['required', 'exists:categorias,id'],
            'estado_id' => ['required', 'exists:estados,id'],
            'nombre' => ['required', 'string'],
            'fechaInicio' => ['required', 'date'],
            'fechaFin' => ['required', 'date'],
            'ubicacion' => ['required', 'string'],
        ];
    }
}
