import React from "react";

const Fixture = ({ partidosPorRonda, formatoTorneo }) => {
    const getNombreRonda = (ronda, totalRondas, ) => {
        if (formatoTorneo == 'elimination') {
            const diferencia = totalRondas - ronda + 1;
    
            if (diferencia === 1) return "Final";
            if (diferencia === 2) return "Semifinal";
            if (diferencia === 3) return "Cuartos de final";
            if (diferencia === 4) return "Octavos de final";
            if (diferencia === 5) return "Dieciseisavos de final";
            return `Ronda ${ronda}`;
        }
        return `Ronda ${ronda}`; // Si no es eliminación directa, muestra "Ronda 1", "Ronda 2", etc.
    };
    
    // Calcula el total de rondas (es la cantidad de claves en el objeto)
    const totalRondas = Object.keys(partidosPorRonda).length;

    return (
        <table className="w-full">
            <tbody className="w-full">
                {Object.keys(partidosPorRonda).map((ronda) => (
                    <React.Fragment key={ronda}>
                        {/* Fila para el título de la ronda */}
                        <tr>
                            <td colSpan="2" className="text-2xl font-bold py-4">
                                {getNombreRonda(Number(ronda), totalRondas)}
                            </td>
                        </tr>
                        {/* Filas para los partidos */}
                        {partidosPorRonda[ronda].map((partido) => (
                            <tr key={partido.id} className="bg-white shadow-md rounded px-4">
                                <td className="flex items-center justify-between px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="font-bold">
                                            {partido.equipo_uno?.nombre || "Por definir"}
                                        </span>
                                        <span className="mx-2">
                                            {partido.estado_id === 3 ? partido.puntaje_equipo_uno : ""}
                                        </span>
                                        <span className="font-bold">-</span>
                                        <span className="mx-2">
                                            {partido.estado_id === 3 ? partido.puntaje_equipo_dos : ""}
                                        </span>
                                        <span className="font-bold">
                                            {partido.equipo_dos?.nombre || "Por definir"}
                                        </span>
                                    </div>
                                </td>
                                <td className="text-right text-gray-600 px-4 py-2">
                                    {new Date(partido.fecha).toLocaleDateString("es-ES", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}{" "}
                                    a las {partido.hora.slice(0, 5)}
                                </td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default Fixture;
