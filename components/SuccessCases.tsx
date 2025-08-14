import { useMemo, useState } from 'react';
import { Badge } from "@components/Badge";
import { ProjectCard } from "@components/ProjectCard";
import dynamic from 'next/dynamic';
import { getAllAudits, AuditData } from 'lib/audit-data';

const ProjectDetailView = dynamic(() => import('@components/ProjectDetailView'), { ssr: false });

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

const SuccessCases = () => {
    const [selectedProject, setSelectedProject] = useState<AuditData | null>(null);

    const topProjects = useMemo(() => {
        const allAudits = getAllAudits();
        return allAudits
            .sort((a, b) => b.verdict.score - a.verdict.score)
            .slice(0, 3)
            .map((audit) => {
                const timelineScores = audit.securityTimeline?.map(s => s.score) || [audit.verdict.score];
                const lastScore = timelineScores[timelineScores.length - 1] || 0;
                const prevScore = timelineScores[timelineScores.length - 2] || lastScore;
                const change = lastScore - prevScore;
                const trend = (change >= 0 ? 'up' : 'down') as 'up' | 'down';
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
            });
    }, []);

    const handleProjectSelect = (id: string) => {
        const allAudits = getAllAudits();
        const projectToDisplay = allAudits.find(p => p.reportId === id) || null;
        setSelectedProject(projectToDisplay);
    };

    return (
        <section
            className="py-20 relative"
            style={{
                backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="border-gray-500/50 text-gray-300 mb-6">
                        Casos de éxito
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                            Proyectos destacados
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Descubre cómo los proyectos mejor calificados han construido su reputación tecnológica.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {topProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group [perspective:1200px] h-[420px] w-full"
                            >
                                <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    
                                    {/* Frente - SIN botón */}
                                    <div className="absolute inset-0 [backface-visibility:hidden]">
                                        <ProjectCard
                                            {...project}
                                            hideButton
                                            descriptionClassName="text-sm md:text-base leading-snug text-gray-300"
                                        />
                                    </div>

                                    {/* Reverso - Botón con efecto NFT sutil */}
                                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-xl overflow-hidden flex flex-col items-center justify-center bg-black/70">
                                        <img
                                            src="/masku.jpeg"
                                            alt="Mask NFT"
                                            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
                                        />
                                        <button
                                            onClick={() => handleProjectSelect(project.id)}
                                            className="relative z-10 px-6 py-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 hover:scale-105"
                                            style={{
                                                boxShadow: '0 0 6px rgba(85, 247, 237, 0.3), 0 0 12px rgba(0, 162, 255, 0.25)',
                                                borderRadius: '9999px', // Asegura que el botón sea completamente redondo
                                            }}
                                        >
                                            Ver perfil y evolución
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedProject && (
                    <ProjectDetailView
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </div>
        </section>
    );
};

export default SuccessCases;
