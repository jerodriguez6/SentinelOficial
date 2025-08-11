import React, { useMemo, useState, useEffect } from "react";
import { Badge } from "@components/Badge";
import { TrendingUp, TrendingDown, Clock, Star } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { getAllAudits, AuditData } from "../lib/audit-data";
import { cn } from "lib/utils";
import dynamic from "next/dynamic";

const ProjectDetailView = dynamic(() => import("@components/ProjectDetailView"), { ssr: false });

// Funciones auxiliares
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

const MiniChart = ({ data, trend }: { data: number[]; trend: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1; // Evitar división por cero
  if (data.length <= 1) {
    return <div className="w-16 h-4 flex items-center justify-center"><div className="w-full h-0.5 bg-gray-600"></div></div>;
  }
  return (
    <div className="w-16 h-4 flex items-end space-x-px justify-center">
      {data.map((value, index) => {
        const height = ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className={`w-px ${trend === "up" ? "bg-green-500" : "bg-red-500"} rounded-sm transition-all duration-200`}
            style={{ height: `${Math.max(height, 10)}%` }}
          />
        );
      })}
    </div>
  );
};

// Definimos el tipo para las categorías
type TabCategory = "all" | "blockchain" | "smart-contract" | "token" | "dapp";

const TechMarketCap = () => {
  const { t } = useTranslation("common");
  const [selectedProject, setSelectedProject] = useState<AuditData | null>(null);
  const [activeTab, setActiveTab] = useState<TabCategory>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectSelect = (id: string) => {
    const allAudits = getAllAudits();
    const projectToDisplay = allAudits.find((p) => p.reportId === id) || null;
    setSelectedProject(projectToDisplay);
  };

  const toggleFavorite = (reportId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(reportId)) {
        newFavorites.delete(reportId);
      } else {
        newFavorites.add(reportId);
      }
      return newFavorites;
    });
  };

  const projects = useMemo(() => {
    const allAudits = getAllAudits();
    const categories: TabCategory[] = ["blockchain", "smart-contract", "token", "dapp"];

    const categorizedAudits = allAudits.map((audit, index) => ({
      ...audit,
      category: categories[index % categories.length],
    }));

    const filteredAudits = activeTab === "all"
      ? categorizedAudits
      : categorizedAudits.filter((audit) => audit.category === activeTab);

    return filteredAudits
      .sort((a, b) => b.verdict.score - a.verdict.score)
      .map((audit, index) => {
        const timelineScores = audit.securityTimeline?.map((s) => s.score) || [audit.verdict.score];
        const lastScore = timelineScores[timelineScores.length - 1] || 0;
        const prevScore = timelineScores[timelineScores.length - 2] || lastScore;
        const change = lastScore - prevScore;
        const trend = (change >= 0 ? "up" : "down") as "up" | "down";
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
          blockchain: audit.blockchain,
        };
      })
      .slice(0, 10);
  }, [activeTab]);

  const tabs: { key: TabCategory; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "blockchain", label: "Blockchains" },
    { key: "smart-contract", label: "Smart Contracts" },
    { key: "token", label: "Tokens" },
    { key: "dapp", label: "Dapps" },
  ];

  return (
    <section
      id="ranking"
      className="pt-20 relative bg-black"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Zen Dots, sans-serif", fontSize: "50px" }}>
            <span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
              Tech MarketCap Ranking
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora los proyectos más sólidos en seguridad, innovación y evolución tecnológica
          </p>
        </div>

        {/* Contenedor principal con scroll horizontal */}
        <div className="overflow-x-auto min-h-screen">
          <div className="w-full min-w-[1200px]">
            {/* Sección fija al hacer scroll */}
            <div className="sticky top-0 z-40 bg-[#202531] backdrop-blur-lg border-b border-gray-700 transition-all duration-300">
              {/* Tabs */}
              <div className="flex px-4 py-3 space-x-1 bg-[#202531] overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md",
                      activeTab === tab.key
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Encabezados de tabla */}
              <div className="grid grid-cols-[40px_2fr_1fr_80px_120px_80px_80px_80px_120px] gap-4 px-4 py-3 text-xs font-semibold text-white uppercase tracking-wider bg-[#202531] border-b border-gray-700">
                <div>#</div>
                <div>Proyecto</div>
                <div>Network</div>
                <div>Grade</div>
                <div>Score</div>
                <div>Gráfica 7d</div>
                <div>Cambio</div>
                <div>Hallazgos</div>
                <div>Última auditoría</div>
              </div>
            </div>

            {/* Lista de proyectos */}
            <div className="bg-gray-900/30 backdrop-blur-lg rounded-b-lg overflow-hidden border border-gray-800">
              {projects.map((project, index) => (
                <div
                  key={project.reportId}
                  onClick={() => handleProjectSelect(project.reportId)}
                  className={cn(
                    "cursor-pointer hover:bg-gray-800/30 transition-colors duration-200",
                    index !== projects.length - 1 && "border-b border-gray-800"
                  )}
                >
                  <div className="grid grid-cols-[40px_2fr_1fr_80px_120px_80px_80px_80px_120px] gap-4 p-4 items-center text-sm w-full">
                    <div className="flex items-center space-x-2">
                      <Star
                        className={`w-4 h-4 ${favorites.has(project.reportId) ? "text-yellow-400" : "text-gray-500"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.reportId);
                        }}
                      />
                      <span className="text-white font-bold">{project.position}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <img src={project.logo} alt={project.name} className="w-6 h-6 rounded-full" />
                      <h3 className="text-white font-semibold">{project.name}</h3>
                    </div>
                    <div className="text-gray-300">{project.blockchain}</div>
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                      {project.grade}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">{project.score.toFixed(1)}</span>
                      <div className="w-12 h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-[#55f7ed] rounded-full"
                          style={{ width: `${Math.min(project.score, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <MiniChart data={project.chartData} trend={project.trend} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {project.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`font-semibold ${project.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {project.change >= 0 ? "+" : ""}{project.change.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-300">{project.reviews}</span>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{project.lastAudit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 mb-8">
              <Link
                href="/audits"
                className="inline-flex items-center px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-400 to-[#55f7ed] hover:from-blue-500 hover:to-[#66ffcc] transition-all duration-300"
              >
                Ver todos los reportes
              </Link>
            </div>
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