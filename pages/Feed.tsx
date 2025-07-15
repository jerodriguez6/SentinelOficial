import React, { useState } from 'react';
import { Filter, TrendingUp, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import CommunityLayout from '@components/Layout/CommunityLayout';
import FeedPost from '@components/FeedPost';
import LoginModal from '@components/LoginModal';
import { useAuth } from '@context/AuthContext';
import { mockFeedPosts } from 'lib/mockData';

const FeedPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const { isAuthenticated } = useAuth();

    const handleCreatePost = () => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
        } else {
            // Abrir modal de crear post o navegar a página de creación
            console.log('Crear post - usuario autenticado');
            // Aquí iría la lógica para crear post
        }
    };

    return (
        <CommunityLayout>
            <div className="px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Feed
                            </h1>
                            <p className="text-slate-400">
                                Análisis de mercado, gráficos y noticias de la comunidad crypto
                            </p>
                        </div>
                        <Button
                            onClick={handleCreatePost}
                            className="text-white"
                            style={{
                                backgroundColor: '#1B1D23',
                                backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                            }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Crear Post
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                            <SelectTrigger className="w-40 bg-zinc-800 border-aqua-blue text-aqua-blue">
                                <SelectValue placeholder="Filtros" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-aqua-blue text-aqua-blue">
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="analysis">Análisis</SelectItem>
                                <SelectItem value="news">Noticias</SelectItem>
                                <SelectItem value="alerts">Alertas</SelectItem>
                                <SelectItem value="research">Research</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-40 bg-zinc-800 border-aqua-blue  text-aqua-blue">
                                <SelectValue placeholder="Ordenar" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700 text-aqua-blue">
                                <SelectItem value="recent">Más Recientes</SelectItem>
                                <SelectItem value="popular">Más Populares</SelectItem>
                                <SelectItem value="trending">Trending</SelectItem>
                                <SelectItem value="following">Siguiendo</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-600 text-slate-300 hover:bg-zinc-700 hover:text-white"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Más Filtros
                        </Button>
                    </div>
                </div>

                {/* Feed Posts */}
                <div className="space-y-6">
                    {mockFeedPosts.map((post) => (
                        <FeedPost key={post.id} post={post} />
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        className="text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                            backgroundColor: '#1B1D23',
                            backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                        }}
                    >
                        Cargar Más Posts
                    </Button>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </CommunityLayout>
    );
};

export default FeedPage;