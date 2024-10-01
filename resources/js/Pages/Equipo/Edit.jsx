import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Transition } from '@headlessui/react';
import SuccessButton from "@/Components/SuccessButton";

const Edit = ({ equipo, categorias, deporte }) => {
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    // Inicializar el formulario con las categorías ya seleccionadas por el equipo
    const { data, setData, errors, put } = useForm({
        nombre: equipo.nombre || "",
        habilitado: equipo.habilitado || false,
        categorias: equipo.categorias.map(categoria => categoria.id) || [],
    });

    // Actualizar el estado cuando se marque o desmarque una categoría
    const handleCategoriaChange = (event) => {
        const { value, checked } = event.target;
        const categoriaId = parseInt(value);

        if (checked) {
            setData('categorias', [...data.categorias, categoriaId]);
        } else {
            setData('categorias', data.categorias.filter(categoria => categoria !== categoriaId));
        }
    };

    // Actualizar el estado cuando se cambie el valor del checkbox 'habilitado'
    const handleHabilitadoChange = (event) => {
        setData('habilitado', event.target.checked);
    };

    const submit = (event) => {
        event.preventDefault();
        put(route('deporte.equipo.update', [deporte, equipo.id]), {
            onSuccess: () => {
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 3000);
            }
        });
    };

    return (
        <GeneralLayout>
            <Head title="Editar Equipo" />
            <div className="max-w-xl mx-auto p-6 my-2 bg-white rounded shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Editar equipo: {equipo.nombre}
                </h2>

                {/* Mensaje de éxito */}
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <p className="text-md font-bold text-green-500 mb-4">
                        Equipo actualizado correctamente.
                    </p>
                </Transition>

                <form onSubmit={submit}>
                    {/* Nombre del equipo */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre del Equipo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del equipo"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* Habilitado (Checkbox) */}
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                id="habilitado"
                                checked={data.habilitado}
                                onChange={handleHabilitadoChange}
                                className="mr-2"
                            />
                            <span className="text-gray-700">Habilitado</span>
                        </label>
                        {errors.habilitado && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.habilitado}
                            </p>
                        )}
                    </div>

                    {/* Categorías */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Categorías</h3>
                    {categorias.map((categoria) => (
                        <div key={categoria.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={'categoria' + categoria.id}
                                value={categoria.id}
                                checked={data.categorias.includes(categoria.id)}
                                onChange={handleCategoriaChange}
                                className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={'categoria' + categoria.id} className="text-gray-700">{categoria.nombre}</label>
                        </div>
                    ))}

                    {/* Botón de Enviar */}
                    <div className="flex justify-center">
                    <SuccessButton >Guardar cambios</SuccessButton>
                    </div>
                </form>

                {/* Enlace para Volver */}
                <div className="border-t-2 border-gray-600 mt-6 pt-6">
                    <Link 
                        className="text-white bg-gray-400 px-3 py-2 rounded-md ring-1 ring-gray-500 hover:bg-gray-500 hover:ring-gray-600 transition-all duration-200 font-bold"
                        href={route('deporte.show', deporte.nombre)} 
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </GeneralLayout>
    );
};

export default Edit;
