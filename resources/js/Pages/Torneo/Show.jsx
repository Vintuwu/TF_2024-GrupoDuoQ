import React, { useState } from "react";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, useForm } from "@inertiajs/react";
import SuccessButton from "@/Components/SuccessButton";

export default function Show({ torneo, deporte, estado, categoria, equiposElegibles }) {

    const { data, setData, errors, post } = useForm({
        dias: ['Viernes', 'Sábado'],  // Establecer días predeterminados
        rangosHorarios: {
            'Viernes': { start: '18:00', end: '19:00' },  // Establecer rangos horarios predeterminados
            'Sábado': { start: '12:00', end: '20:00' },
        },
        canchas: 1,  // Establecer canchas predeterminadas
        duracionPartido: 90,  // Establecer duración de partido predeterminada
        formatoTorneo: 'round_robin',
        equiposSeleccionados: [],  // Establecer equipos seleccionados predeterminados

        //dsp hay que borrar dias y rangos horarios, ahora esta para mandar form mas facil y checkear que este todo bien
    });

    // Manejar el cambio en los días seleccionados
    const handleDaysChange = (event) => {
        const { value, checked } = event.target; // Día seleccionado
        const dia = value;

        // Actualizar los días seleccionados y sus rangos horarios
        setData(prevData => {
            const newDias = checked 
                ? [...prevData.dias, dia] 
                : prevData.dias.filter(d => d !== dia);

            const newRangosHorarios = checked
                ? { ...prevData.rangosHorarios, [dia]: { start: '', end: '' } }
                : Object.keys(prevData.rangosHorarios)
                    .filter(key => key !== dia)
                    .reduce((obj, key) => {
                        obj[key] = prevData.rangosHorarios[key];
                        return obj;
                    }, {});

            return { ...prevData, dias: newDias, rangosHorarios: newRangosHorarios };
        });
    };

    // Manejar el cambio en los rangos horarios
    const handleTimeRangeChange = (dia, key, value) => {
        setData(prevData => ({
            ...prevData,
            rangosHorarios: {
                ...prevData.rangosHorarios,
                [dia]: {
                    ...prevData.rangosHorarios[dia],
                    [key]: value
                }
            }
        }));
    };

    // Manejar el cambio en los equipos seleccionados
    const handleTeamChange = (event) => {
        const { value, checked } = event.target;
        const teamId = parseInt(value);

        if (checked) {
            setData('equiposSeleccionados', [...data.equiposSeleccionados, teamId]);
        } else {
            setData('equiposSeleccionados', data.equiposSeleccionados.filter(id => id !== teamId));
        }
    };

    // Manejar el envío del formulario
    const handleFormSubmit = (event) => {
        event.preventDefault();

        post(route('torneo.configurar_fixture', [torneo.id]), {
            onSuccess: () => {
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 3000);
            }
        });
    };

    return (
        <GeneralLayout>
            <Head title={torneo.nombre} />
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {torneo.nombre}
                </h2>

                <div className="mb-4">
                    <h3 className="text-lg font-bold">Detalles del Torneo</h3>
                    <p><strong>Deporte:</strong> {deporte.nombre}</p>
                    <p><strong>Fecha de Inicio:</strong> {torneo.fechaInicio || "No especificada"}</p>
                    <p><strong>Fecha de Fin:</strong> {torneo.fechaFin || "No especificada"}</p>
                    <p><strong>Ubicación:</strong> {torneo.ubicacion || "No especificada"}</p>
                    <p><strong>Estado:</strong> {estado ? estado.nombre : "No especificado"}</p>
                    <p><strong>Categoría:</strong> {categoria ? categoria.nombre : "No especificada"}</p>
                </div>

                {estado.nombre === "Preparación" && (
                    <form onSubmit={handleFormSubmit}>
                        {/* Días disponibles */}
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Días Disponibles</h3>
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={'dia' + index}
                                        value={dia}
                                        onChange={handleDaysChange}
                                        checked={data.dias.includes(dia)} // Si está en el array, está marcado
                                        className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor={'dia' + index} className="text-gray-700">{dia}</label>
                                </div>
                            ))}
                            {errors.dias && (
                                <p className="text-red-500 text-md mt-1">{errors.dias}</p>
                            )}
                        </div>

                        {/* Rango horario por día */}
                        {data.dias.map((dia, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="text-gray-700 font-bold">{`Rango Horario para ${dia}`}</h4>
                                <input
                                    type="time"
                                    value={data.rangosHorarios[dia]?.start || ''}
                                    onChange={(e) => handleTimeRangeChange(dia, 'start', e.target.value)}
                                    className="shadow appearance-none border rounded py-2 px-3 mr-2"
                                />
                                <input
                                    type="time"
                                    value={data.rangosHorarios[dia]?.end || ''}
                                    onChange={(e) => handleTimeRangeChange(dia, 'end', e.target.value)}
                                    className="shadow appearance-none border rounded py-2 px-3"
                                />
                            </div>
                            
                        ))}
                        {errors.rangosHorarios && (
                                <p className="text-red-500 text-md mt-1">{errors.rangosHorarios}</p>
                            )}

                        {/* Número de canchas */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Número de Canchas</label>
                            <input
                                type="number"
                                value={data.canchas}
                                onChange={(e) => setData('canchas', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min="1"
                            />
                            {errors.canchas && (
                                <p className="text-red-500 text-md mt-1">{errors.canchas}</p>
                            )}
                        </div>

                        {/* Duración del partido */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Duración del Partido (Minutos)</label>
                            <input
                                type="number"
                                value={data.duracionPartido}
                                onChange={(e) => setData('duracionPartido', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min="1"
                            />
                            {errors.duracionPartido && (
                                <p className="text-red-500 text-md mt-1">{errors.duracionPartido}</p>
                            )}
                        </div>

                        {/* Formato del Torneo */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Formato del Torneo</label>
                            <select
                                value={data.formatoTorneo}
                                onChange={(e) => setData('formatoTorneo', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="round_robin">Round Robin</option>
                                <option value="elimination">Eliminación Directa</option>
                            </select>
                            {errors.formatoTorneo && (
                                <p className="text-red-500 text-md mt-1">{errors.formatoTorneo}</p>
                            )}
                        </div>

                        {/* Equipos Elegibles */}
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Equipos Elegibles</h3>
                        {equiposElegibles.map((equipo) => (
                            <div key={equipo.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={'team' + equipo.id}
                                    value={equipo.id}
                                    onChange={handleTeamChange}
                                    className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor={'team' + equipo.id} className="text-gray-700">{equipo.nombre}</label>
                            </div>
                        ))}
                        {errors.equiposSeleccionados && (
                                    <p className="text-red-500 text-md mt-1">{errors.equiposSeleccionados}</p>
                                )}

                        {/* Botón de Enviar */}
                        <div className="flex justify-center">
                            <SuccessButton>Generar Fixture</SuccessButton>
                        </div>
                    </form>
                )}

                {estado.nombre === "Pendiente" && (
                    <div>
                        <p>Ya hay fechas confirmadas y equipos confirmados. Mostrar vista como "En progreso".</p>
                    </div>
                )}
            </div>
        </GeneralLayout>
    );
}
