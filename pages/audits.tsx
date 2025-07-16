// components/ProjectsSection.tsx

import { useState, useMemo } from 'react';
import { ChevronDown, Eye, Shield, Star, ArrowRight, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@components/ui/button';
import ProjectDetailView from '@components/ProjectDetailView';

// 1. IMPORTAMOS LA NUEVA TARJETA
import { ProjectCard, ProjectCardProps } from '@components/ProjectCard';

// Importar datos y tipos
import { getAllAudits, AuditData } from 'lib/audit-data';

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

type ProjectCardData = Omit<ProjectCardProps, 'onCardClick'>;

const ProjectsSection = () => {
    const [showAllProjects, setShowAllProjects] = useState(!false);
    const [selectedProject, setSelectedProject] = useState<AuditData | null>(null);

    // 2. PREPARAMOS LOS DATOS PARA LA TARJETA
    const projectCards: ProjectCardData[] = useMemo(() => allDetailedAudits.map((audit) => {
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
            grade: audit.verdict.grade,
            change: change,
            trend: trend,
            description: audit.description,
            category: audit.category,
            audits: totalFindings,
            lastUpdate: formatDistanceToNow(audit.auditDate),
            highlights: audit.architecturalStrengths.map(s => s.title).slice(0, 3),
            logo: audit.logo,
        };
    }), []);

    const displayedProjects = showAllProjects ? projectCards : projectCards.slice(0, 3);

    const handleProjectSelect = (id: string) => {
        const projectToDisplay = allDetailedAudits.find(p => p.reportId === id) || null;
        setSelectedProject(projectToDisplay);
    };

    return (
        <section id="projects" className="py-20 relative bg-black" style={{
            backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-white hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                            Todos los Proyectos
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explora el ecosistema de proyectos auditados y certificados por Sentinel AI.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* 3. USAMOS EL NUEVO COMPONENTE DE TARJETA */}
                        {displayedProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                {...project}
                                onCardClick={() => handleProjectSelect(project.id)}
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <Button onClick={() => setShowAllProjects(!showAllProjects)} className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 transform hover:scale-110">
                            <ChevronDown className={`h-5 w-5 mr-2 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} />
                            {showAllProjects ? 'Mostrar Menos' : 'Mostrar Todos'}
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