import React from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({ torneos, deporte }) {
    const { userRoles, auth } = usePage().props;
    let tieneRol;
    if (auth.user) {
        tieneRol = (rolId) => userRoles.some((role) => role.rol_id === rolId);
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
                                href={route("deporte.torneo.show", {torneo, deporte})}
                                key={torneo.id}
                                className="relative rounded-lg shadow-lg overflow-hidden group"
                            >
                                
                                {/* Nombre del torneo */}
                                <div className="bg-green-400 p-4 text-center">
                                    <h3 className="text-white text-xl font-semibold">
                                        {torneo.nombre}
                                    </h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">
                            No hay torneos de {deporte.nombre} actualmente.
                        </p>
                    )}
                </div>

                {auth.user && tieneRol(1) && ( /** cambiar a tieneRol 2 y logica para ver si el admin deportivo esta vinculado al deporte {deporte.nombre} */
                    <div>
                    <Link
                        href={route("deporte.torneo.create", { deporte: deporte.nombre })}
                        className="underline font-bold text-xl"
                    >
                        Crear torneo de {deporte.nombre}
                    </Link>
                </div>
                
                )}
            </div>
        </GeneralLayout>
    );
}
