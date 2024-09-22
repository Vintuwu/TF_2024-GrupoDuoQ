import React from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({ deportes, userRoles }) {
    console.log(userRoles);
    const { auth } = usePage().props;
    let userRol
    if (auth.user){
        userRol = userRoles.find(rol => rol.user_id == auth.user.id);
    }
    return (
        <GeneralLayout>
            <Head title="Disciplinas" />

            <div className="container mx-auto py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Deportes
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {deportes.map((deporte) => (
                        <Link
                            href={route("deporte.show", deporte.id)}
                            key={deporte.id}
                            className="relative rounded-lg shadow-lg overflow-hidden group"
                        >
                            {/* Imagen de fondo */}
                            <div
                                className="w-full h-64 bg-cover bg-center transition-transform duration-300 transform group-hover:scale-105"
                                style={{
                                    backgroundImage: `url('/storage/${deporte.nombreImagen}')`,
                                }}
                            ></div>

                            {/* Nombre del deporte */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-center">
                                <h3 className="text-white text-xl font-semibold">
                                    {deporte.nombre}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
                
                {auth.user && userRol.rol_id == 1 ?
                    (
                        console.log(auth.user),
                        <Link href={route("deporte.create")} className="underline font-bold text-xl">
                            Crear deporte
                        </Link>
                    )
                :
                    null
                }
            </div>
        </GeneralLayout>
    );
}
