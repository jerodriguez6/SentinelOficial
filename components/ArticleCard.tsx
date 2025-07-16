import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './Badge'; // Asumo que el Badge viene de ui/badge
import { Eye, ThumbsUp, MessageCircle, Share2, Bookmark, Heart } from 'lucide-react';
// import ArticleDetailModal from './ArticleDetailModal'; // Asumo que tienes este componente

// Definimos el tipo para el objeto 'article' para que coincida con tus datos en lib/mockData.js
type Article = {
    id: number;
    title: string;
    excerpt: string; // Usamos 'excerpt' en lugar de 'description'
    category: string;
    author: {
        name: string;
        avatar: string;
    };
    stats: {
        views: string;
        comments: number;
        likes: number;
    };
    timestamp: string;
    image: string;
    tags: string[];
};


const ArticleCard = ({ article }: { article: Article }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false); // Descomenta si usas el Modal

    if (!article) {
        return null;
    }

    return (
        <>
            <Card className="bg-black border-aqua-blue/30 hover:border-aqua-blue/50 transition-all duration-300 hover:shadow-aqua card-hover group cursor-pointer">
                {/* Descomenta el onClick si vas a usar el modal */}
                {/* <CardContent className="p-6" onClick={() => setIsModalOpen(true)}> */}
                <CardContent className="p-6">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex gap-6">
                        {/* Article Image */}
                        <div className="flex-shrink-0">
                            <div className="relative overflow-hidden rounded-lg w-32 h-24">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="flex-1">
                            {/* Category Badge */}
                            <div className="mb-2">
                                <Badge variant="secondary" className="bg-gradient-to-r from-aqua-blue/20 to-aqua-light/20 text-aqua-blue border-aqua-blue/30">
                                    {article.category}
                                </Badge>
                            </div>

                            {/* Title */}
                            <h3 className="professional-title font-semibold text-lg mb-2 line-clamp-2 group-hover:text-aqua-light transition-colors">
                                {article.title}
                            </h3>

                            {/* Description -> Excerpt */}
                            <p className="text-aqua-blue/70 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {article.tags.slice(0, 3).map((tag, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs border-aqua-blue/30 text-aqua-blue hover:border-aqua-light hover:text-aqua-light transition-colors cursor-pointer bg-aqua-blue/5"
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Author and Stats */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full" />
                                    <div className="flex items-center space-x-2 text-sm text-aqua-blue/70">
                                        <span className="hover:text-aqua-light transition-colors cursor-pointer">
                                            {/* ✅ CORRECCIÓN: Usar article.author.name */}
                                            {article.author.name}
                                        </span>
                                        <span>•</span>
                                        <span>{article.timestamp}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-aqua-blue/70">
                                    <div className="flex items-center space-x-1 hover:text-aqua-light transition-colors cursor-pointer">
                                        <Eye className="w-4 h-4" />
                                        {/* ✅ CORRECCIÓN: Usar article.stats.views */}
                                        <span>{article.stats.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 hover:text-green-400 transition-colors cursor-pointer">
                                        <ThumbsUp className="w-4 h-4" />
                                        {/* ✅ CORRECCIÓN: Usar article.stats.likes */}
                                        <span>{article.stats.likes}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 hover:text-yellow-400 transition-colors cursor-pointer">
                                        <MessageCircle className="w-4 h-4" />
                                        {/* ✅ CORRECCIÓN: Usar article.stats.comments */}
                                        <span>{article.stats.comments}</span>
                                    </div>
                                    <button className="p-1 hover:text-aqua-light transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 hover:text-yellow-400 transition-colors">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout - Vertical */}
                    <div className="md:hidden">
                        {/* Article Image - Top */}
                        <div className="mb-4">
                            <div className="relative overflow-hidden rounded-lg w-full h-48">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Article Content - Bottom */}
                        <div>
                            {/* Category Badge */}
                            <div className="mb-3">
                                <Badge variant="secondary" className="bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-400 border-orange-500/30">
                                    {article.category}
                                </Badge>
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-orange-400 transition-colors">
                                {article.title}
                            </h3>

                            {/* Description -> Excerpt */}
                            <p className="text-slate-400 text-sm mb-4">
                                {article.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.slice(0, 3).map((tag, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs border-slate-600 text-slate-300 hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center space-x-3 mb-3">
                                <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-sm hover:text-orange-400 transition-colors cursor-pointer">
                                        {/* ✅ CORRECCIÓN: Usar article.author.name */}
                                        {article.author.name}
                                    </span>
                                    <span className="text-slate-400 text-xs">{article.timestamp}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 hover:text-orange-400 transition-colors cursor-pointer">
                                        <Eye className="w-4 h-4" />
                                        <span>{article.stats.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 hover:text-green-400 transition-colors cursor-pointer">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>{article.stats.likes}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 hover:text-yellow-400 transition-colors cursor-pointer">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{article.stats.comments}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="p-1 hover:text-orange-400 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 hover:text-yellow-400 transition-colors">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Article Detail Modal - Descomenta si lo usas */}
            {/* <ArticleDetailModal
                article={article}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            /> */}
        </>
    );
};

export default ArticleCard;
