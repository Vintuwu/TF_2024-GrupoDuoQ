import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
    <header>
        <h2 className="text-lg font-medium text-gray-900">
            Información del perfil
        </h2>

        <p className="mt-1 text-sm text-gray-600">
            Actualiza la información de perfil y la dirección de correo electrónico de tu cuenta.
        </p>
    </header>

    <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
            <InputLabel htmlFor="nombre" value="Nombre" />

            <TextInput
                id="nombre"
                className="mt-1 block w-full"
                value={data.nombre}
                onChange={(e) => setData("nombre", e.target.value)}
                required
                isFocused
                autoComplete="nombre"
            />

            <InputError className="mt-2" message={errors.nombre} />
        </div>

        <div>
            <InputLabel htmlFor="apellido" value="Apellido" />

            <TextInput
                id="apellido"
                className="mt-1 block w-full"
                value={data.apellido}
                onChange={(e) => setData("apellido", e.target.value)}
                required
                autoComplete="apellido"
            />

            <InputError className="mt-2" message={errors.apellido} />
        </div>

        <div>
            <InputLabel htmlFor="email" value="Correo electrónico" />

            <TextInput
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                autoComplete="username"
            />

            <InputError className="mt-2" message={errors.email} />
        </div>
        {mustVerifyEmail && (
            <div>
                <p className="text-sm mt-2 text-gray-800">
                    Tu dirección de correo electrónico no está verificada.
                    <Link
                        href={route("verification.send")}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Haz clic aquí para reenviar el correo de verificación.
                    </Link>
                </p>

                {status === "verification-link-sent" && (
                    <div className="mt-2 font-medium text-sm text-green-600">
                        Se ha enviado un nuevo enlace de verificación a tu
                        dirección de correo electrónico.
                    </div>
                )}
            </div>
        )}

        <div className="flex items-center gap-4">
            <SuccessButton disabled={processing}>Guardar</SuccessButton>

            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-md font-bold text-green-500">Información actualizada.</p>
            </Transition>
        </div>
    </form>
</section>

    );
}
