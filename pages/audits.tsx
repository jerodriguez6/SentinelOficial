// components/ProjectsSection.tsx

import { useState, useMemo } from 'react';
import { ChevronDown, Eye, Shield, Star, ArrowRight, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from "@components/Badge";
import ProjectDetailView from '@components/ProjectDetailView';

// Importar datos y tipos
import { getAllAudits, AuditData } from 'lib/audit-data';

// Interfaz actualizada para las tarjetas
interface SuccessCardProps {
    id: string;
    name: string;
    score: number;
    change: number;
    description: string;
    category: string;
    audits: number;
    lastUpdate: string;
    highlights: string[];
    logo: string;
    trend: 'up' | 'down';
}

// Función para calcular la distancia de tiempo
const formatDistanceToNow = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return `hace ${Math.floor(interval)} días`;
    interval = seconds / 3600;
    if (interval > 1) return `hace ${Math.floor(interval)} horas`;
    return `hace ${Math.floor(seconds / 60)} minutos`;
};

const allDetailedAudits = getAllAudits();

// Mapeamos los datos al formato de la nueva tarjeta
const successCards: SuccessCardProps[] = allDetailedAudits.map((audit) => {
    const timelineScores = audit.securityTimeline?.map(s => s.score) || [audit.verdict.score];
    const lastScore = timelineScores[timelineScores.length - 1] || 0;
    const prevScore = timelineScores[timelineScores.length - 2] || lastScore;
    const change = lastScore - prevScore;
    const trend = change >= 0 ? 'up' : 'down';
    const totalFindings = audit.findingsSummary.critical + audit.findingsSummary.high + audit.findingsSummary.medium + audit.findingsSummary.low;

    return {
        id: audit.reportId,
        name: audit.projectName,
        score: audit.verdict.score,
        change: change,
        trend: trend,
        description: audit.description,
        category: audit.projectType,
        audits: totalFindings,
        lastUpdate: formatDistanceToNow(audit.auditDate),
        highlights: audit.architecturalStrengths.map(s => s.title).slice(0, 3),
        logo: audit.logo,
    };
});

const ProjectsSection = () => {
    const [showAllProjects, setShowAllProjects] = useState(!false);
    const [selectedProject, setSelectedProject] = useState<AuditData | null>(null);

    const displayedProjects = showAllProjects ? successCards : successCards.slice(0, 3);

    const handleProjectSelect = (id: string) => {
        const projectToDisplay = allDetailedAudits.find(p => p.reportId === id) || null;
        setSelectedProject(projectToDisplay);
    };

    return (
        <section
            id="projects"
            className="py-20 relative bg-black"
        >
            <div className="h-24"></div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {/* ✅ COLOR CORREGIDO */}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Todos Los Proyectos
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Descubre cómo estos proyectos han construido su reputación tecnológica con Sentinel AI
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {displayedProjects.map((project, index) => (
                            <div key={index} className="group relative overflow-hidden h-full">
                                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 h-full flex flex-col group-hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            {/* ✅ COLOR CORREGIDO */}
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                                <img src={project.logo} alt={`${project.name} logo`} className="w-8 h-8 rounded-full object-contain" />
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="border-gray-500/50 text-gray-300 text-xs mb-1 truncate">
                                                    {project.category}
                                                </Badge>
                                                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-3xl font-bold text-white">{project.score.toFixed(1)}</span>
                                            <div className="flex items-center space-x-1">
                                                {project.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                                                <span className={`${project.change >= 0 ? 'text-green-400' : 'text-red-400'} font-semibold`}>
                                                    {project.change >= 0 ? '+' : ''}{project.change.toFixed(1)}
                                                </span>
                                                <span className="text-gray-400 text-sm">esta semana</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-2 bg-gray-700 rounded-full">
                                            {/* ✅ COLOR CORREGIDO */}
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                style={{ width: `${project.score}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {project.highlights.map((highlight, i) => (
                                                <Badge key={i} variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                                                    {highlight}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex justify-between items-center mb-6 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span className="text-gray-300">{project.audits} hallazgos</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-300">{project.lastUpdate}</span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={() => handleProjectSelect(project.id)}
                                        className="w-full mt-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 text-blue-400 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 group-hover:border-blue-400"
                                    >
                                        <span>Ver detalles y evolución</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        {/* ✅ COLOR CORREGIDO */}
                        <Button onClick={() => setShowAllProjects(!showAllProjects)} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-white px-8 py-3 transform hover:scale-110">
                            <ChevronDown className={`h-5 w-5 mr-2 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} />
                            {showAllProjects ? 'Mostrar Menos' : 'Mostrar Todos los Proyectos'}
                        </Button>
                    </div>

                    {selectedProject && (
                        <ProjectDetailView
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;