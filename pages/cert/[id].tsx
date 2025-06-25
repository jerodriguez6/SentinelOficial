import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { getAuditById, AuditData } from '../../lib/audit-data'; // Usamos ruta relativa

// --- 1. La Función de Obtención de Datos en el Servidor ---
// Esta función se ejecuta en el servidor en cada petición.
export const getServerSideProps: GetServerSideProps<{ auditData: AuditData }> = async (context) => {
    // El ID viene del objeto 'context.params'
    const id = context.params?.id as string;

    // Si no hay ID en la URL, no se encuentra la página.
    if (!id) {
        return { notFound: true };
    }

    // Llamamos a nuestra función de lógica directamente
    const auditData = getAuditById(id);

    // Si la función no devuelve datos, mostramos un 404.
    if (!auditData) {
        return { notFound: true };
    }

    // Si todo va bien, pasamos los datos a la página a través de 'props'.
    return {
        props: {
            auditData,
        },
    };
};

// --- 2. El Componente de la Página (Ahora es un componente normal, no async) ---
// Recibe 'auditData' como una prop desde getServerSideProps.
const AuditCertificatePage = ({ auditData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const {
        projectName, projectTicker, client, reportId, releaseDate, auditFirm, verdict,
        findingsSummary, keyFindings, verificationPoints, architecturalStrengths
    } = auditData;

    const severityColors: { [key: string]: string } = {
        'Baja': 'bg-yellow-500/20 text-yellow-400',
        'Informativo': 'bg-blue-500/20 text-blue-400',
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Encabezado */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-700 pb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white">{projectName} ({projectTicker})</h1>
                        <p className="text-lg text-gray-400">Certificado de Auditoría de Seguridad</p>
                    </div>
                    <a
                        href="#"
                        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        Descargar Informe (PDF)
                    </a>
                </header>

                {/* Veredicto */}
                <section className="bg-gray-800/50 border border-green-500/30 rounded-xl p-6 mb-8 shadow-lg">
                    <h2 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-2">Veredicto Final</h2>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center">
                            <p className="text-6xl font-extrabold text-green-400">{verdict.grade}</p>
                            <p className="text-2xl font-bold text-white">{verdict.score}/100</p>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">{verdict.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{verdict.summary}</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Resumen de Hallazgos */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Resumen de Hallazgos</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                                <div className="bg-red-500/10 p-4 rounded-lg"><p className="text-3xl font-bold text-red-400">{findingsSummary.critical}</p><p className="text-sm text-gray-400">Críticos</p></div>
                                <div className="bg-orange-500/10 p-4 rounded-lg"><p className="text-3xl font-bold text-orange-400">{findingsSummary.high}</p><p className="text-sm text-gray-400">Altos</p></div>
                                <div className="bg-yellow-500/10 p-4 rounded-lg"><p className="text-3xl font-bold text-yellow-400">{findingsSummary.medium}</p><p className="text-sm text-gray-400">Medios</p></div>
                                <div className="bg-blue-500/10 p-4 rounded-lg"><p className="text-3xl font-bold text-blue-400">{findingsSummary.low}</p><p className="text-sm text-gray-400">Bajos</p></div>
                                <div className="bg-gray-600/20 p-4 rounded-lg"><p className="text-3xl font-bold text-gray-300">{findingsSummary.informational}</p><p className="text-sm text-gray-400">Informativos</p></div>
                            </div>
                        </section>

                        {/* Puntos Clave de Verificación PoSA */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Puntos Clave de Verificación (PoSA)</h2>
                            <div className="space-y-4">
                                {verificationPoints.map((point, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-start gap-4">
                                        <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-white">{point.feature}: <span className="text-green-400">{point.status}</span></h3>
                                            <p className="text-sm text-gray-400">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Hallazgos */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Detalle de Hallazgos Menores</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-800 text-sm uppercase text-gray-400">
                                        <tr>
                                            <th className="p-3">ID</th>
                                            <th className="p-3">Descripción</th>
                                            <th className="p-3">Severidad</th>
                                            <th className="p-3">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {keyFindings.map(finding => (
                                            <tr key={finding.id}>
                                                <td className="p-3 font-mono text-sm">{finding.id}</td>
                                                <td className="p-3">{finding.description}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${severityColors[finding.severity]}`}>
                                                        {finding.severity}
                                                    </span>
                                                </td>
                                                <td className="p-3">{finding.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-1 space-y-8">
                        {/* Información de la Auditoría */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Información de la Auditoría</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span>Cliente:</span> <span className="font-medium text-white">{client}</span></li>
                                <li className="flex justify-between"><span>Firma Auditora:</span> <span className="font-medium text-white">{auditFirm}</span></li>
                                <li className="flex justify-between"><span>ID del Informe:</span> <span className="font-medium text-white font-mono">{reportId}</span></li>
                                <li className="flex justify-between"><span>Fecha de Emisión:</span> <span className="font-medium text-white">{releaseDate}</span></li>
                            </ul>
                        </div>

                        {/* Fortalezas Arquitectónicas */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Fortalezas Arquitectónicas</h3>
                            <ul className="space-y-4">
                                {architecturalStrengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <InformationCircleIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-white">{strength.title}</h4>
                                            <p className="text-sm text-gray-400">{strength.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default AuditCertificatePage;