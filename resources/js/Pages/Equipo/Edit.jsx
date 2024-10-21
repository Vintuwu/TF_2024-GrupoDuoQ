import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Transition } from '@headlessui/react';
import SuccessButton from "@/Components/SuccessButton";
import Modal from "@/Components/Modal";
import JugadorForm from "../Jugador/JugadorForm";
import axios from "axios";

const Edit = ({ equipo, categorias, deporte }) => {
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [modalJugadorAbierto, setModalJugadorAbierto] = useState(false);
    const [mostrarBotones, setMostrarBotones] = useState(true);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [mostrarSelect, setMostrarSelect] = useState(false);
    const [jugadores, setJugadores] = useState([]);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    useEffect(()=> {
        if (jugadorSeleccionado){
            agregarJugador()
        }
    }, [jugadorSeleccionado])

    // Inicializar el formulario con las categorías ya seleccionadas por el equipo
    const { data, setData, errors, put } = useForm({
        nombre: equipo.nombre || "",
        habilitado: equipo.habilitado || false,
        categorias: equipo.categorias.map(categoria => categoria.id) || [],
    });

    // Actualizar el estado cuando se marque o desmarque una categoría
    const handleCategoriaChange = (event) => {
        const { value, checked } = event.target;
        const categoriaId = parseInt(value);

        if (checked) {
            setData('categorias', [...data.categorias, categoriaId]);
        } else {
            setData('categorias', data.categorias.filter(categoria => categoria !== categoriaId));
        }
    };

    // Actualizar el estado cuando se cambie el valor del checkbox 'habilitado'
    const handleHabilitadoChange = (event) => {
        setData('habilitado', event.target.checked);
    };

    const submit = (event) => {
        event.preventDefault();
        put(route('deporte.equipo.update', [deporte, equipo.id]), {
            onSuccess: () => {
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 3000);
            }
        });
    };

    const abrirModal = () => {
        setModalJugadorAbierto(true);
    }

    const cerrarModal = () => {
        setModalJugadorAbierto(false);
        volver()
    }

    const abrirForm = () => {
        setMostrarBotones(false)
        setMostrarForm(true)
    }

    const abrirSelect = () => {
        setMostrarBotones(false)
        setMostrarSelect(true)
        getJugadores()
    }

    const getJugadores = async () => {
        const response = await axios.get('/jugador/getJugadores', {
            params: {
                deporte: deporte.id,
                equipo: equipo.id
            }
        }).then(res => {
            return res.data
        })
        setJugadores(response)
    }

    const volver = () => {
        setMostrarBotones(true)
        setMostrarForm(false)
        setMostrarSelect(false)
    }

    const handleSubmit = (data) => {
        router.post('/jugador/jugadorAsync', {equipo:equipo.id, data}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                router.reload({only: ['equipo']})
                volver()
            },
            onError: (errors) => {
                console.error(errors)
            }
        })
    }

    const seleccionarJugador = (dni) => {
        const elJugador = jugadores.find(jugador => jugador.dni === dni)
        setJugadorSeleccionado(elJugador)
    }

    const agregarJugador = () => {
        router.post('/jugador/agregarJugadorAEquipo', {equipo:equipo.id, jugadorSeleccionado}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                router.reload({only: ['equipo']})
                volver()
            },
            onError: (errors) => {
                console.error(errors)
            }
        })
    }

    return (
        <GeneralLayout>
            <Head title="Editar Equipo" />
            <div className="max-w-xl mx-auto p-6 my-2 bg-white rounded shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Editar equipo: {equipo.nombre}
                </h2>

                {/* Mensaje de éxito */}
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <p className="text-md font-bold text-green-500 mb-4">
                        Equipo actualizado correctamente.
                    </p>
                </Transition>
                <Modal show={modalJugadorAbierto} onClose={cerrarModal}>
                    <div className="border-b-2 border-gray-400 mb-4">
                        <h2 className="text-2xl font-semibold ml-3">Agregar jugador al equipo</h2>
                    </div>
                    <div>
                        <div hidden={!mostrarBotones}>
                            <h3 className="text-xl">Seleccione una opción:</h3>
                            <div className="flex justify-evenly mt-2 mb-4">
                                <button type="button" onClick={abrirForm} className="bg-emerald-400 rounded-md font-bold px-2 py-1">Nuevo jugador</button>
                                <button type="button" onClick={(abrirSelect)} className="bg-emerald-400 rounded-md font-bold px-2 py-1">Jugador existente</button>
                            </div>
                        </div>
                        <div hidden={!mostrarForm} className="mx-4 mb-4">
                            <button type="button" onClick={volver} className='underline'>Volver</button>
                            <JugadorForm onSubmit={handleSubmit}/>
                        </div>
                        <div hidden={!mostrarSelect} className="mx-4 mb-4">
                            <button type="button" onClick={volver} className='underline'>Volver</button>
                            <table className="w-full rtl:text-right text-gray-800 text-center ring-1 ring-black rounded-md">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jugadores.length >= 1 ? jugadores.map((jugador, i) => (
                                        <tr className="odd:bg-white even:bg-gray-50 border-b" key={i}>
                                            <td>{jugador.dni}</td>
                                            <td>{jugador.nombre}</td>
                                            <td>{jugador.apellido}</td>
                                            <td><button type="button" onClick={() => seleccionarJugador(jugador.dni)}>Agregar</button></td>
                                        </tr>
                                    ))
                                    :
                                        <tr>
                                            <td colSpan="4">No hay jugadores</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <div className="flex justify-center">
                                <SuccessButton type={'button'}>Enviar</SuccessButton>
                            </div>
                        </div>
                    </div>

                </Modal>

                <form onSubmit={submit}>
                    {/* Nombre del equipo */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre del Equipo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del equipo"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* Habilitado (Checkbox) */}
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                id="habilitado"
                                checked={data.habilitado}
                                onChange={handleHabilitadoChange}
                                className="mr-2"
                            />
                            <span className="text-gray-700">Habilitado</span>
                        </label>
                        {errors.habilitado && (
                            <p className="text-red-500 text-md mt-1">
                                {errors.habilitado}
                            </p>
                        )}
                    </div>

                    {/* Categorías */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Categorías</h3>
                    {categorias.map((categoria) => (
                        <div key={categoria.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={'categoria' + categoria.id}
                                value={categoria.id}
                                checked={data.categorias.includes(categoria.id)}
                                onChange={handleCategoriaChange}
                                className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={'categoria' + categoria.id} className="text-gray-700">{categoria.nombre}</label>
                        </div>
                    ))}

                    {/* Botón de Enviar */}
                    <div className="flex justify-center">
                    <SuccessButton >Guardar cambios</SuccessButton>
                    </div>
                </form>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Jugadores</h3>
                <div className="flex justify-end items-end">
                    {/* boton que abre modal */}
                    <button type="button" className="underline font-bold" onClick={abrirModal}>Agregar</button>
                </div>
                <table className="w-full text-center ring-1 ring-black">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipo.jugadores.length > 0 ? equipo.jugadores.map((jugador, i) => (
                            <tr key={i}>
                                <th>{jugador.dni}</th>
                                <th>{jugador.nombre}</th>
                                <th>{jugador.apellido}</th>
                                <th><button type="button">quitar</button></th>
                            </tr>
                        ))
                        : 
                            <tr>
                                <td colSpan="4">No hay jugadores<br/>Agrega uno para que aparezca</td>
                            </tr>
                        }
                    </tbody>
                </table>

                {/* Enlace para Volver */}
                <div className="border-t-2 border-gray-600 mt-6 pt-6">
                    <Link 
                        className="text-white bg-gray-400 px-3 py-2 rounded-md ring-1 ring-gray-500 hover:bg-gray-500 hover:ring-gray-600 transition-all duration-200 font-bold"
                        href={route('deporte.show', deporte.nombre)} 
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </GeneralLayout>
    );
};

export default Edit;
