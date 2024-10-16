import React, { useState } from "react";
import FixtureForm from "./FixtureForm"; // Asegúrate de importar el componente del formulario
import Clasificacion from "./Clasificacion"; // Componente para mostrar la clasificación
import Equipos from "./Equipos"; // Componente para mostrar los equipos
import Fixture from "./Fixture"; // Componente para mostrar el fixture
import { usePage } from "@inertiajs/react";

const DetallesTorneo = ({
    torneo,
    equiposElegibles,
    estado,
    clasificacion,
    partidosPorRonda,
    equipos
}) => {
    const { userRoles, auth } = usePage().props;
    let tieneRol;
    if (auth.user) {
        tieneRol = (rolId) => userRoles.some((role) => role.rol_id === rolId);
    }
    const [activeSection, setActiveSection] = useState("clasificacion"); // Sección activa predeterminada

    const renderSection = () => {
        // Si el torneo está en preparación y el usuario es administrador del deporte
        if (estado.nombre === "Preparación" && tieneRol(1)) {
            return (
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-4">
                    <FixtureForm
                        torneo={torneo}
                        equiposElegibles={equiposElegibles}
                        estado={estado}
                    />
                </div>
            );
        }

        // Si el torneo está en preparación pero el usuario NO es admin del deporte
        if (estado.nombre === "Preparación") {
            return (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-700">
                        Torneo en preparación
                    </h2>
                    <p className="text-gray-600">
                        El fixture del torneo aún no está disponible.
                    </p>
                </div>
            );
        }

        // Renderizar secciones normales
        switch (activeSection) {
            case "clasificacion":
                return (
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-4">
                        <Clasificacion clasificacion={clasificacion} />
                    </div>
                );
            case "equipos":
                return (
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-4">
                        <Equipos equipos={equipos} />
                    </div>
                );
            case "fixture":
                return (
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded px-8 py-6 mt-4">
                        <Fixture partidosPorRonda={partidosPorRonda} formatoTorneo={torneo.formato} />
                    </div>
                );
        }
    };

    return (
        <div>
            {/* Menú de navegación */}
            {estado.nombre !== "Preparación" ? (
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded p-6 mt-4 flex space-x-4">
                    <button
                        onClick={() => setActiveSection("clasificacion")}
                        className={`p-2 ${
                            activeSection === "clasificacion"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        } rounded`}
                    >
                        Clasificación
                    </button>
                    <button
                        onClick={() => setActiveSection("fixture")}
                        className={`p-2 ${
                            activeSection === "fixture"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        } rounded`}
                    >
                        Fixture
                    </button>
                    <button
                        onClick={() => setActiveSection("equipos")}
                        className={`p-2 ${
                            activeSection === "equipos"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        } rounded`}
                    >
                        Equipos
                    </button>
                </div>
            ) : (
                ""
            )}

            {/* Renderizar la sección activa */}
            {renderSection()}
        </div>
    );
};

export default DetallesTorneo;
