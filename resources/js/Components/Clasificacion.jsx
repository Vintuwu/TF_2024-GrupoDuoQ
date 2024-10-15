import React from "react";

const Clasificacion = ({ clasificacion }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sky-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left max-w-1">Posición</th>
                        <th className="px-4 py-2 text-left">Equipo</th>
                        <th className="px-4 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PJ</span>
                                <span className="text-2xl font-thin text-sky-400" data-tooltip-target="partidos-jugados">&#9432;</span>
                                <div id="partidos-jugados" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip">
                                    Partidos Jugados
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-4 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PG</span>
                                <span className="text-2xl font-thin text-sky-400" data-tooltip-target="partidos-ganados">&#9432;</span>
                                <div id="partidos-ganados" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip">
                                    Partidos Ganados
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-4 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PE</span>
                                <span className="text-2xl font-thin text-sky-400" data-tooltip-target="partidos-empatados">&#9432;</span>
                                <div id="partidos-empatados" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip">
                                    Partidos Empatados
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-4 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PP</span>
                                <span className="text-2xl font-thin text-sky-400" data-tooltip-target="partidos-perdidos">&#9432;</span>
                                <div id="partidos-perdidos" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip">
                                    Partidos Perdidos
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-4 py-2 text-left">Puntos</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-300">
                    {Object.values(clasificacion).map((equipo, index) => (
                        <tr key={equipo.nombre}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{equipo.nombre}</td>
                            <td className="px-4 py-2">{equipo.partidos_jugados}</td>
                            <td className="px-4 py-2">{equipo.partidos_ganados}</td>
                            <td className="px-4 py-2">{equipo.partidos_empatados}</td>
                            <td className="px-4 py-2">{equipo.partidos_perdidos}</td>
                            <td className="px-4 py-2">{equipo.puntos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clasificacion;