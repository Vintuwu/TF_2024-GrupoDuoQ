import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import SuccessButton from "@/Components/SuccessButton";
import React from 'react'

const JugadorForm = ({onSubmit, jugadorData}) => {
    let datosJugador
    if (jugadorData){
        datosJugador = jugadorData.jugador
    }

    const { data, setData, errors, reset } = useForm({
        dni: datosJugador?.dni || '',
        nombre: datosJugador?.nombre || '',
        apellido: datosJugador?.apellido || '',
        fechaNac: datosJugador?.fechaNac || '',
        genero: datosJugador?.genero || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onSubmit(data)        
    }
  return (
    <form onSubmit={handleSubmit}>
        {/* Nombre del Equipo */}
        <div className="mb-4">

        {/* Input del nombre */}
        <div className="mt-2">
            <InputLabel value={'Nombre del jugador'} htmlFor={'nombre'}/>
            <TextInput type={'text'} id={'nombre'} name={'nombre'} className={'w-full ring-1 ring-black/50'} value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} placeholder={'Pepe'}/>
            <InputError message={errors['nombre']}/>
        </div>
                    
        {/* Input del apellido */}
        <div className="mt-2">
            <InputLabel value={'Apellido del jugador'} htmlFor={'apellido'}/>
            <TextInput type={'text'} id={'apellido'} name={'apellido'} className={'w-full ring-1 ring-black/50'} value={data.apellido} onChange={(e) => setData('apellido', e.target.value)} placeholder={'Perez'}/>
            <InputError message={errors['apellido']}/>
        </div>

        {/* Input del DNI */}
        <div className="mt-2">
            <InputLabel value={'DNI'} htmlFor={'dni'}/>
            <TextInput type={'number'} id={'dni'} name={'dni'} className={'w-full ring-1 ring-black/50'} value={data.dni} onChange={(e) => {if (e.target.value.length <=8){setData('dni', e.target.value)}}} placeholder={'Ingrese el Nº de DNI'}/>
            <InputError message={errors['dni']}/>
        </div>

        {/* Select del género */}
        <div className="mt-2">
            <InputLabel value={'Género'} htmlFor={'genero'}/>
            <select id={'genero'} name={'genero'} className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full ring-1 ring-black/50'} value={data.genero} onChange={(e) => setData('genero', e.target.value)} placeholder={'Ingrese el Nº de DNI'}>
                <option value="" hidden disabled>Ingrese una opción</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
            </select>
            <InputError message={errors['genero']}/>
        </div>

        {/* Input de la fecha de nacimiento */}
        <div className="mt-2">
            <InputLabel value={'Fecha de nacimiento'} htmlFor={'fechaNac'}/>
            <TextInput type={'date'} id={'fechaNac'} name={'fechaNac'} className={'w-full ring-1 ring-black/50'} value={data.fechaNac} onChange={(e) => setData('fechaNac', e.target.value)} placeholder={'12/11/2001'}/>
            <InputError message={errors['fechaNac']}/>
        </div>

        </div>

        {/* Botón de Enviar */}
        <div className="flex justify-center">
            <SuccessButton type="submit">Agregar jugador</SuccessButton>
        </div>
    </form>
  )
}

export default JugadorForm