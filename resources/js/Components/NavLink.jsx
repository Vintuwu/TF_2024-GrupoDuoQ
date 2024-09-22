import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#4784AC] text-gray-900 focus:border-indigo-700 '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-[#67ACD9] focus:text-gray-700 focus:border-[#67ACD9] ') +
                className
            }
        >
            {children}
        </Link>
    );
}
