import React from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({ torneos, deporte, equipos, administradores }) {
    const { userRoles, auth } = usePage().props;
    let tieneRol;
    let adminDeporte;

    if (auth.user) {
        tieneRol = (rolId) => userRoles.some((role) => role.rol_id === rolId);
        adminDeporte = (userId) => administradores.some(administrador => administrador.user_id == userId)
    }
    
    return (
        <GeneralLayout>
            <Head title={`Torneos de ${deporte.nombre}`} />

            <div className="container mx-auto py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Torneos de {deporte.nombre}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {torneos && torneos.length > 0 ? (
                        torneos.map((torneo) => (
                            <Link
                                href={route("deporte.torneo.show", {
                                    torneo,
                                    deporte,
                                })}
                                key={torneo.id}
                                className="relative rounded-lg shadow-lg overflow-hidden group bg-white transition-transform duration-200 transform hover:scale-105"
                            >
                                {/* Información del torneo */}
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {torneo.nombre}
                                    </h3>
                                    <p className="text-gray-600">
                                        Estado:{" "}
                                        <span className="font-medium text-green-600">
                                            {torneo.estado?.nombre}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Categoría:{" "}
                                        <span className="font-medium text-blue-600">
                                            {torneo.categoria?.nombre}
                                        </span>
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">
                            No hay torneos de {deporte.nombre} actualmente.
                        </p>
                    )}
                </div>

                {auth.user && tieneRol(2) && adminDeporte(auth.user.id) 
                    && (
                        <div>
                            <Link
                                href={route("deporte.torneo.create", {
                                    deporte: deporte.nombre,
                                })}
                                className="underline font-bold text-xl"
                            >
                                Crear torneo de {deporte.nombre}
                            </Link>{" "}
                            {/* Tabla de equipos */}
                            {equipos && equipos.length > 0 ? (
                                <div>
                                    {/* Título de la vista */}
                                    <h2 className="my-4 text-3xl font-bold text-gray-800 ">
                                        Equipos de {deporte.nombre}
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100 text-gray-700">
                                                    <th className="py-3 px-6 text-left">
                                                        Nombre
                                                    </th>
                                                    <th className="py-3 px-6 text-left">
                                                        Habilitado
                                                    </th>
                                                    <th className="py-3 px-6 text-left">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {equipos.map((equipo) => (
                                                    <tr
                                                        key={equipo.id}
                                                        className="border-b border-gray-200"
                                                    >
                                                        <td className="py-3 px-6 text-left">
                                                            {equipo.nombre}
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            {equipo.habilitado
                                                                ? "Sí"
                                                                : "No"}
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            {/* Enlace para editar el equipo */}
                                                            <Link
                                                                href={route(
                                                                    "deporte.equipo.edit",
                                                                    {
                                                                        deporte:
                                                                            deporte.nombre,
                                                                        equipo: equipo.id,
                                                                    }
                                                                )}
                                                                className="text-blue-500 hover:text-blue-700"
                                                            >
                                                                Editar
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center col-span-4 text-gray-500">
                                    No hay equipos de {deporte.nombre}{" "}
                                    actualmente.
                                </p>
                            )}
                            <Link
                                href={route("deporte.equipo.create", {
                                    deporte: deporte.nombre,
                                })}
                                className="underline font-bold text-xl"
                            >
                                Crear equipo de {deporte.nombre}
                            </Link>
                        </div>
                    )}
            </div>
        </GeneralLayout>
    );
}
