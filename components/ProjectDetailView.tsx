import { Shield, Calendar, Code, FileText, Download, ExternalLink, Globe, Twitter, AlertTriangle, CheckCircle, XCircle, Clock, Zap, Lock, Activity, Star, Award, Hash, Users } from 'lucide-react';
import { Button } from '@components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import Link from 'next/link';
import { AuditData } from 'lib/types'; // Asegúrate de importar la interfaz

interface ProjectDetailViewProps {
    project: AuditData;
    onClose: () => void;
}

const ProjectDetailView = ({ project, onClose }: ProjectDetailViewProps) => {

    const {
        verdict,
        auditHash,
        recommendations,
        codeQuality,
        gasOptimization,
        securityTimeline,
        auditSummary,
        securityFeatures,
        vulnerabilities
    } = project;

    const securityScore = verdict.score;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'text-green-400 bg-green-400/20 border-green-400/50';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/50';
        }
    };

    const gasData = gasOptimization ? [
        { name: 'Before', gas: gasOptimization.before },
        { name: 'After', gas: gasOptimization.after }
    ] : [];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="backdrop-blur-2xl bg-[#09090B]/70 border border-[#09090B] rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backdropFilter: 'blur(24px)',
                    backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* --- Header --- */}
                <header className="relative p-8 border-b border-gray-700">
                    {/* ... (código del header sin cambios, ya era dinámico) ... */}
                </header>

                <main className="p-8 space-y-8" >
                    {/* --- Audit Hash --- */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700" >
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center"><Hash className="h-5 w-5 mr-2 text-purple-400" />Audit Hash Verification</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                            <div className="text-gray-400 mb-2">SHA256:</div>
                            <div className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent break-all">{auditHash}</div>
                        </div>
                    </div>

                    {/* --- Security Dashboard --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-gray-800/30 p-6 rounded-xl border border-gray-700 text-center">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center"><Award className="h-6 w-6 mr-2 text-purple-400" />Security Assessment</h3>
                            <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                                {verdict.grade}
                            </span>
                            <div className="text-xl font-bold text-white mt-2">{verdict.title}</div>
                            <p className="text-gray-400 mt-2 max-w-md mx-auto">{verdict.summary}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-red-900/20 p-6 rounded-xl border border-red-700 text-center">
                                <div className="text-2xl font-bold text-red-400 mb-2">{project.findings}</div>
                                <div className="text-gray-300">Total Issues Found</div>
                            </div>
                            {auditSummary && (
                                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-700 text-center">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">{auditSummary.linesOfCode.toLocaleString()}</div>
                                    <div className="text-gray-300">Lines Audited</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Gas & Security Timeline --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {gasOptimization && (
                            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Zap className="h-5 w-5 mr-2 text-green-400" />Gas Optimization</h3>
                                <div className="h-50">
                                    <ChartContainer config={{ gas: { label: "Gas Cost", color: "#22c55e" } }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={gasData}>
                                                {/* Definimos el degradado */}
                                                <defs>
                                                    <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                                                        <stop offset="0%" stopColor="#60a5fa" /> {/* blue-400 */}
                                                        <stop offset="100%" stopColor="#55f7ed" />
                                                    </linearGradient>
                                                </defs>

                                                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                                <ChartTooltip content={<ChartTooltipContent payload={undefined} />} />

                                                {/* Aplicamos el degradado a las barras */}
                                                <Bar dataKey="gas" fill="url(#barGradient)" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </div>
                            </div>
                        )}
                        {securityTimeline && (
                            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Activity className="h-5 w-5 mr-2 text-blue-400" />Security Score Timeline</h3>
                                <div className="h-50">
                                    <ChartContainer config={{ score: { label: "Security Score", color: "#3b82f6" } }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={securityTimeline}>
                                                <XAxis dataKey="phase" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                                <ChartTooltip content={<ChartTooltipContent payload={undefined} />} />
                                                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- Recommendations & Code Quality --- */}
                    {(recommendations || codeQuality) &&
                        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center"><AlertTriangle className="h-5 w-5 mr-2 text-purple-400" />Key Recommendations & Quality</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {recommendations && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3">Security Improvements</h4>
                                        <ul className="space-y-2">
                                            {recommendations.slice(0, 4).map((rec, index) => (
                                                <li key={index} className="text-gray-300 flex items-start"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2"></span>{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {codeQuality && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3">Code Quality</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between"><span className="text-gray-300">Code Coverage:</span><span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent font-semibold">{codeQuality.coverage}%</span></div>
                                            <div className="flex justify-between"><span className="text-gray-300">Documentation:</span><span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent font-semibold">{codeQuality.documentation}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-300">Best Practices:</span><span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent font-semibold">{codeQuality.bestPractices}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-300">Gas Efficiency:</span><span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent font-semibold">{codeQuality.gasEfficiency}</span></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }

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

                        <a href={`/cert/${project.reportId}`} target="_blank" rel="noopener noreferrer">

                            <Button className="metalic-clasic metalic-clasic-hover text-white px-8 py-4 text-lg font-semibold rounded-xl">

                                <FileText className="h-5 w-5 mr-3" />

                                View Full Report

                            </Button>

                        </a>

                        <Button className="text-white bg-gradient-to-r from-blue-600 to-[#55f7ed] hover:from-blue-700 hover:to-[#13cbbf] px-8 py-4 text-lg font-semibold rounded-xl">

                            <Download className="h-5 w-5 mr-3" />

                            Download PDF

                        </Button>

                        <Button variant="outline" className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg font-semibold rounded-xl">

                            <ExternalLink className="h-5 w-5 mr-3" />

                            View on Explorer

                        </Button>

                    </div>








                </main>
            </div>
        </div>
    );
};

export default ProjectDetailView;