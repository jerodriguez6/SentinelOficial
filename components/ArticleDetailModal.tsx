import React from 'react';
import { X, Eye, ThumbsUp, MessageCircle, Share2, Bookmark, Calendar, User } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './ui/button';

const ArticleDetailModal = ({ article, isOpen, onClose }) => {
    if (!isOpen || !article) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-aqua-blue/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-black border-b border-aqua-blue/30 p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-gradient-to-r from-aqua-blue/20 to-aqua-light/20 text-aqua-blue border-aqua-blue/30">
                            {article.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-sm text-aqua-blue/70">
                            <Calendar className="w-4 h-4" />
                            <span>{article.timestamp}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-aqua-blue/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-aqua-blue/70 hover:text-aqua-light" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h1 className="professional-title text-3xl font-bold mb-4 leading-tight">
                        {article.title}
                    </h1>

                    {/* Author Info */}
                    <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-aqua-blue/30">
                        <div className="w-12 h-12 bg-gradient-to-r from-aqua-blue to-aqua-light rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-lg">
                                {article.author.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="professional-text font-medium">{article.author}</span>
                                <div className="w-4 h-4 bg-gradient-to-r from-aqua-blue to-aqua-light rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            </div>
                            <span className="text-aqua-blue/70 text-sm">Editor en Jefe de Auditoría</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {article.image && (
                        <div className="mb-6">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="prose prose-invert prose-orange max-w-none">
                        {article.fullContent ? (
                            <div
                                className="text-aqua-blue leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: article.fullContent }}
                            />
                        ) : (
                            <div className="text-aqua-blue leading-relaxed space-y-4">
                                <p>{article.description}</p>
                                <p>
                                    En SHARK Technology no solo construimos productos. <strong>Impulsamos una nueva generación de plataformas que integran Inteligencia Artificial, Blockchain y Automatización</strong> para redefinir cómo interactuamos con la tecnología.
                                </p>
                                <p>
                                    <strong>Sentinel AI es la primera plataforma que fusiona:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>🔎 <strong>Auditoría automatizada de smart contracts</strong></li>
                                    <li>🧠 <strong>Inteligencia Artificial especializada en ciberseguridad</strong></li>
                                    <li>📊 <strong>Un Tech MarketCap de reputación tecnológica</strong></li>
                                </ul>
                                <p>
                                    Así como CoinMarketCap cataloga proyectos por su capitalización, <strong>Sentinel AI creará el estándar global de confianza y reputación para proyectos tecnológicos en Web3</strong>.
                                </p>
                                <h3 className="professional-title text-xl font-semibold mt-6 mb-3">🌐 ¿Qué es Sentinel AI?</h3>
                                <p>
                                    <strong>Sentinel AI</strong> es mucho más que una plataforma de auditoría. Es el nuevo <strong>Tech MarketCap</strong>, un sistema que evalúa la <strong>reputación tecnológica</strong> de los proyectos Web3 con precisión, transparencia e inteligencia artificial.
                                </p>
                                <p>
                                    🔍 En un ecosistema donde la confianza lo es todo, contar con una auditoría automatizada y una puntuación visible puede marcar la diferencia entre captar inversión o pasar desapercibido.
                                </p>
                                <h3 className="professional-title text-xl font-semibold mt-6 mb-3">🔥 Pioneros en el Tech MarketCap de Reputación</h3>
                                <p>
                                    En lugar de clasificar por hype o capitalización, <strong>clasificamos por tecnología real, cumplimiento de buenas prácticas y seguridad del código.</strong>
                                </p>
                                <p>
                                    Un nuevo ranking se está formando, y <strong>Sentinel AI será el núcleo de esta revolución</strong>. Pronto abriremos la plataforma de forma pública para que cualquier proyecto pueda auditarse y demostrar su calidad tecnológica.
                                </p>
                                <p>
                                    <strong>Ser parte de Sentinel AI será una insignia de honor y un filtro de confianza.</strong>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 my-6">
                        {article.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="border-aqua-blue/30 text-aqua-blue hover:border-aqua-light hover:text-aqua-light transition-colors cursor-pointer bg-aqua-blue/5"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between border-t border-aqua-blue/30 pt-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-aqua-blue/70">
                                <Eye className="w-5 h-5" />
                                <span>{article.views} vistas</span>
                            </div>
                            <div className="flex items-center space-x-2 text-aqua-blue/70">
                                <ThumbsUp className="w-5 h-5" />
                                <span>{article.likes} me gusta</span>
                            </div>
                            <div className="flex items-center space-x-2 text-aqua-blue/70">
                                <MessageCircle className="w-5 h-5" />
                                <span>{article.comments} comentarios</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-aqua-blue/30 text-aqua-blue hover:bg-aqua-blue/10 hover:text-aqua-light"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Compartir
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-aqua-blue/30 text-aqua-blue hover:bg-aqua-blue/10 hover:text-aqua-light"
                            >
                                <Bookmark className="w-4 h-4 mr-2" />
                                Guardar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailModal;