
import { Badge } from "@components/Badge";
import { TrendingUp, Shield, Star, ArrowRight, Clock } from "lucide-react";

const SuccessCases = () => {
    const projects = [
        {
            name: "DeFiProtocol ABC",
            score: 95,
            change: +2,
            description: "Smart contract DeFi con integración de IA y auditorías semanales.",
            category: "DeFi",
            audits: 12,
            lastUpdate: "2 días",
            highlights: ["Seguridad AAA", "Innovación IA", "Comunidad activa"]
        },
        {
            name: "CryptoExchange Pro",
            score: 92,
            change: +4,
            description: "Exchange descentralizado con funciones avanzadas de trading y staking.",
            category: "Exchange",
            audits: 8,
            lastUpdate: "1 semana",
            highlights: ["Alta liquidez", "UI/UX excelente", "Seguridad multi-capa"]
        },
        {
            name: "MetaVerse Platform",
            score: 89,
            change: +3,
            description: "Plataforma de realidad virtual con NFTs y economía digital integrada.",
            category: "Metaverse",
            audits: 6,
            lastUpdate: "3 días",
            highlights: ["Tecnología VR", "Economía sostenible", "Escalabilidad"]
        }
    ];

    return (
        <section className="py-20 relative"
            style={{
                backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundAttachment: 'fixed'
            }}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="border-green-500/50 text-white mb-6">
                        Casos de éxito
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">

                        <span className="bg-gradient-to-r from-[#4F596196] to-foreground  bg-clip-text text-transparent">
                            Proyectos  {" "}destacados
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Descubre cómo estos proyectos han construido su reputación tecnológica con SentinelScore
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden"
                            >
                                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 h-full group-hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#4F596196] to-foreground  rounded-xl flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="border-gray-500/50 text-gray-300 text-xs mb-1">
                                                    {project.category}
                                                </Badge>
                                                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-3xl font-bold text-white">{project.score}</span>
                                            <div className="flex items-center space-x-1">
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400 font-semibold">+{project.change}</span>
                                                <span className="text-gray-400 text-sm">esta semana</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-2 bg-gray-700 rounded-full">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#4F596196] to-foreground rounded-full"
                                                style={{ width: `${project.score}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex justify-between items-center mb-6 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span className="text-gray-300">{project.audits} auditorías</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4 text-blue-400" />
                                            <span className="text-gray-300">{project.lastUpdate}</span>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {project.highlights.map((highlight, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="outline"
                                                    className="border-green-500/30 text-white text-xs"
                                                >
                                                    {highlight}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <button className="w-full bg-gradient-to-r from-[#4F596196] to-foreground metalic-clasic-hover border border-green-500/30 text-white  font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 group-hover:border-green-400 hover:text-white">
                                        <span>Ver perfil y evolución</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-green-500/20 p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                ¿Tu proyecto puede ser el próximo caso de éxito?
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Únete a estos proyectos líderes y comienza a construir tu reputación tecnológica hoy mismo
                            </p>
                            <button className="metalic-clasic metalic-clasic-hover text-white font-semibold px-8 py-3 rounded-lg transition-all">
                                Ver caso de éxito completo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessCases;