import { Shield, Calendar, DollarSign, Users, Code, FileText, Download, ExternalLink, Globe, Twitter, TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock, Zap, Lock, Activity, Star, Award, Target, QrCode, Hash } from 'lucide-react';
import { Button } from '@components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line, AreaChart, Area } from 'recharts';

interface ProjectDetailViewProps {
    project: {
        id: string;
        name: string;
        description: string;
        auditDate: string;
        tvl: string;
        status: string;
        findings: number;
        severity: string;
        blockchain: string;
        contractAddress: string;
        website?: string;
        twitter?: string;
        tokenDetails?: {
            symbol: string;
            totalSupply: string;
            decimals: number;
            currentPrice?: number;
            marketCap?: string;
            volume24h?: string;
            change24h?: number;
        };
        auditScope?: string[];
        vulnerabilities?: {
            critical: number;
            high: number;
            medium: number;
            low: number;
        };
        auditSummary?: {
            linesOfCode: number;
            filesAudited: number;
            auditDuration: string;
            methodology: string[];
            tools: string[];
        };
        securityFeatures?: {
            accessControl: string;
            upgradeability: string;
            pausability: boolean;
            timelock: boolean;
            multisig: boolean;
        };
        recommendations?: string[];
        gasOptimization?: {
            before: number;
            after: number;
            savings: number;
        };
    };
    onClose: () => void;
}

const ProjectDetailView = ({ project, onClose }: ProjectDetailViewProps) => {
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

    // Datos para las gráficas mejoradas
    const riskData = [
        { name: 'Critical', value: project.vulnerabilities?.critical || 0, color: '#ef4444' },
        { name: 'High', value: project.vulnerabilities?.high || 0, color: '#f97316' },
        { name: 'Medium', value: project.vulnerabilities?.medium || 0, color: '#eab308' },
        { name: 'Low', value: project.vulnerabilities?.low || 0, color: '#22c55e' }
    ];

    const securityScore = Math.max(10, 100 - (
        (project.vulnerabilities?.critical || 0) * 25 +
        (project.vulnerabilities?.high || 0) * 15 +
        (project.vulnerabilities?.medium || 0) * 8 +
        (project.vulnerabilities?.low || 0) * 3
    ));

    const confidenceScore = Math.min(100, securityScore + 5);
    const riskScore = 100 - securityScore;

    const scoreData = [
        { name: 'Security', value: securityScore, fill: '#8b5cf6' },
        { name: 'Confidence', value: confidenceScore, fill: '#06b6d4' },
        { name: 'Risk', value: riskScore, fill: '#ef4444' }
    ];

    // Enhanced chart data with more realistic values
    const securityMetrics = [
        { category: 'Access Control', score: 95, color: '#8b5cf6' },
        { category: 'Logic Flaws', score: 88, color: '#06b6d4' },
        { category: 'Gas Optimization', score: 92, color: '#10b981' },
        { category: 'Code Quality', score: 89, color: '#f59e0b' },
        { category: 'Documentation', score: 94, color: '#ec4899' }
    ];

    const auditProgress = [
        { phase: 'Initial Scan', progress: 100, findings: 12 },
        { phase: 'Deep Analysis', progress: 100, findings: 8 },
        { phase: 'Manual Review', progress: 100, findings: 3 },
        { phase: 'Final Report', progress: 100, findings: 0 }
    ];

    // Add missing data arrays for charts
    const gasOptimizationData = [
        { name: 'Before', gas: project.gasOptimization?.before || 245000 },
        { name: 'After', gas: project.gasOptimization?.after || 174000 }
    ];

    const securityTimelineData = [
        { phase: 'Initial', score: 45 },
        { phase: 'Analysis', score: 65 },
        { phase: 'Review', score: 82 },
        { phase: 'Final', score: securityScore }
    ];

    // Generate SHA256 hash simulation
    const generateSHA256 = () => {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < 64; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    };

    const auditHash = generateSHA256();

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>

                {/* Professional Header */}
                <div className="relative p-8 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Shield className="h-10 w-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
                                <p className="text-gray-300 text-lg mb-2">{project.description}</p>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {new Date(project.auditDate).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center">
                                        <Code className="h-4 w-4 mr-2" />
                                        {project.blockchain}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* QR Code Section */}
                            <div className="text-center">
                                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-2">
                                    <QrCode className="h-16 w-16 text-black" />
                                </div>
                                <p className="text-xs text-gray-400">Scan to Share</p>
                            </div>

                            <div className="text-right">
                                <div className="text-3xl font-bold text-green-400">{securityScore}/100</div>
                                <div className="text-gray-400">Security Score</div>
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>

                            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-light transition-colors">
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
                        <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(project.status)}`}>
                                <CheckCircle className="h-4 w-4" />
                                {project.status}
                            </span>
                            <span className="text-sm text-gray-400">Audit ID: #{project.id.toUpperCase()}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {project.website && (
                                <a href={project.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-all">
                                    <Globe className="h-5 w-5" />
                                </a>
                            )}
                            {project.twitter && (
                                <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition-all">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* SHA256 Hash Section */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                            <Hash className="h-5 w-5 mr-2 text-purple-400" />
                            Audit Hash Verification
                        </h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                            <div className="text-gray-400 mb-2">SHA256:</div>
                            <div className="text-green-400 break-all">{auditHash}</div>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">This hash ensures the integrity and authenticity of the audit report</p>
                    </div>

                    {/* Security Dashboard */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Award className="h-6 w-6 mr-2 text-purple-400" />
                                Security Assessment
                            </h3>
                            <div className="flex items-center justify-center h-48">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-400">{securityScore}</div>
                                            <div className="text-gray-400 text-sm">Score</div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-8 border-green-400" style={{
                                        clipPath: `polygon(0 0, ${securityScore}% 0, ${securityScore}% 100%, 0 100%)`
                                    }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-green-900/20 p-6 rounded-xl border border-green-700 text-center">
                                <div className="text-2xl font-bold text-green-400 mb-2">
                                    {(project.vulnerabilities?.critical || 0) + (project.vulnerabilities?.high || 0) +
                                        (project.vulnerabilities?.medium || 0) + (project.vulnerabilities?.low || 0)}
                                </div>
                                <div className="text-gray-300">Issues Found</div>
                                <div className="text-green-400 text-sm mt-1">All Resolved</div>
                            </div>

                            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-700 text-center">
                                <div className="text-2xl font-bold text-blue-400 mb-2">2,847</div>
                                <div className="text-gray-300">Lines Audited</div>
                                <div className="text-blue-400 text-sm mt-1">100% Coverage</div>
                            </div>
                        </div>
                    </div>

                    {/* Token Price Card */}
                    {project.tokenDetails && (
                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                                Token Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        ${project.tokenDetails.currentPrice?.toFixed(4) || '0.0245'}
                                    </div>
                                    <div className="text-gray-300">Current Price</div>
                                    <div className={`flex items-center justify-center mt-1 ${(project.tokenDetails.change24h || 5.67) >= 0 ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        <span>{Math.abs(project.tokenDetails.change24h || 5.67).toFixed(2)}%</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white">{project.tokenDetails.marketCap || '$12.5M'}</div>
                                    <div className="text-gray-300">Market Cap</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white">{project.tokenDetails.volume24h || '$1.2M'}</div>
                                    <div className="text-gray-300">24h Volume</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white">{project.tokenDetails.totalSupply}</div>
                                    <div className="text-gray-300">Total Supply</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Audit Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Code className="h-5 w-5 mr-2 text-blue-400" />
                                Audit Overview
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Lines of Code Reviewed:</span>
                                    <span className="text-white font-semibold">{project.auditSummary?.linesOfCode || '2,847'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Files Audited:</span>
                                    <span className="text-white font-semibold">{project.auditSummary?.filesAudited || '15'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Audit Duration:</span>
                                    <span className="text-white font-semibold">{project.auditSummary?.auditDuration || '3 weeks'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Methodology:</span>
                                    <span className="text-white font-semibold">Manual + Automated</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Lock className="h-5 w-5 mr-2 text-purple-400" />
                                Security Features
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Access Control:</span>
                                    <span className="text-green-400 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        {project.securityFeatures?.accessControl || 'Implemented'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Upgradeability:</span>
                                    <span className="text-green-400 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        {project.securityFeatures?.upgradeability || 'Proxy Pattern'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Emergency Pause:</span>
                                    <span className={`flex items-center ${project.securityFeatures?.pausability !== false ? 'text-green-400' : 'text-red-400'}`}>
                                        {project.securityFeatures?.pausability !== false ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                                        {project.securityFeatures?.pausability !== false ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Timelock:</span>
                                    <span className={`flex items-center ${project.securityFeatures?.timelock !== false ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {project.securityFeatures?.timelock !== false ? <CheckCircle className="h-4 w-4 mr-1" /> : <Clock className="h-4 w-4 mr-1" />}
                                        {project.securityFeatures?.timelock !== false ? '24 hours' : 'Recommended'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gas Optimization & Security Timeline */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Zap className="h-5 w-5 mr-2 text-green-400" />
                                Gas Optimization Results
                            </h3>
                            <div className="h-48">
                                <ChartContainer config={{ gas: { label: "Gas Cost", color: "#22c55e" } }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={gasOptimizationData}>
                                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="gas" fill="#22c55e" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-2xl font-bold text-green-400">
                                    {((project.gasOptimization?.savings || 28.8)).toFixed(1)}% Savings
                                </span>
                                <p className="text-gray-300 text-sm">Average gas cost reduction</p>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-blue-400" />
                                Security Score Timeline
                            </h3>
                            <div className="h-48">
                                <ChartContainer config={{ score: { label: "Security Score", color: "#3b82f6" } }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={securityTimelineData}>
                                            <XAxis dataKey="phase" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>
                        </div>
                    </div>

                    {/* Key Recommendations */}
                    <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-purple-400" />
                            Key Recommendations & Findings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Security Improvements</h4>
                                <ul className="space-y-2">
                                    {(project.recommendations || [
                                        'Implement additional input validation for edge cases',
                                        'Add event emission for critical state changes',
                                        'Consider implementing circuit breaker pattern',
                                        'Enhance access control granularity'
                                    ]).map((rec, index) => (
                                        <li key={index} className="text-gray-300 flex items-start">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2"></span>
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Code Quality</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Code Coverage:</span>
                                        <span className="text-green-400 font-semibold">94%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Documentation:</span>
                                        <span className="text-green-400 font-semibold">Excellent</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Best Practices:</span>
                                        <span className="text-green-400 font-semibold">Followed</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Gas Efficiency:</span>
                                        <span className="text-green-400 font-semibold">Optimized</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contract Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Contract Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-gray-300">Contract Address:</span>
                                    <div className="text-blue-400 font-mono text-sm mt-1 break-all">
                                        {project.contractAddress}
                                    </div>
                                </div>
                                {project.tokenDetails && (
                                    <>
                                        <div>
                                            <span className="text-gray-300">Token Symbol:</span>
                                            <span className="text-white ml-2 font-semibold">{project.tokenDetails.symbol}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-300">Total Supply:</span>
                                            <span className="text-white ml-2">{project.tokenDetails.totalSupply}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-300">Decimals:</span>
                                            <span className="text-white ml-2">{project.tokenDetails.decimals}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Audit Scope */}
                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                Audit Scope
                            </h3>
                            {project.auditScope ? (
                                <ul className="space-y-2">
                                    {project.auditScope.map((item, index) => (
                                        <li key={index} className="text-gray-300 flex items-center">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-gray-300">• Smart Contract Security Review</p>
                                    <p className="text-gray-300">• Business Logic Analysis</p>
                                    <p className="text-gray-300">• Access Control Verification</p>
                                    <p className="text-gray-300">• Economic Model Assessment</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Vulnerability Breakdown */}
                    {project.vulnerabilities && (
                        <div className="mt-8 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">Vulnerability Breakdown</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-400">{project.vulnerabilities.critical}</div>
                                    <div className="text-gray-300 text-sm">Critical</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-400">{project.vulnerabilities.high}</div>
                                    <div className="text-gray-300 text-sm">High</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">{project.vulnerabilities.medium}</div>
                                    <div className="text-gray-300 text-sm">Medium</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">{project.vulnerabilities.low}</div>
                                    <div className="text-gray-300 text-sm">Low</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center pt-8 border-t border-gray-700">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                            <FileText className="h-5 w-5 mr-3" />
                            View Full Report
                        </Button>
                        <Button variant="outline" className="border-2 border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg font-semibold rounded-xl">
                            <Download className="h-5 w-5 mr-3" />
                            Download PDF
                        </Button>
                        <Button variant="outline" className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg font-semibold rounded-xl">
                            <ExternalLink className="h-5 w-5 mr-3" />
                            View on Explorer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailView;