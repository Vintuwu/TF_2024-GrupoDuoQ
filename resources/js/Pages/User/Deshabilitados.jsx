import PrimaryButton from '@/Components/PrimaryButton';
import GeneralLayout from '@/Layouts/GeneralLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Deshabilitados = (users) => {
  const usuarios = users.users.filter(user => user.id != users.auth.user.id);
  return (
    <GeneralLayout>
            <Head title="Cambiar Roles" />
            <div className="container mx-auto py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Usuarios deshabilitados
                </h2>
                <div className="mb-8">
                    {users.users.length>0 ?
                      <>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800">
                            <thead className="text-xs text-black uppercase bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                  Usuario ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                  Usuario
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                  Email
                                </th>
                                <th scope='col' className='px-6 py-3 text-center'>
                                  Acción
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario,index) => (
                                    <tr key={index} className='odd:bg-white even:bg-gray-50 border-b'>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center'>
                                            {usuario.id}
                                        </td>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center'>
                                            {usuario.nombre + ' ' + usuario.apellido}
                                        </td>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center'>
                                            {usuario.email}
                                        </td>
                                        <td className='px-6 py-2 font-medium flex justify-around text-gray-900 whitespace-nowrap text-center'>
                                            <Link 
                                              className='py-2 px-3 bg-blue-500 shadow-md rounded-md font-bold text-white ring-1 ring-blue-600 hover:bg-blue-600 hover:ring-blue-700 transition-all duration-200'
                                              href={route('user.edit', usuario)}
                                              as='button'
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                              className='py-2 px-3 bg-emerald-500 shadow-md rounded-md font-bold text-white ring-1 ring-emerald-600 hover:bg-emerald-600 hover:ring-emerald-700 transition-all duration-200'
                                              href={route('user.habilitar', usuario)}
                                              method='post'
                                              as='button'
                                            >
                                              Habilitar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-12">
                          <PrimaryButton>
                            <Link href={route('user.index')}>
                                Usuarios Habilitados
                            </Link>
                          </PrimaryButton>
                        </div>
                      </>
                      :
                      <>
                        <div className="flex items-center flex-col mt-6">
                          <p className='text-xl'>No hay usuarios deshabilitados</p>
                          <PrimaryButton className='mt-6'>
                              <Link href={route('user.index')}>
                                  Volver
                              </Link>
                          </PrimaryButton>
                        </div>
                      </>
                    }
                </div>
            </div>
    </GeneralLayout>
  )
}

export default Deshabilitados