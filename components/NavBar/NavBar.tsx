import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useAppContext } from 'context/state'; // Asegúrate de que esta ruta sea correcta
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'; // Importar useRouter de next/router

const NavBar = () => {
    const { connectWallet, walletAddress, onWalletConnectedCallback } = useAppContext();
    const { t, i18n } = useTranslation('common');
    const router = useRouter(); // Inicializa useRouter
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para el desplegable

    console.log('Idioma actual detectado:', i18n.language);

    // Función para cambiar el idioma y cerrar el desplegable
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsDropdownOpen(false); // Cierra el desplegable después de seleccionar
    };

    // Efecto para cerrar el desplegable si se hace clic fuera
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Se recomienda usar Link de Next.js para navegación interna
    // y para que next-i18next maneje automáticamente los prefijos de idioma.

    return (
        <nav className="bg-black flex text-white justify-between items-center w-full px-5 py-2">
            {/* Logo y Título */}
            <Link href="/" className="text-white no-underline flex items-center">
                <Image className="block" height={100} width={100} src={'/sentinel-logo.png'} alt={'sentinel-logo'} />
                <div className='hero-title text-white no-underline ml-2'>
                    SENTINEL IA
                </div>
            </Link>

            {/* Enlaces de Navegación y Selector de Idioma */}
            <div className="flex items-center justify-end gap-6 text-white michroma-regular text-sm md:text-base w-fit">
                <Link href="/auditoria" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white">
                    {t('auditoriaNav')}
                </Link>
                <Link href="/certificados" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white">
                    {t('certificadosNav')}
                </Link>
                <Link href="/blog" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white">
                    {t('blogNav')}
                </Link>
                <Link href="/contacto" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white">
                    {t('contactoNav')}
                </Link>

                {/* Desplegable de Idioma */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        {t('language')} ({i18n.language.toUpperCase()})
                        {/* Icono de flecha para el desplegable */}
                        <svg
                            className={`ml-2 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                            <button
                                onClick={() => changeLanguage('es')}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                                Español
                            </button>
                            <button
                                onClick={() => changeLanguage('en')}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                                English
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;