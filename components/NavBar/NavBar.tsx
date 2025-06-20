import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
// import { useAppContext } from 'context/state'; // Eliminado: ya no se usa el contexto de la wallet
import Image from 'next/image';
import { useTranslation } from 'next-i18next'; // Importar useTranslation
import { useRouter } from 'next/router'; // Importar useRouter de next/router

const NavBar = () => {
    // const { connectWallet, walletAddress, onWalletConnectedCallback } = useAppContext(); // Eliminado: ya no se usa la lógica de la wallet
    // ✨ FIX: Añadir { useSSR: false } para evitar errores de hidratación en SSR/CSR mismatch ✨
    const { t, i18n } = useTranslation('common'); // useSSR: false removido
    const router = useRouter(); // Inicializa useRouter
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para el desplegable
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú hamburguesa

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Función para cambiar el idioma y cerrar el desplegable
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsDropdownOpen(false); // Cierra el desplegable después de seleccionar
        setIsMobileMenuOpen(false); // Cierra el menú móvil también
    };

    // Efecto para cerrar el desplegable si se hace clic fuera
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
        <nav className="bg-black fixed w-full top-0 left-0 z-50 shadow-md h-24">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                {/* Logo y Título */}
                <Link href="/" className="text-white no-underline flex items-center shrink-0">
                    <Image className="block" height={80} width={80} src={'/sentinel-logo.png'} alt={'sentinel-logo'} /> {/* Ajustado tamaño para mobile */}
                    <div className='hero-title text-white no-underline ml-2 text-lg sm:text-xl'> {/* Ajustado tamaño de texto */}
                        SENTINEL IA
                    </div>
                </Link>

                {/* Botón de Menú Hamburguesa para Móviles */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-md"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Enlaces de Navegación y Selector de Idioma (Desktop) */}
                <div className="hidden md:flex items-center justify-end gap-6 text-white michroma-regular text-sm md:text-base w-fit">
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
                            {t('language')}{" "}
                            {/* Renderizado condicional del idioma */}
                            {i18n.language ? `(${i18n.language.toUpperCase()})` : ''}
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
            </div>

            {/* Menú de Navegación para Móviles (Desplegable) */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-black pb-4`}>
                <div className="flex flex-col items-center gap-4 text-white michroma-regular text-base">
                    <Link href="/auditoria" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        {t('auditoriaNav')}
                    </Link>
                    <Link href="/certificados" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        {t('certificadosNav')}
                    </Link>
                    <Link href="/blog" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        {t('blogNav')}
                    </Link>
                    <Link href="/contacto" className="hover:text-gray-400 transition-colors duration-200 cursor-pointer no-underline text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        {t('contactoNav')}
                    </Link>

                    {/* Desplegable de Idioma en el Menú Móvil */}
                    <div className="relative w-full text-center" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-center w-full px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            {t('language')}{" "}
                            {/* Renderizado condicional del idioma en móvil también */}
                            {i18n.language ? `(${i18n.language.toUpperCase()})` : ''}
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
                            <div className="w-full bg-gray-700 rounded-md shadow-lg py-1 mt-2">
                                <button
                                    onClick={() => changeLanguage('es')}
                                    className="block w-full text-center px-4 py-2 text-sm text-white hover:bg-gray-600"
                                >
                                    Español
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className="block w-full text-center px-4 py-2 text-sm text-white hover:bg-gray-600"
                                >
                                    English
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
