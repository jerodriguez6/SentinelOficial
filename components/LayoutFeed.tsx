import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // 1. Importar Link de Next.js
import { useRouter } from 'next/router'; // 2. Importar useRouter de Next.js
import { Home, Rocket, Radio, FileText, Bell, User, MoreHorizontal, Users, TrendingUp, Hash, UserPlus, Verified, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Layout = ({ children }) => {
    const router = useRouter();
    const location = router.pathname;
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { isAuthenticated } = useAuth();

    const menuItems = [
        { id: 'feed', name: 'Feed', icon: Home, path: '/' },
        { id: 'launchpad', name: 'Launchpad', icon: Rocket, path: '/launchpad' },
        { id: 'lives', name: 'Lives', icon: Radio, path: '/lives' },
        { id: 'articles', name: 'Articles', icon: FileText, path: '/articles' },
        { id: 'notifications', name: 'Notifications', icon: Bell, path: '/notifications' },
        { id: 'mypage', name: 'My Page', icon: User, path: '/mypage' },
        { id: 'more', name: 'More', icon: MoreHorizontal, path: '/more' },
    ];

    const isActive = (path) => router.pathname === path;

    const handleLoginRequired = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
        }
    };

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1280); // xl breakpoint
        };

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

    const sidebarWidth = isSidebarMinimized ? 'w-16' : 'w-64';
    const mainMargin = isSidebarMinimized ? 'ml-16' : 'ml-64';

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: 'rgb(9 9 11)' }}>
            {/* Mobile Overlay */}
            {isMobile && isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Left Sidebar - Community Navigation */}
            <div className={`${isMobile
                ? `fixed left-0 top-24 h-full z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64`
                : `${sidebarWidth} fixed left-0 top-24 h-full z-30 transition-all duration-300`
                } bg-[#09090B] border-r border-zinc-800`}>
                <div className="p-4">
                    {/* Community Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            {(!isSidebarMinimized || isMobile) && (
                                <h2 className="text-white font-semibold text-lg">COMMUNITY</h2>
                            )}
                        </div>

                        {/* Mobile close button */}
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        )}

                        {/* Desktop minimize button */}
                        {!isMobile && (
                            <button
                                onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                {isSidebarMinimized ?
                                    <ChevronRight className="w-5 h-5 text-slate-400" /> :
                                    <ChevronLeft className="w-5 h-5 text-slate-400" />
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
                                onClick={(item.id === 'mypage' || item.id === 'notifications') ? handleLoginRequired : undefined}
                                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group ${isActive(item.path)
                                    ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-400 border-l-4 border-orange-500'
                                    : 'text-slate-400 hover:text-white hover:bg-zinc-800'
                                    } ${isSidebarMinimized && !isMobile ? 'justify-center' : ''}`}
                                title={isSidebarMinimized && !isMobile ? item.name : undefined}
                            >
                                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-orange-400' : 'text-slate-500 group-hover:text-white'
                                    }`} />
                                {(!isSidebarMinimized || isMobile) && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${isMobile ? 'ml-0' : mainMargin} ${isMobile ? 'mr-0' : 'mr-0 xl:mr-80'} transition-all duration-300`}>
                {/* Mobile menu button */}
                {isMobile && (
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="fixed top-28 left-4 z-30 p-2 bg-zinc-800 rounded-full border border-zinc-700 hover:bg-zinc-700 transition-colors"
                    >
                        <Users className="w-5 h-5 text-white" />
                    </button>
                )}

                {children}
            </div>

            {/* Right Sidebar - Trending & Recommendations - Hidden on Mobile */}
            {!isMobile && (
                <div className="w-80 bg-[#09090B] border-l border-zinc-800 fixed right-0 top-24 h-full overflow-y-auto z-30">
                    <div className="p-6 space-y-6">
                        {/* Trending Topics */}
                        <Card className="bg-white/5 border-zinc-700">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-white">
                                    <TrendingUp className="w-5 h-5 text-orange-400" />
                                    <span>Trending Topics</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {trendingTopics.map((topic, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-slate-500 text-sm font-medium w-4">
                                                {index + 1}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <Hash className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                                                <span className="text-slate-300 group-hover:text-white transition-colors">
                                                    {topic.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-slate-400 text-sm">
                                            {topic.posts}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recommended Accounts */}
                        <Card className="bg-white/5 border-zinc-700">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-white">
                                    <Users className="w-5 h-5 text-orange-400" />
                                    <span>Recommended Accounts</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {recommendedAccounts.map((account, index) => (
                                    <div key={index} className="border-b border-zinc-700 pb-4 last:border-0">
                                        {/* Account Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-medium">
                                                        {account.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className="text-white font-medium text-sm">
                                                            {account.name}
                                                        </span>
                                                        {account.verified && (
                                                            <Verified className="w-4 h-4 text-orange-400" />
                                                        )}
                                                    </div>
                                                    <span className="text-slate-400 text-xs">
                                                        @{account.handle}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="text-white text-xs px-3 py-1"
                                                style={{
                                                    backgroundColor: '#1B1D23',
                                                    backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                                                }}
                                            >
                                                <UserPlus className="w-3 h-3 mr-1" />
                                                Follow
                                            </Button>
                                        </div>

                                        {/* Recent Posts */}
                                        <div className="space-y-2">
                                            {account.recentPosts.map((post, postIndex) => (
                                                <div key={postIndex} className="bg-zinc-700/30 rounded-lg p-2">
                                                    <p className="text-slate-300 text-xs mb-1">
                                                        {post.text}
                                                    </p>
                                                    <span className="text-slate-500 text-xs">
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

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>
    );
};

export default Layout;