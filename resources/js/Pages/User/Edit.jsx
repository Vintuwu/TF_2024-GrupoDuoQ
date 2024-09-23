import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Edit = (usuario) => {
    const [selectedRol, setSelectedRol] = useState(usuario.user.roles.map(rol => rol.id) || []);
    const { data, setData, errors, post } = useForm({
      roles: usuario.user.roles.map(rol => rol.id) || []
    });

    const handleRolChange = (event) => {
      const {value, checked } = event.target
      const rolId = parseInt(value)

      if (checked) {
        setData('roles', [...data.roles, rolId]);
      } else {
        setData('roles', data.roles.filter(rol => rol !== rolId));
      }
    }

    const submit = (event) => {
      event.preventDefault();
      console.log(selectedRol)
      post(route('user.update', usuario.user.id));
    }

    return (
        <GeneralLayout>
            <Head title="Editar Usuario" />
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Cambiar Roles de
                {" " + usuario.user.nombre + " " + usuario.user.apellido}
            </h2>
            <div className="container mx-auto text-center">
              <h3 className="text-2xl">Roles</h3>
              {usuario.roles.map((rol) => (
                <div key={rol.id}>
                  <input
                      type="checkbox"
                      name={rol.nombre}
                      id={'rol' + rol.id}
                      value={parseInt(rol.id)}
                      checked={data.roles.includes(rol.id)}
                      onChange={handleRolChange}
                  />
                  {rol.nombre}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={submit}
              >
                  Guardar cambios
              </button>
            </div>
        </GeneralLayout>
    );
};

export default Edit;
