import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircleIcon, InformationCircleIcon, ShareIcon } from '@heroicons/react/24/solid';
import { getAuditById, AuditData } from '../../lib/audit-data';
import { useEffect, useState } from 'react';

// --- 1. La Función de Obtención de Datos en el Servidor ---
export const getServerSideProps: GetServerSideProps<{ auditData: AuditData }> = async (context) => {
    const id = context.params?.id as string;
    if (!id) {
        return { notFound: true };
    }
    const auditData = getAuditById(id);
    if (!auditData) {
        return { notFound: true };
    }
    return {
        props: {
            auditData,
        },
    };
};

// --- 2. El Componente de la Página ---
const AuditCertificatePage = ({ auditData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const {
        projectName, projectTicker, client, reportId, releaseDate, auditFirm, verdict, logo,
        findingsSummary, keyFindings, verificationPoints, architecturalStrengths
    } = auditData;

    // ✅ Objeto de colores actualizado
    const severityColors: { [key: string]: string } = {
        'Baja': 'bg-yellow-500/20 text-yellow-400',
        'Informativo': 'bg-blue-500/20 text-blue-400',
        'Crítica': 'bg-red-500/20 text-red-400',
        'Alta': 'bg-orange-500/20 text-orange-400',
        'Media': 'bg-yellow-500/20 text-yellow-400',
        'Seguro': 'bg-blue-500/20 text-blue-400', // Verde cambiado a azul
        'Verificado': 'bg-blue-500/20 text-blue-400', // Verde cambiado a azul
        'Robusto': 'bg-blue-500/20 text-blue-400', // Verde cambiado a azul
        'Total': 'bg-blue-500/20 text-blue-400', // Verde cambiado a azul
        'CONTRADICCIÓN': 'bg-red-500/20 text-red-400',
        'ENGAÑOSO': 'bg-orange-500/20 text-orange-400',
        'Sin Mitigar': 'bg-red-500/20 text-red-400',
        'Reconocido': 'bg-blue-500/20 text-blue-400',
        'Implementado': 'bg-blue-500/20 text-blue-400', // Verde cambiado a azul
    };

    const headerHeightClass = 'pt-20';
    const [isDownloading, setIsDownloading] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const handleDownloadCertificate = async () => {
        setIsDownloading(true);
        console.log(auditData.reportId)
        try {
            const response = await fetch(`/api/generate-certificate/${auditData.reportId}`);

            if (response.ok) {
                // ... (lógica de descarga del PDF, que está bien)
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `certificado-${auditData.reportId}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                // ¡Aquí está la mejora!
                const contentType = response.headers.get("content-type");
                let errorData;
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    // Si es JSON, lo parseamos
                    errorData = await response.json();
                    console.error('Error del API:', errorData);
                    alert(`Error: ${errorData.error || 'Ocurrió un problema.'}`);
                } else {
                    // Si no es JSON (es HTML o texto), lo leemos como texto
                    errorData = await response.text();
                    console.error("Se recibió una respuesta inesperada (HTML/Texto) del servidor:", errorData);
                    alert('Ocurrió un error inesperado en el servidor.');
                }
            }
        } catch (error) {
            console.error('Error de red o de conexión:', error);
            alert('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
        } finally {
            setIsDownloading(false);
        }
    };


    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `${projectName} (${projectTicker}) - Certificado de Auditoría`,
                    text: "Revisa este certificado de seguridad blockchain.",
                    url: window.location.href,
                });
                console.log("Contenido compartido con éxito");
            } else {
                alert("La función de compartir no está disponible en este navegador.");
            }
        } catch (error) {
            console.error("Error al compartir:", error);
        }
    };

    return (
        <div className="bg-black text-gray-200 min-h-screen font-sans">
            <div className="h-24"></div>
            <main className={`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 ${headerHeightClass}`}>
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-700 pb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white">{projectName} ({projectTicker})</h1>
                        <p className="text-lg text-gray-400">Certificado de Auditoría de Seguridad</p>
                    </div>
                    {/* ✅ Botón de compartir con gradiente */}
                    <button
                        onClick={handleShare}
                        className="bg-gradient-to-r from-blue-400 to-[#55f7ed] hover:from-blue-500 hover:to-[#55f7ed] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center mt-4 md:mt-0"
                    >
                        <ShareIcon className="h-5 w-5 mr-2" />
                        Compartir
                    </button>
                    <button
                        onClick={handleDownloadCertificate}
                        disabled={isDownloading}
                        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? 'Generando...' : 'Descargar Certificado (PDF)'}
                    </button>
                </header>

                {/* Veredicto */}
                <section className="bg-sentinel-dark border border-gray-950 rounded-xl p-6 mb-8 shadow-lg">
                    {/* ✅ Título del veredicto con gradiente */}
                    <h2 className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent uppercase tracking-wider mb-2">
                        Veredicto Final
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center">
                            {/* ✅ Calificación (letra) con gradiente */}
                            <p className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">{verdict.grade}</p>
                            <p className="text-2xl font-bold text-white">{verdict.score}/100</p>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">{verdict.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{verdict.summary}</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 order-2 lg:order-1">
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
                            <h2 className="text-2xl font-bold text-white mb-4">Puntos Clave de Verificación</h2>
                            <div className="space-y-4">
                                {verificationPoints.map((point, index) => (
                                    <div key={index} className="bg-sentinel-dark p-4 rounded-lg flex items-start gap-4">
                                        {/* ✅ Icono con color del tema */}
                                        <CheckCircleIcon className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                                        <div>
                                            {/* ✅ Estado con color del tema */}
                                            <h3 className="font-semibold text-white">{point.feature}: <span className="text-blue-400">{point.status}</span></h3>
                                            <p className="text-sm text-gray-400">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ... (Sección de Hallazgos sin cambios de color) ... */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Detalle de Hallazgos</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-sentinel-dark text-sm uppercase text-gray-400">
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
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${severityColors[finding.severity] || ''}`}>
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

                    {/* ASIDE DE INFORMACIÓN */}
                    <aside className="lg:col-span-1 space-y-8 order-1 lg:order-2">
                        {/* ... (Aside sin cambios de color) ... */}
                        <div className="bg-sentinel-dark p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Información de la Auditoría</h3>
                            {logo && (
                                <div className="mb-4 text-center">
                                    <img
                                        src={logo}
                                        alt={`${projectName} Logo`}
                                        width={100}
                                        height={100}
                                        className="mx-auto h-20 w-20 object-contain rounded-full"
                                    />
                                </div>
                            )}
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span>Cliente:</span> <span className="font-medium text-white">{client}</span></li>
                                <li className="flex justify-between"><span>Firma Auditora:</span> <span className="font-medium text-white">{auditFirm}</span></li>
                                <li className="flex justify-between"><span>ID del Informe:</span> <span className="font-medium text-white font-mono">{reportId}</span></li>
                                <li className="flex justify-between"><span>Fecha de Emisión:</span> <span className="font-medium text-white">{releaseDate}</span></li>
                            </ul>
                        </div>
                        <div className="bg-sentinel-dark p-6 rounded-lg">
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