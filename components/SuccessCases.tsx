import { useMemo, useState } from 'react'; // ✅ 1. Importamos useState
import { Badge } from "@components/Badge";
import { ProjectCard } from "@components/ProjectCard";
import ProjectDetailView from '@components/ProjectDetailView'; // ✅ 2. Importamos el modal

// Importamos los datos reales y tipos necesarios
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

const SuccessCases = () => {
    // ✅ 3. AÑADIMOS EL ESTADO PARA MANEJAR EL PROYECTO SELECCIONADO
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

    // ✅ 4. AÑADIMOS LA FUNCIÓN PARA ABRIR EL MODAL
    const handleProjectSelect = (id: string) => {
        const allAudits = getAllAudits();
        const projectToDisplay = allAudits.find(p => p.reportId === id) || null;
        setSelectedProject(projectToDisplay);
    };

    return (
        <section className="py-20 relative"
            style={{
                backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="border-gray-500/50 text-gray-300 mb-6">
                        Casos de éxito
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#4F596196] to-foreground bg-clip-text text-transparent">
                            Proyectos destacados
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Descubre cómo los proyectos mejor calificados han construido su reputación tecnológica.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {topProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                {...project}
                                // ✅ 5. CONECTAMOS EL CLIC DE LA TARJETA CON LA FUNCIÓN
                                onCardClick={() => handleProjectSelect(project.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* ✅ 6. RENDERIZAMOS EL MODAL CUANDO HAYA UN PROYECTO SELECCIONADO */}
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