import { Link, Head } from "@inertiajs/react";
import GeneralLayout from "@/Layouts/GeneralLayout";

export default function Welcome({}) {
    return (
        <GeneralLayout>
            <Head title="Bienvenidos" />
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col justify-center mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl">
                            Deportes municipales
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">
                            Mantente informado sobre los torneos locales y las
                            últimas noticias deportivas.
                            <br/>
                            Todo lo que necesitas saber sobre el deporte en tu
                            ciudad.
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link
                                rel="noopener noreferrer"
                                href="#torneos"
                                className="px-8 py-3 text-lg font-semibold rounded bg-[#67ACD9] text-gray-100 hover:bg-[#4784AC] duration-200"
                            >
                                Ver Torneos
                            </Link>
                            <Link
                                rel="noopener noreferrer"
                                href="#noticias"
                                className="px-8 py-3 text-lg font-semibold border rounded border-gray-800 hover:bg-black/10 duration-200"
                            >
                                Ver Noticias
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src="storage/jugadores-deportes.png"
                            alt="Ilustración jugadores deportivos"
                            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                </div>
            </section>
        </GeneralLayout>
    );
}
