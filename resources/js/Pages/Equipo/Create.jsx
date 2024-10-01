import React from "react";
import SuccessButton from "@/Components/SuccessButton";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ deporte }) {
    // Inicializar el formulario con los campos necesarios
    const { data, setData, post, errors } = useForm({
        nombre: "",
        habilitado: true,
        deporte_id: deporte.id, //  Asociar el equipo al deporte que llega desde la prop
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario a enviar:", data);
        post(route("deporte.equipo.store", deporte.nombre));
    };

    return (
        <GeneralLayout>
            <Head title="Crear equipo" />
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Crear equipo en {deporte.nombre}
                </h2>

                {/* Formulario para crear un equipo */}
                <form onSubmit={handleSubmit}>
                    {/* Nombre del Equipo */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Nombre del Equipo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ej: Deportivo Roca"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* Botón de Enviar */}
                    <div className="flex items-center justify-between">
                        <SuccessButton type="submit">Crear equipo</SuccessButton>
                    </div>
                </form>
            </div>
        </GeneralLayout>
    );
}