import React from "react";

const Clasificacion = ({ clasificacion }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sky-300">
                <thead>
                    <tr>
                        <th className="px-2 py-2 text-left max-w-min">
                            Posición
                        </th>
                        <th className="px-4 py-2 text-left">Equipo</th>
                        <th className="px-2 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PJ</span>
                                <svg
                                    data-tooltip-target="partidos-jugados"
                                    className="text-blue-500 flex-shrink-0 inline w-5 h-5 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <div
                                    id="partidos-jugados"
                                    role="tooltip"
                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip"
                                >
                                    Partidos Jugados
                                    <div
                                        className="tooltip-arrow"
                                        data-popper-arrow
                                    ></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-2 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PG</span>
                                <svg
                                    data-tooltip-target="partidos-ganados"
                                    className="text-blue-500 flex-shrink-0 inline w-5 h-5 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <div
                                    id="partidos-ganados"
                                    role="tooltip"
                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip"
                                >
                                    Partidos Ganados
                                    <div
                                        className="tooltip-arrow"
                                        data-popper-arrow
                                    ></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-2 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PE</span>
                                <svg
                                    data-tooltip-target="partidos-empatados"
                                    className="text-blue-500 flex-shrink-0 inline w-5 h-5 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <div
                                    id="partidos-empatados"
                                    role="tooltip"
                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip"
                                >
                                    Partidos Empatados
                                    <div
                                        className="tooltip-arrow"
                                        data-popper-arrow
                                    ></div>
                                </div>
                            </div>
                        </th>
                        <th className="px-2 py-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="uppercase">PP</span>
                                <svg
                                    data-tooltip-target="partidos-perdidos"
                                    className="text-blue-500 flex-shrink-0 inline w-5 h-5 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <div
                                    id="partidos-perdidos"
                                    role="tooltip"
                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-bold text-black transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip"
                                >
                                    Partidos Perdidos
                                    <div
                                        className="tooltip-arrow"
                                        data-popper-arrow
                                    ></div>
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
                            <td className="px-4 py-2">
                                {equipo.partidos_jugados}
                            </td>
                            <td className="px-4 py-2">
                                {equipo.partidos_ganados}
                            </td>
                            <td className="px-4 py-2">
                                {equipo.partidos_empatados}
                            </td>
                            <td className="px-4 py-2">
                                {equipo.partidos_perdidos}
                            </td>
                            <td className="px-4 py-2">{equipo.puntos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clasificacion;
