import React from "react";
import SuccessButton from "@/Components/SuccessButton";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ deporte, categorias }) {
    // Inicializar el formulario con los campos necesarios
    const { data, setData, post, errors } = useForm({
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
        ubicacion: "",
        categoria_id: "",
        deporte_id: deporte.id, //  Asociar el torneo al deporte que llega desde la prop
        estado_id: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("deporte.torneo.store", deporte.nombre));
    };

    return (
        <GeneralLayout>
            <Head title="Crear torneo" />
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Crear torneo en {deporte.nombre}
                </h2>

                {/* Formulario para crear un torneo */}
                <form onSubmit={handleSubmit}>
                    {/* Nombre del Torneo */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Nombre del Torneo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ej: Liga municipal de básquet apertura"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* Fecha de Inicio */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="fechaInicio"
                        >
                            Fecha de Inicio
                        </label>
                        <input
                            type="date"
                            id="fechaInicio"
                            value={data.fechaInicio}
                            onChange={(e) => setData("fechaInicio", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.fechaInicio && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.fechaInicio}
                            </p>
                        )}
                    </div>

                    {/* Fecha de Fin */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="fechaFin"
                        >
                            Fecha de Fin
                        </label>
                        <input
                            type="date"
                            id="fechaFin"
                            value={data.fechaFin}
                            onChange={(e) => setData("fechaFin", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.fechaFin && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.fechaFin}
                            </p>
                        )}
                    </div>

                    {/* Ubicación */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="ubicacion"
                        >
                            Ubicación (Dirección)
                        </label>
                        <input
                            type="text"
                            id="ubicacion"
                            value={data.ubicacion}
                            onChange={(e) => setData("ubicacion", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ej: Av. Roca 123"
                        />
                        {errors.ubicacion && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.ubicacion}
                            </p>
                        )}
                    </div>

                    {/* Seleccionar Categoría */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="categoria_id"
                        >
                            Categoría del Torneo
                        </label>
                        <select
                            id="categoria_id"
                            value={data.categoria_id}
                            onChange={(e) => setData("categoria_id", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre} - Máximo: {categoria.edadMaxima} años - {categoria.genero}
                                </option>
                            ))}
                        </select>
                        {errors.categoria_id && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.categoria_id}
                            </p>
                        )}
                    </div>

                    {/* Botón de Enviar */}
                    <div className="flex items-center justify-between">
                        <SuccessButton type="submit">Crear torneo</SuccessButton>
                    </div>
                </form>
            </div>
        </GeneralLayout>
    );
}