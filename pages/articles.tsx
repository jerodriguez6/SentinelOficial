import React, { useState } from 'react';
import Link from 'next/link'; // ✅ 1. Importar Link de Next.js
import { Filter } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import Layout from '@components/Layout/CommunityLayout';
import ArticleCard from '@components/ArticleCard';
import { mockArticles } from 'lib/mockData';

const Articles = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Aquí iría la lógica para filtrar y ordenar los mockArticles
    // const displayedArticles = ...

    return (
        <Layout>
            <div className="px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Articles
                        </h1>
                        <p className="text-slate-400">
                            Discover the latest crypto insights and market analysis
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="analysis">Analysis</SelectItem>
                                <SelectItem value="news">News</SelectItem>
                                <SelectItem value="trading">Trading</SelectItem>
                                <SelectItem value="defi">DeFi</SelectItem>
                                <SelectItem value="security">Security</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="popular">Most Popular</SelectItem>
                                <SelectItem value="trending">Trending</SelectItem>
                                <SelectItem value="discussed">Most Discussed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            More Filters
                        </Button>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="space-y-6">
                    {mockArticles.map((article) => (
                        // ✅ 2. Envolver cada tarjeta con el componente Link
                        <Link key={article.id} href={`/post/${article.id}`} passHref>
                            {/* ✅ 3. Añadir un div para el cursor y efectos de hover */}
                            <div className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.01]">
                                <ArticleCard article={article} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-400 to-[#55f7ed] hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
                    >
                        Load More Articles
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default Articles;
