import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mockArticles } from 'lib/mockData'; // Asegúrate de exportar el tipo 'Article' desde tu mockData
import Layout from '@components/Layout/CommunityLayout';
import { Badge } from "@components/Badge";
import { Button } from "@components/ui/button";
import { Clock, Eye, MessageCircle, Share2, ArrowLeft, TrendingUp } from "lucide-react";


const ArticlePage = () => {
    const router = useRouter();
    const { postId } = router.query;

    // Encuentra el artículo basado en el postId de la URL
    const article = mockArticles.find(a => a.id.toString() === postId);

    // Filtra para encontrar artículos relacionados (misma categoría, excluyendo el actual)
    const relatedArticles = article
        ? mockArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
        : [];

    // Si el artículo no se encuentra, muestra un mensaje de error
    if (!article) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-white">
                    <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
                    <p className="text-slate-400 mb-8">El artículo que buscas no existe o fue movido.</p>
                    <Link href="/articles">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver a los artículos
                        </Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8 text-white">
                <Link href="/articles" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a todos los artículos
                </Link>

                <article className="bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden mb-12 border border-slate-800">
                    <div className="relative">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                        {article.trending && (
                            <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 border-none">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                            </Badge>
                        )}
                        <Badge
                            variant="secondary"
                            className="absolute top-4 right-4 bg-slate-800/80 text-slate-200 border-slate-700"
                        >
                            {article.category}
                        </Badge>
                    </div>

                    <div className="p-6 md:p-10">
                        <div className="flex items-center space-x-2 mb-4 text-sm text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>{article.timestamp}</span>
                            <span>•</span>
                            <span>{article.readTime} de lectura</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                            <div className="flex items-center space-x-3">
                                <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <span className="font-medium text-white">{article.author.name}</span>
                                    <div className="text-sm text-slate-400">Autor</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-slate-400">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-sm">{article.stats.views}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-slate-400">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{article.stats.comments}</span>
                                </div>
                                <button className="text-slate-400 hover:text-white transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* El contenido del artículo se renderiza aquí */}
                        <div
                            className="prose prose-invert prose-lg max-w-none text-slate-300"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </article>

                {/* Artículos relacionados */}
                {relatedArticles.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Artículos relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => (
                                <Link key={related.id} href={`/post/${related.id}`} passHref>
                                    <div className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02]">
                                        <div className="bg-slate-800/60 rounded-lg overflow-hidden h-full flex flex-col">
                                            <img src={related.image} alt={related.title} className="w-full h-40 object-cover" />
                                            <div className="p-4 flex flex-col flex-grow">
                                                <Badge variant="secondary" className="self-start mb-2">{related.category}</Badge>
                                                <h3 className="font-semibold text-white mb-2 line-clamp-2">{related.title}</h3>
                                                <p className="text-slate-400 text-sm mt-auto">{related.author.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ArticlePage;
