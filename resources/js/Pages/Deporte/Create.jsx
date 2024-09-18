import React from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors } = useForm({
        nombre: "",
        nombreImagen: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("deporte.store"));
    };

    return (
        <GeneralLayout>
            <Head title="Crear deporte" />
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Crear Deporte
                </h2>
                {/* En este form se podrían usar componentes de breeze */}
                <form onSubmit={handleSubmit}>
                    {/* Nombre del Deporte */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Nombre del Deporte
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Fútbol, Baloncesto, etc."
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* Imagen del Deporte */}
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombreImagen"
                        >
                            Imagen del Deporte
                        </label>
                        <input
                            type="file"
                            id="nombreImagen"
                            onChange={(e) =>
                                setData("nombreImagen", e.target.files[0])
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.nombreImagen && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.nombreImagen}
                            </p>
                        )}
                    </div>

                    {/* Botón de Enviar */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Crear Deporte
                        </button>
                    </div>
                </form>
            </div>
        </GeneralLayout>
    );
}
