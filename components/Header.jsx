import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // 1. Importar useRouter
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, User, Menu, X, ChevronDown, Wallet, Shield, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import Image from 'next/image';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter(); // 2. Obtener el objeto router

    const navigationItems = [
        { name: 'Tech MarketCap', href: '/tech-marketcap', icon: TrendingUp },
        { name: 'Auditorías', href: '/audits', icon: Shield },
        { name: 'Exchanges', href: '#' },
        { name: 'Community', href: '/Feed' }, // Eliminamos 'active: true'
    ];

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            <header className="bg-black border-b border-professional-blue/20 sticky top-0 z-50" style={{ background: 'black', borderBottomColor: 'rgba(74, 144, 226, 0.2)', boxShadow: '0 2px 10px rgba(74, 144, 226, 0.1)' }}>
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors no-underline">
                                <Image className="block" height={35} width={35} src={'/sentinel-logo-blue.png'} alt={'sentinel-logo'} />
                                <div className="hero-title ml-2 text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent no-underline">
                                    SENTINEL IA
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    // 3. Comparación dinámica de la ruta
                                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${router.pathname === item.href
                                        ? 'text-blue-400 bg-blue-900/20'
                                        : 'text-slate-300 hover:text-white hover:bg-zinc-800'
                                        }`}
                                >
                                    {item.icon && <item.icon className="w-4 h-4" />}
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Search and User Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative hidden sm:block">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Buscar proyectos..."
                                    className="w-64 pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* User Authentication */}
                            <div className="hidden md:flex items-center space-x-3">
                                {isAuthenticated ? (
                                    <div className="relative">
                                        <Button
                                            size="sm"
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="text-white flex items-center space-x-2"
                                            style={{
                                                backgroundColor: '#1B1D23',
                                                backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                                            }}
                                        >
                                            {user?.type === 'wallet' ? (
                                                <>
                                                    <Wallet className="w-4 h-4" />
                                                    <span>{user.displayName}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <User className="w-4 h-4" />
                                                    <span>{user?.name || 'Usuario'}</span>
                                                </>
                                            )}
                                            <ChevronDown className="w-3 h-3" />
                                        </Button>

                                        {/* User Dropdown Menu */}
                                        {showUserMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg py-2 z-50">
                                                <Link
                                                    href="/profile"
                                                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-zinc-700 hover:text-white"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Mi Perfil
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-zinc-700 hover:text-white"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/auditorias"
                                                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-zinc-700 hover:text-white"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Mis Auditorías
                                                </Link>
                                                <div className="border-t border-zinc-700 my-2"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-zinc-700 hover:text-white"
                                                >
                                                    Cerrar Sesión
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        onClick={handleLoginClick}
                                        className="text-white"
                                        style={{
                                            backgroundColor: '#1B1D23',
                                            backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                                        }}
                                    >
                                        Conectar
                                    </Button>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-zinc-800"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-zinc-800">
                            <div className="flex flex-col space-y-2">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors rounded-md ${router.pathname === item.href // Aplicar la misma lógica aquí
                                            ? 'text-blue-400 bg-blue-900/20'
                                            : 'text-slate-300 hover:text-white hover:bg-zinc-800'
                                            }`}
                                    >
                                        {item.icon && <item.icon className="w-4 h-4" />}
                                        <span>{item.name}</span>
                                    </Link>
                                ))}

                                <div className="pt-2 mt-2 border-t border-zinc-800">
                                    {isAuthenticated ? (
                                        <div className="space-y-2">
                                            <div className="px-3 py-2 text-white font-medium border border-zinc-700 rounded">
                                                {user?.type === 'wallet' ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Wallet className="w-4 h-4" />
                                                        <span>{user.displayName}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <User className="w-4 h-4" />
                                                        <span>{user?.name || 'Usuario'}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                onClick={handleLogout}
                                                size="sm"
                                                variant="outline"
                                                className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                                            >
                                                Cerrar Sesión
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={handleLoginClick}
                                            className="w-full text-white"
                                            style={{
                                                backgroundColor: '#1B1D23',
                                                backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                                            }}
                                        >
                                            Conectar
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
};

export default Header;