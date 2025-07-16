import React, { useState } from 'react';
import { Play, Users, Calendar, Clock, Filter } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/Badge';
import { Card, CardContent } from '@components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import Layout from '@components/Layout/CommunityLayout';
import LoginModal from '@components/LoginModal';

const LivesPage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const upcomingLives = [
        {
            id: 1,
            title: 'Weekly Crypto Forecast',
            host: 'CoinMarketCap',
            participants: '1,193',
            date: 'Hoy, Jul 11',
            time: '193 going',
            thumbnail: 'https://images.unsplash.com/photo-1639815188508-13f7370f664a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeXxlbnwwfHx8Ymx1ZXwxNzUyMDc3MDA1fDA&ixlib=rb-4.1.0&q=85',
            tags: ['CoinMarketCap', 'AltoCrypto', 'Gabriel Zarl'],
            status: 'upcoming'
        }
    ];

    const pastLives = [
        {
            id: 2,
            title: 'BREAKING: Crypto Surges Bitcoin ETF',
            host: 'CoinMarketCap',
            participants: '101,238',
            date: 'Jan 10, 2024',
            time: '101,238 tuned in',
            thumbnail: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg',
            tags: ['BTC', 'ETF', 'AlboCrypto'],
            status: 'past'
        },
        {
            id: 3,
            title: 'The Future of Computer AI: Beyond',
            host: 'AssemblyAI DasCal',
            participants: '60,831',
            date: 'Jan 29, 2025',
            time: '60,831 tuned in',
            thumbnail: 'https://images.unsplash.com/photo-1644143379190-08a5f055de1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxibG9ja2NoYWlufGVufDB8fHxibHVlfDE3NTIxMzY2NzJ8MA&ixlib=rb-4.1.0&q=85',
            tags: ['AI', 'Future', 'Podcast'],
            status: 'past'
        },
        {
            id: 4,
            title: 'Weekly Crypto Forecast',
            host: 'CoinMarketCap',
            participants: '71,149',
            date: 'Feb 24, 2025',
            time: '71,149 tuned in',
            thumbnail: 'https://images.pexels.com/photos/14911400/pexels-photo-14911400.jpeg',
            tags: ['CoinMarketCap', 'AltoCrypto', 'Gabriel Zarl'],
            status: 'past'
        }
    ];

    const handlePlayClick = () => {
        setIsLoginModalOpen(true);
    };

    const LiveCard = ({ live }) => (
        <Card className="bg-black border-aqua-blue/30 hover:border-aqua-blue/50 transition-all duration-300 group card-hover">
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={live.thumbnail}
                        alt={live.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            onClick={handlePlayClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center"
                        >
                            <Play className="w-8 h-8 ml-1" />
                        </Button>
                    </div>
                    {live.status === 'upcoming' && (
                        <div className="absolute top-3 left-3">
                            <Badge className="bg-orange-500 text-white">
                                Próximo
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="professional-title font-semibold text-lg mb-2 line-clamp-2">
                        {live.title}
                    </h3>

                    <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1 text-aqua-blue/70 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{live.date}</span>
                        </div>
                        <span className="text-aqua-blue/50">•</span>
                        <div className="flex items-center space-x-1 text-aqua-blue/70 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{live.time}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {live.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-aqua-blue/30 text-aqua-blue bg-aqua-blue/5"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <Button
                        onClick={handlePlayClick}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        {live.status === 'upcoming' ? 'Set reminder' : 'Play recording'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Layout>
            <div className="px-6 py-8  h-[57vh]">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6 ">
                        <div>
                            <h1 className="professional-title text-3xl font-bold mb-2">
                                Comming Soon
                            </h1>
                            {/* <p className="text-aqua-blue/70">
                                Participa en transmisiones en vivo sobre criptomonedas
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LivesPage;