import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Transition } from '@headlessui/react';

const Edit = (usuario) => {
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const { data, setData, errors, post } = useForm({
        roles: usuario.user.roles.map(rol => rol.id) || [],
        deporteAdm: '',
    });

    const handleRolChange = (event) => {
        const { value, checked } = event.target;
        const rolId = parseInt(value);

        if (checked) {
            setData('roles', [...data.roles, rolId]);
        } else {
            setData('roles', data.roles.filter(rol => rol !== rolId));
        }
    };

    const changeDeporteAdm = (event) => {
        setData('deporteAdm', parseInt(event.target.value))
    }

    const submit = (event) => {
        event.preventDefault();
        post(route('user.update', usuario.user.id), {
            onSuccess: () => {
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 3000);
            }
        });
    };


    return (
        <GeneralLayout>
            <Head title="Editar Usuario" />
            <div className="max-w-xl mx-auto p-6 m-36 bg-white rounded shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Editar usuario: {" " + usuario.user.nombre + " " + usuario.user.apellido}
                </h2>

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
                        Roles actualizados.
                    </p>
                </Transition>

                <form onSubmit={submit}>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Roles</h3>
                    {usuario.roles.map((rol) => (
                        <div key={rol.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={'rol' + rol.id}
                                value={rol.id}
                                checked={data.roles.includes(rol.id)}
                                onChange={handleRolChange}
                                className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={'rol' + rol.id} className="text-gray-700">{rol.nombre}</label>
                            {rol.id === 2 && data.roles.includes(2) && (
                              <select className="ml-12 py-0 text-sm rounded-md" name="selectDeporte" id="selectDeporte" onChange={changeDeporteAdm}>
                                <option value="" hidden>Seleccione un deporte</option>
                                {usuario.deportes.map((deporte) =>
                                    <option key={deporte.id} value={deporte.id} selected={usuario.admRol?.deporte_id == deporte.id}>{deporte.nombre}</option>
                                )}
                              </select>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-bold"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
                <div className="border-t-2 border-gray-600 mt-6 pt-6">
                    <Link 
                        className="text-white bg-gray-400 px-3 py-2 rounded-md ring-1 ring-gray-500 hover:bg-gray-500 hover:ring-gray-600 transition-all duration-200 font-bold"
                        href={route('user.index')}
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </GeneralLayout>
    );
};

export default Edit;
