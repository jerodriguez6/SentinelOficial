import React, { useMemo, useState } from "react";
import { Badge } from "@components/Badge";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { getAllAudits, AuditData } from '../lib/audit-data'; // Asumimos que AuditData no tiene 'category'
import { cn } from "lib/utils";
import ProjectDetailView from "@components/ProjectDetailView";

// (El código de formatDistanceToNow y MiniChart no cambia)
const formatDistanceToNow = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return `hace ${Math.floor(interval)} días`;
    interval = seconds / 3600;
    if (interval > 1) return `hace ${Math.floor(interval)} horas`;
    interval = seconds / 60;
    if (interval > 1) return `hace ${Math.floor(interval)} minutos`;
    return `hace ${Math.floor(seconds)} segundos`;
};
const MiniChart = ({ data, trend }: { data: number[], trend: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    if (data.length <= 1) {
        return <div className="w-20 h-8 flex items-center justify-center"><div className="w-full h-0.5 bg-gray-600"></div></div>;
    }
    return <div className="w-20 h-8 flex items-end space-x-0.5 justify-center">{data.map((value, index) => { const height = range > 0 ? ((value - min) / range) * 100 : 50; return <div key={index} className={`w-1 ${trend === 'up' ? 'bg-green-400' : 'bg-red-400'} opacity-80`} style={{ height: `${Math.max(height, 10)}%` }} /> })}</div>;
};


// ✅ Definimos el tipo para las categorías que usaremos para filtrar
type TabCategory = 'all' | 'blockchain' | 'smart-contract' | 'token' | 'dapp';

const TechMarketCap = () => {
    const { t } = useTranslation('common');
    const [selectedProject, setSelectedProject] = useState<AuditData | null>(null);
    // ✅ 1. Estado para la pestaña activa, empezamos con 'all' (todos)
    const [activeTab, setActiveTab] = useState<TabCategory>('all');

    const handleProjectSelect = (id: string) => {
        const allAudits = getAllAudits();
        const projectToDisplay = allAudits.find(p => p.reportId === id) || null;
        setSelectedProject(projectToDisplay);
    };

    // ✅ 2. Modificamos useMemo para filtrar según la pestaña activa
    const projects = useMemo(() => {
        const allAudits = getAllAudits();
        // Array de categorías para simulación
        const categories: TabCategory[] = ['blockchain', 'smart-contract', 'token', 'dapp'];

        const categorizedAudits = allAudits.map((audit, index) => ({
            ...audit,
            // Asignación de categoría simulada. En un caso real, esta propiedad vendría con los datos.
            category: categories[index % categories.length],
        }));

        const filteredAudits = activeTab === 'all'
            ? categorizedAudits
            : categorizedAudits.filter(audit => audit.category === activeTab);

        return filteredAudits
            .sort((a, b) => b.verdict.score - a.verdict.score)
            .map((audit, index) => {
                const timelineScores = audit.securityTimeline?.map(s => s.score) || [audit.verdict.score];
                const lastScore = timelineScores[timelineScores.length - 1] || 0;
                const prevScore = timelineScores[timelineScores.length - 2] || lastScore;
                const change = lastScore - prevScore;
                const trend = (change >= 0 ? 'up' : 'down') as 'up' | 'down';
                const totalFindings = audit.findingsSummary.critical + audit.findingsSummary.high + audit.findingsSummary.medium + audit.findingsSummary.low;
                return {
                    position: index + 1,
                    name: audit.projectName,
                    score: audit.verdict.score,
                    change: change,
                    reviews: totalFindings,
                    lastAudit: formatDistanceToNow(audit.auditDate),
                    trend: trend,
                    logo: audit.logo,
                    chartData: timelineScores.slice(-8),
                    reportId: audit.reportId,
                    grade: audit.verdict.grade,
                    blockchain: audit.blockchain
                };
            })
            .slice(0, 10);
    }, [activeTab]); // Se recalcula cuando activeTab cambia

    const tabs: { key: TabCategory; label: string }[] = [
        { key: 'all', label: 'Todos' },
        { key: 'blockchain', label: 'Blockchains' },
        { key: 'smart-contract', label: 'Smart Contracts' },
        { key: 'token', label: 'Tokens' },
        { key: 'dapp', label: 'Dapps' },
    ];

    return (
        <section
            id="ranking"
            className="pt-20 relative bg-black"
            style={{
                backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="w-full mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent hero-title">
                            Tech MarketCap Ranking
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explora los proyectos más sólidos en seguridad, innovación y evolución tecnológica
                    </p>
                </div>

                <div className="w-[100vw]">
                    {/* ✅ 3. Cabecera de la tabla con pestañas integradas */}
                    <div className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700 overflow-hidden">
                        <div className="flex px-6 pt-4 space-x-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={cn(
                                        "px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 rounded-t-lg border-b-2 focus:outline-none",
                                        activeTab === tab.key
                                            ? "text-white border-blue-500 bg-gray-800/60"
                                            : "text-gray-400 border-transparent hover:text-white hover:bg-gray-800/30"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-9 gap-4 text-sm font-semibold text-gray-300 uppercase tracking-wider text-center">
                                <div>#</div>
                                <div>Proyecto</div>
                                <div className="hidden md:block">Network</div>
                                <div className="hidden md:block">Grade</div>
                                <div className="hidden md:block">Score</div>
                                <div className="hidden md:block">Gráfica 7d</div>
                                <div className="hidden md:block">Cambio</div>
                                <div className="hidden md:block">Hallazgos</div>
                                <div className="hidden md:block">Última auditoría</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/30 backdrop-blur-lg rounded-b-2xl border-transparent overflow-hidden text-center">
                        {projects.map((project, index) => (
                            <div
                                key={project.reportId} // Usar un ID único como reportId es más seguro que la posición
                                onClick={() => handleProjectSelect(project.reportId)}
                                className={`no-underline grid grid-cols-2 md:grid-cols-9 gap-4 p-6 items-center transition-all hover:bg-gray-800/30 cursor-pointer text-center ${index !== projects.length - 1 ? 'border-b border-gray-800' : ''}`}
                            >
                                {/* ... (El resto del contenido de la fila no cambia) ... */}
                                <div className="flex items-center justify-center">
                                    <Badge variant="outline" className={`text-sm font-bold ${project.position <= 3 ? 'border-yellow-400 text-yellow-400' : 'border-gray-300 text-gray-300'}`}>
                                        {project.position}
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-3 justify-start">
                                    <img src={project.logo} alt={project.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <h3 className="text-white font-semibold text-left text-base md:text-lg">{project.name}</h3>
                                        <p className="text-gray-400 text-sm md:hidden">Score: {project.score}</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <span className="text-gray-300 text-sm">{project.blockchain}</span>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                                        {project.grade}
                                    </span>
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex items-center space-x-2 justify-center">
                                        <span className="text-xl font-bold text-white">{project.score.toFixed(1)}</span>
                                        <div className="w-12 h-2 bg-[#09090B] rounded-full"><div className="h-full bg-gradient-to-r from-blue-600 to-[#55f7ed] rounded-full" style={{ width: `${project.score}%` }}></div></div>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <MiniChart data={project.chartData} trend={project.trend} />
                                </div>
                                <div className="hidden md:flex items-center space-x-1 justify-center">
                                    {project.trend === "up" ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                                    <span className={`font-semibold ${project.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{project.change >= 0 ? '+' : ''}{project.change.toFixed(1)}</span>
                                </div>
                                <div className="hidden md:block">
                                    <span className="text-gray-300">{project.reviews}</span>
                                </div>
                                <div className="hidden md:flex items-center space-x-2 justify-center">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-300 text-sm">{project.lastAudit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedProject && (
                <ProjectDetailView
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default TechMarketCap;