import React from "react";
import { useForm } from "@inertiajs/react";
import SuccessButton from "./SuccessButton";

const FixtureForm = ({ torneo, equiposElegibles, estado, categoria }) => {
    const { data, setData, errors, post } = useForm({
        dias: ["Viernes", "Sábado"],
        rangosHorarios: {
            Viernes: { start: "18:00", end: "19:00" },
            Sábado: { start: "12:00", end: "20:00" },
        },
        canchas: 1,
        duracionPartido: 90,
        formatoTorneo: "round_robin",
        equiposSeleccionados: [],
    });

    const handleDaysChange = (event) => {
        const { value, checked } = event.target;
        const dia = value;

        setData((prevData) => {
            const newDias = checked
                ? [...prevData.dias, dia]
                : prevData.dias.filter((d) => d !== dia);

            const newRangosHorarios = checked
                ? { ...prevData.rangosHorarios, [dia]: { start: "", end: "" } }
                : Object.keys(prevData.rangosHorarios)
                      .filter((key) => key !== dia)
                      .reduce((obj, key) => {
                          obj[key] = prevData.rangosHorarios[key];
                          return obj;
                      }, {});

            return {
                ...prevData,
                dias: newDias,
                rangosHorarios: newRangosHorarios,
            };
        });
    };

    const handleTimeRangeChange = (dia, key, value) => {
        setData((prevData) => ({
            ...prevData,
            rangosHorarios: {
                ...prevData.rangosHorarios,
                [dia]: {
                    ...prevData.rangosHorarios[dia],
                    [key]: value,
                },
            },
        }));
    };

    const handleTeamChange = (event) => {
        const { value, checked } = event.target;
        const teamId = parseInt(value);

        if (checked) {
            setData("equiposSeleccionados", [
                ...data.equiposSeleccionados,
                teamId,
            ]);
        } else {
            setData(
                "equiposSeleccionados",
                data.equiposSeleccionados.filter((id) => id !== teamId)
            );
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        post(route("torneo.configurar_fixture", [torneo.id]), {
            onSuccess: () => {
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 3000);
            },
        });
    };

    return (
        <>
            {estado.nombre === "Preparación" && (
                <form onSubmit={handleFormSubmit} className="w-full">
                    <h1 className="text-3xl font-bold mb-6">
                        Formulario para crear fixture del torneo
                    </h1>
                    {/* Días disponibles */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Días Disponibles
                        </h3>
                        {[
                            "Lunes",
                            "Martes",
                            "Miércoles",
                            "Jueves",
                            "Viernes",
                            "Sábado",
                            "Domingo",
                        ].map((dia, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={"dia" + index}
                                    value={dia}
                                    onChange={handleDaysChange}
                                    checked={data.dias.includes(dia)}
                                    className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={"dia" + index}
                                    className="text-gray-700"
                                >
                                    {dia}
                                </label>
                            </div>
                        ))}
                        {errors.dias && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.dias}
                            </p>
                        )}
                    </div>
                    {/* Rango horario por día */}
                    {data.dias.map((dia, index) => (
                        <div key={index} className="mb-4">
                            <h4 className="text-gray-700 font-bold">{`Rango Horario para ${dia}`}</h4>
                            <input
                                type="time"
                                value={data.rangosHorarios[dia]?.start || ""}
                                onChange={(e) =>
                                    handleTimeRangeChange(
                                        dia,
                                        "start",
                                        e.target.value
                                    )
                                }
                                className="shadow appearance-none border rounded py-2 px-3 mr-2"
                            />
                            <input
                                type="time"
                                value={data.rangosHorarios[dia]?.end || ""}
                                onChange={(e) =>
                                    handleTimeRangeChange(
                                        dia,
                                        "end",
                                        e.target.value
                                    )
                                }
                                className="shadow appearance-none border rounded py-2 px-3"
                            />
                        </div>
                    ))}
                    {errors.rangosHorarios && (
                        <p className="text-red-500 text-md mt-1">
                            {errors.rangosHorarios}
                        </p>
                    )}
                    {/* Número de canchas */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Número de Canchas
                        </label>
                        <input
                            type="number"
                            value={data.canchas}
                            onChange={(e) => setData("canchas", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                        />
                        {errors.canchas && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.canchas}
                            </p>
                        )}
                    </div>
                    {/* Duración del partido */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Duración del Partido (Minutos)
                        </label>
                        <input
                            type="number"
                            value={data.duracionPartido}
                            onChange={(e) =>
                                setData("duracionPartido", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                        />
                        {errors.duracionPartido && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.duracionPartido}
                            </p>
                        )}
                    </div>
                    {/* Formato del Torneo */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Formato del Torneo
                        </label>
                        <select
                            value={data.formatoTorneo}
                            onChange={(e) =>
                                setData("formatoTorneo", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="round_robin">Round Robin</option>
                            <option value="elimination">
                                Eliminación Directa
                            </option>
                        </select>
                        {errors.formatoTorneo && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.formatoTorneo}
                            </p>
                        )}

                        {/* Explicación de los formatos */}
                        <div className="mt-2">
                            {data.formatoTorneo === "round_robin" && (
                                <p className="text-gray-600 text-sm">
                                    <strong>Round Robin:</strong> Todos los
                                    equipos juegan entre sí al menos una vez. El
                                    equipo con el mejor puntaje al final de la
                                    liga es el ganador. Este formato asegura que
                                    cada equipo tenga múltiples oportunidades
                                    para competir y no sea eliminado
                                    inmediatamente.
                                </p>
                            )}
                            {data.formatoTorneo === "elimination" && (
                                <p className="text-gray-600 text-sm">
                                    <strong>Eliminación Directa:</strong> Los
                                    equipos juegan enfrentamientos
                                    eliminatorios, donde el perdedor queda
                                    eliminado y el ganador avanza a la siguiente
                                    ronda. Este formato es rápido y emocionante,
                                    ya que cada partido es decisivo, y al final,
                                    solo un equipo queda como campeón.
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Equipos Elegibles */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Equipos Elegibles
                    </h3>
                    {equiposElegibles.length === 0 ? (
                        <p className="text-red-500 mb-4 font-bold">
                            No hay equipos que sean elegibles para la categoria {categoria.nombre}
                        </p>
                    ) : (
                        equiposElegibles.map((equipo) => (
                            <div
                                key={equipo.id}
                                className="flex items-center mb-2"
                            >
                                <input
                                    type="checkbox"
                                    id={"team" + equipo.id}
                                    value={equipo.id}
                                    onChange={handleTeamChange}
                                    className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={"team" + equipo.id}
                                    className="text-gray-700"
                                >
                                    {equipo.nombre}
                                </label>
                            </div>
                        ))
                    )}
                    {errors.equiposSeleccionados && (
                        <p className="text-red-500 text-md mt-1">
                            {errors.equiposSeleccionados}
                        </p>
                    )}
                    
                    <div className="flex justify-center">
                        <SuccessButton disabled={equiposElegibles.length === 0}>
                            Generar Fixture
                        </SuccessButton>
                    </div>
                </form>
            )}
        </>
    );
};

export default FixtureForm;
