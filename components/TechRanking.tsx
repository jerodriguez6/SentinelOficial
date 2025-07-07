// components/TechRanking.tsx
import React, { useMemo } from "react";
import { Badge } from "@components/Badge";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { getAllAudits, AuditData } from '../lib/audit-data';
import { cn } from "lib/utils";

// ... (El resto del código que no cambia: formatDistanceToNow, MiniChart)
const formatDistanceToNow = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `hace ${Math.floor(interval)} años`;
    interval = seconds / 2592000;
    if (interval > 1) return `hace ${Math.floor(interval)} meses`;
    interval = seconds / 86400;
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
    return <div className="w-20 h-8 flex items-end space-x-0.5">{data.map((value, index) => { const height = range > 0 ? ((value - min) / range) * 100 : 50; return <div key={index} className={`w-1 ${trend === 'up' ? 'bg-green-400' : 'bg-red-400'} opacity-80`} style={{ height: `${Math.max(height, 10)}%` }} /> })}</div>;
};


const TechRanking = () => {
    const { t } = useTranslation('common');

    const projects = useMemo(() => {
        const allAudits = getAllAudits();
        return allAudits
            .sort((a, b) => b.verdict.score - a.verdict.score)
            .map((audit, index) => {
                const timelineScores = audit.securityTimeline?.map(s => s.score) || [audit.verdict.score];
                const lastScore = timelineScores[timelineScores.length - 1] || 0;
                const prevScore = timelineScores[timelineScores.length - 2] || lastScore;
                const change = lastScore - prevScore;
                const trend = change >= 0 ? 'up' : 'down';
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
                };
            })
            .slice(0, 10);
    }, []);

    return (
        <section id="ranking" className="py-20 relative bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            {t('TechMarketCap')}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explora los proyectos más sólidos en seguridad, innovación y evolución tecnológica
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Table Header */}
                    <div className="bg-gray-900/50 backdrop-blur-lg   border-gray-800 p-6">
                        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                            <div>#</div>
                            <div>Proyecto</div>
                            <div className="hidden md:block">Score</div>
                            <div className="hidden md:block">Gráfica 7d</div>
                            <div className="hidden md:block">Cambio</div>
                            <div className="hidden md:block">Hallazgos</div>
                            <div className="hidden md:block">Última auditoría</div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="bg-gray-900/30 backdrop-blur-lg rounded-b-2xl border-transparent overflow-hidden">
                        {projects.map((project, index) => (
                            <Link
                                href={`/cert/${project.reportId}`}
                                key={project.position}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`no-underline grid grid-cols-2 md:grid-cols-7 gap-4 p-6 items-center transition-all hover:bg-gray-800/30 cursor-pointer ${index !== projects.length - 1 ? 'border-b border-gray-800' : ''}`}
                            >
                                {/* Position */}
                                <div className="flex items-center">
                                    <Badge
                                        variant="outline"
                                        className={`text-sm font-bold ${project.position <= 3
                                            ? 'border-yellow-500/50 text-yellow-400'
                                            : 'border-gray-500/50 text-gray-300'
                                            }`}
                                    >
                                        {project.position}
                                    </Badge>
                                </div>

                                {/* Project Name */}
                                <div className="flex items-center space-x-3">
                                    <img src={project.logo} alt={project.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <h3 className="text-white font-semibold text-[1.4rem]">{project.name}</h3>
                                        <p className="text-gray-400 text-sm md:hidden">Score: {project.score}</p>
                                    </div>
                                </div>

                                {/* ... (resto de columnas sin cambios) ... */}
                                <div className="hidden md:block">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl font-bold text-white">{project.score.toFixed(1)}</span>
                                        <div className="w-12 h-2 bg-gray-700 rounded-full"><div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: `${project.score}%` }}></div></div>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <MiniChart data={project.chartData} trend={project.trend} />
                                </div>
                                <div className="hidden md:flex items-center space-x-1">
                                    {project.trend === "up" ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                                    <span className={`font-semibold ${project.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{project.change >= 0 ? '+' : ''}{project.change.toFixed(1)}</span>
                                </div>
                                <div className="hidden md:block">
                                    <span className="text-gray-300">{project.reviews}</span>
                                </div>
                                <div className="hidden md:flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-300 text-sm">{project.lastAudit}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-8">
                        <Link
                            href="/audits"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
                        >
                            Ver todos los reportes
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechRanking;