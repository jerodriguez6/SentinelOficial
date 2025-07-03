import { useState } from 'react';
import { ChevronDown, ExternalLink, Shield, Calendar, Eye, Share2, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@components/ui/button';
import ProjectDetailView from '@components/ProjectDetailView'; // Asegúrate que la ruta sea correcta

// PASO 1: IMPORTAR NUESTROS DATOS Y TIPOS
import { getAllAudits, AuditData } from 'lib/audit-data'; // Ajusta la ruta

// Interfaz para las tarjetas de previsualización
interface AuditProjectCard {
    id: string;
    name: string;
    description: string;
    auditDate: string;
    tvl: string;
    status: 'Completed' | 'In Progress' | 'Pending';
    findings: number;
    severity: 'Low' | 'Medium' | 'High' | 'Critical' | 'N/A';
    blockchain: string;
}

// Función auxiliar para obtener la severidad más alta
const getHighestSeverity = (summary: AuditData['findingsSummary']): AuditProjectCard['severity'] => {
    if (summary.critical > 0) return 'Critical';
    if (summary.high > 0) return 'High';
    if (summary.medium > 0) return 'Medium';
    if (summary.low > 0) return 'Low';
    return 'N/A';
};

// Obtenemos todos los datos detallados una sola vez
const allDetailedAudits = getAllAudits();

// Creamos los datos para las tarjetas a partir de los datos detallados
const auditProjectCards: AuditProjectCard[] = allDetailedAudits.map((audit) => ({
    id: audit.reportId,
    name: audit.projectName,
    description: audit.description,
    auditDate: audit.releaseDate,
    tvl: audit.tvl,
    status: audit.status,
    findings: audit.findingsSummary.critical + audit.findingsSummary.high + audit.findingsSummary.medium + audit.findingsSummary.low,
    severity: getHighestSeverity(audit.findingsSummary),
    blockchain: audit.blockchain,
    logo: audit.logo,
}));


const ProjectsSection = () => {
    const [showAllProjects, setShowAllProjects] = useState(false);
    // El estado almacenará el objeto de datos COMPLETO (AuditData) para el modal
    const [selectedProject, setSelectedProject] = useState<AuditData | null>(null);

    const displayedProjects = showAllProjects ? auditProjectCards : auditProjectCards.slice(0, 6);

    // Función para manejar el clic y seleccionar el proyecto detallado
    const handleProjectSelect = (id: string) => {
        const projectToDisplay = allDetailedAudits.find(p => p.reportId === id) || null;
        setSelectedProject(projectToDisplay);
    };

    // Funciones de estilo (sin cambios)
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'text-red-400 border-red-400 bg-red-400/10';
            case 'High': return 'text-orange-400 border-orange-400 bg-orange-400/10';
            case 'Medium': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
            case 'Low': return 'text-green-400 border-green-400 bg-green-400/10';
            default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
        }
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'text-green-400 bg-green-400/20 border-green-400/50';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/50';
        }
    };
    const getBlockchainLogo = (blockchain: string) => {
        const logos: { [key: string]: string } = {
            'Ethereum Mainnet': '/ethereum.png',
            'Ethereum': '/ethereum.png',
            'Solana': '/solana.webp',
            'Polygon': '/polygon.png',
            'BNB Smart Chain': '/bnb.png',
            'Avalanche': '/avalanche.png',
            'Arbitrum One': '/arbitrum.png',
            'Aethelred Mainnet (EVM)': '/aethelred.png',
            'Ethereum Fork (Geth)': '/ethereum.png'
        };
        return logos[blockchain] || '/ethereum.png';
    };

    return (
        <section
            id="projects"
            className="py-20 relative min-h-screen"
            style={{
                backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('https://img.freepik.com/free-vector/abstract-red-neon-arrow-light-glow-background_107791-28871.jpg?semt=ais_items_boosted&w=740')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="h-24"></div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-white animate-pulse-neon">
                        Audited Projects
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
                        Explore our comprehensive security audits across various blockchain ecosystems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="relative group cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => handleProjectSelect(project.id)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-2xl transform rotate-2 scale-105 opacity-30 group-hover:rotate-3 transition-all duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/15 to-neon-purple/15 rounded-2xl transform -rotate-1 scale-102 opacity-50 group-hover:-rotate-2 transition-all duration-500"></div>
                            <div className="relative bg-gradient-to-br from-cyber-dark/95 to-cyber-darker/95 backdrop-blur-xl border border-neon-purple/30 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:border-neon-purple/60 hover:shadow-2xl hover:shadow-neon-purple/20 group-hover:rotate-0">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative w-8 h-8 flex-shrink-0">
                                            <img src={project.logo} alt={`${project.blockchain} logo`} layout="fill" objectFit="contain" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white truncate">{project.name}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)} animate-pulse`}>
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-gray-300 mb-4 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-neon-purple/10 rounded-xl p-3 border border-neon-purple/20">
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="h-4 w-4 text-neon-green" />
                                            <span className="text-gray-400 text-xs">TVL</span>
                                        </div>
                                        <span className="text-neon-green text-lg font-bold animate-pulse">{project.tvl}</span>
                                    </div>
                                    <div className="bg-neon-blue/10 rounded-xl p-3 border border-neon-blue/20">
                                        <div className="flex items-center space-x-2">
                                            <Shield className="h-4 w-4 text-neon-blue" />
                                            <span className="text-gray-400 text-xs">Security</span>
                                        </div>
                                        <span className={`text-xs font-bold border px-2 py-1 rounded-full ${getSeverityColor(project.severity)}`}>
                                            {project.findings} Findings ({project.severity})
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400 text-sm flex items-center">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {project.auditDate}
                                    </span>
                                    <span className="text-neon-purple text-sm font-medium bg-neon-purple/10 px-2 py-1 rounded-lg">
                                        {project.blockchain}
                                    </span>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white text-xs px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    <Eye className="h-3 w-3 mr-1" />
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button onClick={() => setShowAllProjects(!showAllProjects)} className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple transition-all duration-300 text-white px-8 py-3 animate-gradient hover:scale-110 transform shadow-lg shadow-neon-purple/30">
                        <ChevronDown className={`h-5 w-5 mr-2 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} />
                        {showAllProjects ? 'Show Less' : 'Show All Projects'}
                    </Button>
                </div>

                {/* AI Assistant (sin cambios) */}

                {/* La llamada a ProjectDetailView ahora es correcta y segura en tipos */}
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

export default ProjectsSection;