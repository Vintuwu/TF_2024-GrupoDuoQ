import React from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import DetallesTorneo from "@/Components/DetallesTorneo";

export default function Show({
    torneo,
    deporte,
    estado,
    categoria,
    equiposElegibles,
    clasificacion,
    partidosPorRonda,
    equipos
}) {
    return (
        <GeneralLayout>
            <Head title={torneo.nombre} />
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-4 flex flex-wrap items-center justify-between">
                {/* Sección de la imagen y el nombre */}
                <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <img
                        className="rounded-full h-24 w-24 object-cover mr-6"
                        src={`/storage/${deporte.nombreImagen}`}
                        alt={`Imagen de ${deporte.nombre}`}
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {torneo.nombre} {categoria.nombre}
                    </h2>
                </div>

                {/* Sección de los detalles */}
                <div className="w-full md:w-auto text-left md:text-right">
                    <p>
                        <strong>Fecha de Inicio:</strong>{" "}
                        {torneo.fechaInicio || "No especificada"}
                    </p>
                    <p>
                        <strong>Fecha de Fin:</strong>{" "}
                        {torneo.fechaFin || "No especificada"}
                    </p>
                    <p>
                        <strong>Ubicación:</strong>{" "}
                        {torneo.ubicacion || "No especificada"}
                    </p>
                    <p>
                        <strong>Estado:</strong>{" "}
                        {estado ? estado.nombre : "No especificado"}
                    </p>
                </div>
            </div>

            <DetallesTorneo
                torneo={torneo}
                equiposElegibles={equiposElegibles}
                estado={estado}
                clasificacion={clasificacion}
                partidosPorRonda={partidosPorRonda}
                equipos={equipos}
            />
        </GeneralLayout>
    );
}
