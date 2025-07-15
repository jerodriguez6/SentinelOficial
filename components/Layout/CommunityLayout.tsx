import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Rocket, Radio, FileText, Bell, User, MoreHorizontal, Users, TrendingUp, Hash, UserPlus, Verified, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../LoginModal';

// Este componente ahora SOLO se encarga de la estructura de 3 columnas.
const CommunityLayout = ({ children }) => {
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { isAuthenticated } = useAuth();

    const menuItems = [
        { id: 'feed', name: 'Feed', icon: Home, path: '/feed' },
        { id: 'launchpad', name: 'Launchpad', icon: Rocket, path: '#' },
        { id: 'lives', name: 'Lives', icon: Radio, path: '/lives' },
        { id: 'articles', name: 'Articles', icon: FileText, path: '/articles' },
        { id: 'notifications', name: 'Notifications', icon: Bell, path: '/#' },
        { id: 'mypage', name: 'My Page', icon: User, path: '/#' },
        { id: 'more', name: 'More', icon: MoreHorizontal, path: '/#' },
    ];

    const isActive = (path) => router.pathname === path;

    const handleLoginRequired = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (!isAuthenticated && (path === '/mypage' || path === '/notifications')) {
            e.preventDefault();
            setIsLoginModalOpen(true);
        }
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const trendingTopics = [
        { name: 'YZI', posts: '1.2K' },
        { name: 'Apple', posts: '987' },
        { name: 'CMC Launch: Aster#', posts: '756' },
        { name: 'ANTGroup', posts: '543' },
        { name: 'CMC Quest: Earn Rewards#', posts: '432' },
    ];

    const recommendedAccounts = [
        {
            name: 'NewCoinListings',
            handle: 'NewCoinListings',
            verified: true,
            recentPosts: [
                { text: 'AI detecta patrón alcista en Bitcoin', time: 'Hace 5 min' },
                { text: 'Alerta de volatilidad en Ethereum', time: 'Hace 15 min' },
                { text: 'Nuevo protocolo DeFi analizado', time: 'Hace 1 hora' }
            ]
        },
        {
            name: 'SENTINEL AI',
            handle: 'SentinelAI',
            verified: true,
            recentPosts: [
                { text: 'Patrón de triángulo en ETH confirmado', time: 'Hace 12 min' },
                { text: 'Volumen inusual detectado en altcoins', time: 'Hace 25 min' },
                { text: 'Señales de compra en layer 2', time: 'Hace 45 min' }
            ]
        }
    ];

    const sidebarWidth = isSidebarMinimized ? 'lg:w-16' : 'lg:w-64';
    const mainMargin = isSidebarMinimized ? 'lg:ml-16' : 'lg:ml-64';

    return (
        <div className="flex w-full  ">
            {isMobile && isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Left Sidebar */}
            <div className={`${isMobile
                ? `fixed left-0 top-24 h-full z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64`
                : `${sidebarWidth} fixed left-0 top-24 h-full z-30 transition-all duration-300`
                } bg-black border-r border-aqua-blue`} style={{ borderRightColor: 'rgba(64, 224, 208, 0.3)' }}>
                <div className="p-4">
                    {/* Community Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-aqua-blue to-aqua-light rounded-full flex items-center justify-center shadow-aqua">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            {(!isSidebarMinimized || isMobile) && (
                                <h2 className="professional-title text-lg font-semibold">COMMUNITY</h2>
                            )}
                        </div>

                        {/* Mobile close button */}
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-aqua-blue/10 rounded-full transition-all duration-300 text-aqua-blue hover:text-aqua-light"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        {/* Desktop minimize button */}
                        {!isMobile && (
                            <button
                                onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                                className="p-2 hover:bg-aqua-blue/10 rounded-full transition-all duration-300 text-aqua-blue hover:text-aqua-light"
                            >
                                {isSidebarMinimized ?
                                    <ChevronRight className="w-5 h-5" /> :
                                    <ChevronLeft className="w-5 h-5" />
                                }
                            </button>
                        )}
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.path}
                                onClick={(e) =>
                                    (item.id === 'mypage' || item.id === 'notifications') &&
                                    handleLoginRequired(e, item.path)}
                                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 group relative ${isActive(item.path)
                                    ? 'bg-gradient-to-r from-aqua-blue/20 to-aqua-light/10 text-aqua-light border-l-4 border-aqua-blue shadow-aqua'
                                    : 'text-aqua-blue hover:text-aqua-light hover:bg-aqua-blue/10 hover:border-l-4 hover:border-aqua-blue/50'
                                    } ${isSidebarMinimized && !isMobile ? 'justify-center' : ''}`}
                                title={isSidebarMinimized && !isMobile ? item.name : undefined}
                            >
                                {/* Indicador de selección activa */}
                                {isActive(item.path) && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-aqua-light to-aqua-blue rounded-r-lg"></div>
                                )}
                                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-aqua-light' : 'text-aqua-blue group-hover:text-aqua-light'
                                    }`} />
                                {(!isSidebarMinimized || isMobile) && (
                                    <span className={`font-medium ${isActive(item.path) ? 'text-aqua-light font-semibold' : ''
                                        }`}>{item.name}</span>
                                )}
                                {/* Punto indicador para sidebar minimizado */}
                                {isActive(item.path) && isSidebarMinimized && !isMobile && (
                                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-aqua-light rounded-full"></div>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content (ocupa el espacio restante) */}
            <div className={`flex-1 ${mainMargin} lg:mr-80 transition-all duration-300`}>
                {isMobile && <button onClick={() => setIsMobileMenuOpen(true)} className="fixed top-28 left-4 z-30 p-2 bg-zinc-800 rounded-full"><Users className="w-5 h-5 text-white" /></button>}
                {/* Aquí se renderizará el contenido específico de la página (Feed, etc.) */}
                {children}
            </div>

            {/* Right Sidebar */}
            {/* Right Sidebar - Trending & Recommendations - Hidden on Mobile */}
            {!isMobile && (
                <div className="w-80 bg-black border-l border-aqua-blue fixed right-0 top-24 h-full overflow-y-auto z-30" style={{ borderLeftColor: 'rgba(64, 224, 208, 0.3)' }}>
                    <div className="p-6 space-y-6">
                        {/* Trending Topics */}
                        <Card className="bg-black border-aqua-blue card-hover">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 professional-title">
                                    <TrendingUp className="w-5 h-5 text-aqua-light" />
                                    <span>Trending Topics</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {trendingTopics.map((topic, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 hover:bg-aqua-blue/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-aqua-blue"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-aqua-blue text-sm font-medium w-4">
                                                {index + 1}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <Hash className="w-4 h-4 text-aqua-blue group-hover:text-aqua-light transition-colors" />
                                                <span className="text-aqua-blue group-hover:text-aqua-light transition-colors">
                                                    {topic.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-aqua-blue/70 text-sm">
                                            {topic.posts}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recommended Accounts */}
                        <Card className="bg-black border-aqua-blue card-hover">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 professional-title">
                                    <Users className="w-5 h-5 text-aqua-light" />
                                    <span>Recommended Accounts</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {recommendedAccounts.map((account, index) => (
                                    <div key={index} className="border-b  pb-4 last:border-0">
                                        {/* Account Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-aqua-blue to-aqua-light rounded-full flex items-center justify-center shadow-aqua">
                                                    <span className="text-white font-medium">
                                                        {account.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className="professional-text font-medium text-sm">
                                                            {account.name}
                                                        </span>
                                                        {account.verified && (
                                                            <Verified className="w-4 h-4 text-aqua-light" />
                                                        )}
                                                    </div>
                                                    <span className="text-aqua-blue/70 text-xs">
                                                        @{account.handle}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                                            >
                                                <UserPlus className="w-3 h-3 mr-1" />
                                                Follow
                                            </Button>
                                        </div>

                                        {/* Recent Posts */}
                                        <div className="space-y-2">
                                            {account.recentPosts.map((post, postIndex) => (
                                                <div key={postIndex} className="bg-gray-900/50 rounded-lg p-2 border border-aqua-blue/20">
                                                    <p className="text-aqua-blue text-xs mb-1">
                                                        {post.text}
                                                    </p>
                                                    <span className="text-aqua-blue/60 text-xs">
                                                        {post.time}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}


            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
};

export default CommunityLayout;
