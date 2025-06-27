
import { useState } from 'react';
import { ChevronDown, ExternalLink, Shield, Calendar, DollarSign, MessageCircle, Sparkles, Eye, Share2, TrendingUp, Users, Lock } from 'lucide-react';
import { Button } from '@components/ui/button';
import ProjectDetailView from '@components/ProjectDetailView';

interface AuditProject {
    id: string;
    name: string;
    description: string;
    auditDate: string;
    tvl: string;
    status: 'Completed' | 'In Progress' | 'Pending';
    findings: number;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    blockchain: string;
    contractAddress: string;
    website?: string;
    twitter?: string;
    tokenDetails?: {
        symbol: string;
        totalSupply: string;
        decimals: number;
    };
    auditScope?: string[];
    vulnerabilities?: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
}

const auditedProjects: AuditProject[] = [
    {
        id: '1',
        name: 'Etnia Token',
        description: 'Revolutionary DeFi token with advanced staking mechanisms and cross-chain compatibility for the Etnia ecosystem',
        auditDate: '2024-06-20',
        tvl: '$89.3M',
        status: 'Completed',
        findings: 2,
        severity: 'Medium',
        blockchain: 'Solana',
        contractAddress: '4tozsM5XanbgDqZNB2b4k7XhYgUdfosFMEqdDX5qdrxc',
        website: 'https://etnia.io',
        twitter: 'https://twitter.com/EtniaToken',
        tokenDetails: {
            symbol: 'ETNIA',
            totalSupply: '1,000,000,000',
            decimals: 9
        },
        auditScope: [
            'Token Contract Security Review',
            'Staking Mechanism Analysis',
            'Cross-chain Bridge Assessment',
            'Governance Implementation Review',
            'Economic Model Validation'
        ],
        vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 2,
            low: 3
        }
    },
    {
        id: '2',
        name: 'DeFiVault Protocol',
        description: 'Decentralized lending and borrowing platform with yield farming capabilities',
        auditDate: '2024-06-15',
        tvl: '$45.2M',
        status: 'Completed',
        findings: 3,
        severity: 'Medium',
        blockchain: 'Ethereum',
        contractAddress: '0x742...3f2a1',
        vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 2,
            low: 4
        }
    },
    {
        id: '3',
        name: 'MetaSwap DEX',
        description: 'Automated market maker with advanced trading features and liquidity pools',
        auditDate: '2024-06-10',
        tvl: '$128.7M',
        status: 'Completed',
        findings: 1,
        severity: 'Low',
        blockchain: 'Solana',
        contractAddress: '4tozsM5...qdrxc',
        vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 1,
            low: 2
        }
    },
    {
        id: '4',
        name: 'CryptoVault DAO',
        description: 'Governance token and treasury management system for decentralized organizations',
        auditDate: '2024-06-05',
        tvl: '$67.4M',
        status: 'Completed',
        findings: 5,
        severity: 'High',
        blockchain: 'Polygon',
        contractAddress: '0x891...7c4b2',
        vulnerabilities: {
            critical: 1,
            high: 2,
            medium: 2,
            low: 3
        }
    },
    {
        id: '5',
        name: 'NeoStaking Pool',
        description: 'Multi-chain staking protocol with automatic compound rewards',
        auditDate: '2024-05-28',
        tvl: '$34.8M',
        status: 'Completed',
        findings: 2,
        severity: 'Medium',
        blockchain: 'Binance Smart Chain',
        contractAddress: '0x445...9e8f3',
        vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 2,
            low: 5
        }
    },
    {
        id: '6',
        name: 'AeroLend Protocol',
        description: 'Cross-chain lending protocol with flash loan capabilities',
        auditDate: '2024-05-20',
        tvl: '$89.3M',
        status: 'Completed',
        findings: 4,
        severity: 'Critical',
        blockchain: 'Avalanche',
        contractAddress: '0x123...4a5b6',
        vulnerabilities: {
            critical: 1,
            high: 1,
            medium: 2,
            low: 2
        }
    },
    {
        id: '7',
        name: 'QuantumYield Farm',
        description: 'Innovative yield farming protocol with dynamic APY optimization',
        auditDate: '2024-05-15',
        tvl: '$156.2M',
        status: 'Completed',
        findings: 0,
        severity: 'Low',
        blockchain: 'Ethereum',
        contractAddress: '0x987...6d5e4',
        vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 1
        }
    }
];

const ProjectsSection = () => {
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [selectedProject, setSelectedProject] = useState<AuditProject | null>(null);
    const [showAIAssistant, setShowAIAssistant] = useState(false);

    const displayedProjects = showAllProjects ? auditedProjects : auditedProjects.slice(0, 6);

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
            case 'In Progress': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50';
            case 'Pending': return 'text-orange-400 bg-orange-400/20 border-orange-400/50';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/50';
        }
    };

    const getBlockchainLogo = (blockchain: string) => {
        const logos = {
            'Ethereum': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
            'Solana': 'https://cryptologos.cc/logos/solana-sol-logo.png',
            'Polygon': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
            'Binance Smart Chain': 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
            'Avalanche': 'https://cryptologos.cc/logos/avalanche-avax-logo.png'
        };
        return logos[blockchain] || 'https://cryptologos.cc/logos/ethereum-eth-logo.png';
    };

    return (
        <section
            id="projects"
            className="py-20 relative min-h-screen"
            style={{
                backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('https://i.imgur.com/Dh0HH3H.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent animate-pulse-neon">
                        Audited Projects
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
                        Explore our comprehensive security audits across various blockchain ecosystems.
                        Each project has been thoroughly analyzed for vulnerabilities and security risks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="relative group cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Background Cards for Stacking Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-2xl transform rotate-2 scale-105 opacity-30 group-hover:rotate-3 transition-all duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/15 to-neon-purple/15 rounded-2xl transform -rotate-1 scale-102 opacity-50 group-hover:-rotate-2 transition-all duration-500"></div>

                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-cyber-dark/95 to-cyber-darker/95 backdrop-blur-xl border border-neon-purple/30 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:border-neon-purple/60 hover:shadow-2xl hover:shadow-neon-purple/20 group-hover:rotate-0">

                                {/* Header with Status */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={getBlockchainLogo(project.blockchain)}
                                            alt={project.blockchain}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <h3 className="text-lg font-bold text-white truncate">{project.name}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)} animate-pulse`}>
                                        {project.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 mb-4 text-sm line-clamp-2 leading-relaxed">{project.description}</p>

                                {/* Stats Grid */}
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
                                            {project.findings} {project.severity}
                                        </span>
                                    </div>
                                </div>

                                {/* Blockchain & Date */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400 text-sm flex items-center">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(project.auditDate).toLocaleDateString()}
                                    </span>
                                    <span className="text-neon-purple text-sm font-medium bg-neon-purple/10 px-2 py-1 rounded-lg">
                                        {project.blockchain}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <Button
                                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white text-xs px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                                        size="sm"
                                    >
                                        <Eye className="h-3 w-3 mr-1" />
                                        View Details
                                    </Button>

                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-400 hover:text-neon-purple p-2 rounded-lg hover:bg-neon-purple/10"
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-400 hover:text-neon-green p-2 rounded-lg hover:bg-neon-green/10"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        onClick={() => setShowAllProjects(!showAllProjects)}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple transition-all duration-300 text-white px-8 py-3 animate-gradient hover:scale-110 transform shadow-lg shadow-neon-purple/30"
                    >
                        <ChevronDown className={`h-5 w-5 mr-2 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} />
                        {showAllProjects ? 'Show Less' : 'Show All Projects'}
                    </Button>
                </div>

                {/* Enhanced AI Assistant Floating Button */}
                <div className="fixed bottom-6 right-6 z-40">
                    <Button
                        onClick={() => setShowAIAssistant(!showAIAssistant)}
                        className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple transition-all duration-300 text-white rounded-full w-16 h-16 shadow-2xl shadow-neon-purple/50 animate-float hover:scale-110 transform relative"
                    >
                        <MessageCircle className="h-6 w-6" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse border-2 border-cyber-dark"></div>
                    </Button>

                    {showAIAssistant && (
                        <div className="absolute bottom-20 right-0 w-80 bg-gradient-to-br from-cyber-dark/95 to-cyber-darker/95 backdrop-blur-xl border border-neon-purple/50 rounded-2xl p-6 shadow-2xl shadow-neon-purple/30 animate-scale-in">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center mr-3">
                                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                                </div>
                                <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                                <Button
                                    onClick={() => setShowAIAssistant(false)}
                                    className="ml-auto text-gray-400 hover:text-white p-1 h-auto"
                                    variant="ghost"
                                >
                                    ×
                                </Button>
                            </div>
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                Hi! I'm your smart audit assistant. I can help you understand our security reports,
                                explain vulnerabilities, or guide you through our audit process.
                            </p>
                            <div className="space-y-2">
                                <Button className="w-full text-left justify-start bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 hover:from-neon-purple/30 hover:to-neon-blue/30 text-white text-sm py-2 border border-neon-purple/30 rounded-lg transition-all duration-300">
                                    🔍 Explain audit findings
                                </Button>
                                <Button className="w-full text-left justify-start bg-gradient-to-r from-neon-blue/20 to-neon-green/20 hover:from-neon-blue/30 hover:to-neon-green/30 text-white text-sm py-2 border border-neon-blue/30 rounded-lg transition-all duration-300">
                                    📊 Compare security scores
                                </Button>
                                <Button className="w-full text-left justify-start bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 hover:from-neon-green/30 hover:to-neon-cyan/30 text-white text-sm py-2 border border-neon-green/30 rounded-lg transition-all duration-300">
                                    🛡️ Security recommendations
                                </Button>
                                <Button className="w-full text-left justify-start bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 hover:from-neon-pink/30 hover:to-neon-purple/30 text-white text-sm py-2 border border-neon-pink/30 rounded-lg transition-all duration-300">
                                    💬 Ask anything else
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Project Detail View */}
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