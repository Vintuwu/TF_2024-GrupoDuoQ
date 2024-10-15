import React from "react";

const Equipos = ({ equipos }) => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {equipos.map((equipo) => (
                    <div
                        key={equipo.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                    >
                        <div className="px-4 py-5">
                            <h3 className="text-lg font-bold text-center mb-2">
                                {equipo.nombre}
                            </h3>
                            <p className="text-gray-600 text-center">
                                {Math.floor(Math.random() * 11) + 15} jugadores {/** Cambiar por el número de jugadores cuando haya jugadores */}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Equipos;