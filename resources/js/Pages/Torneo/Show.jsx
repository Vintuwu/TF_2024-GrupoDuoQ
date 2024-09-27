import React from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Show({ torneo, deporte, estado, categoria }) {
    return (
        <GeneralLayout>
            <Head title={`Torneo: ${torneo.nombre}`} />
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{torneo.nombre}</h2>
                
                <div className="mb-4">
                    <h3 className="text-lg font-bold">Detalles del Torneo</h3>
                    <p><strong>Deporte:</strong> {deporte.nombre}</p>
                    <p><strong>Fecha de Inicio:</strong> {torneo.fechaInicio || "No especificada"}</p>
                    <p><strong>Fecha de Fin:</strong> {torneo.fechaFin || "No especificada"}</p>
                    <p><strong>Ubicación:</strong> {torneo.ubicacion || "No especificada"}</p>
                    <p><strong>Estado:</strong> {estado ? estado.nombre : "No especificado"}</p>
                    <p><strong>Categoría:</strong> {categoria ? categoria.nombre : "No especificada"}</p>
                </div>
                {/** falta toda la logica para que, dependiendo del estado, se puedan agregar equipos, cambiar el fixture, empezar el torneo, etc */}
            </div>
        </GeneralLayout>
    );
}
