// pages/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Importa tus componentes (asegúrate de que las rutas sean correctas)
import ServicesSection from '@components/ServicesSection';
import BlockchainLogos from '@components/BlockchainLogos';
import TechnologiesGrid from '@components/TechnologiesGrid';
import { Shield, CheckCircle, Users } from 'lucide-react';

// ✨ PARTICLE IMPORTS ✨
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
// ✨ Importa los tipos y enums necesarios de tsparticles/engine ✨
import type { IOptions, RecursivePartial } from "@tsparticles/engine"; // Import IOptions and RecursivePartial for useMemo
import { MoveDirection, OutMode } from "@tsparticles/engine"; // Importa los enums para 'direction' y 'outModes'
import { getAllAudits, AuditData } from '../lib/audit-data'; // Usamos ruta relativa

// Interfaz para las tarjetas de previsualización
interface AuditProjectCard {
  logo: string;
  id: string;
  name: string;
  description: string;
  auditDate: string;
  tvl: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  findings: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical' | 'N/A';
  blockchain: string;
  verdict: {
    title: string;
    grade: string;
    score: number;
    summary: string;
  };
  reportId: string;
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
  verdict: audit.verdict,
  reportId: audit.reportId
}));
const Home = () => {

  const projects: AuditData[] | undefined = getAllAudits();

  console.log(projects)
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  // ✨ PARTICLE STATE ✨
  const [particlesInit, setParticlesInit] = useState(false);

  // ✨ PARTICLE INITIALIZATION EFFECT ✨
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  // ✨ PARTICLE OPTIONS - Usando enums de tsparticles/engine para compatibilidad de tipos ✨
  const particlesOptions: RecursivePartial<IOptions> = useMemo( // Añadir el tipo explícito aquí para mayor claridad
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          enable: false,
          color: "#ffffff",
          distance: 150,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none, // ✨ FIX: Usar MoveDirection.none directamente ✨
          enable: true,
          outModes: { default: OutMode.bounce }, // ✨ FIX: Usar OutMode.bounce directamente ✨
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [],
  );


  useEffect(() => {
    console.log('Idioma actual detectado por useEffect:', i18n.language);
  }, [i18n.language]);
  const projectsToShow = auditProjectCards.sort((a, b) => b.verdict.score - a.verdict.score).slice(0, 10);
  return (
    <div className="overflow-hidden"> {/* Asegura que no haya scroll horizontal */}
      {/* Hero Section */}
      <section className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-8 pt-20 relative overflow-hidden">
        {/* ✨ PARTÍCULAS DE FONDO ✨ */}
        {particlesInit && (
          <Particles
            id="tsparticles-hero" // ID único para esta instancia de Particles
            className="absolute inset-0 w-full h-full z-0" // Ocupa todo el espacio, detrás del contenido
            options={particlesOptions}
          />
        )}

        {/* ✅ INICIO DE LA CORRECCIÓN: Contenedor para la fila superior */}
        {/* Agrupamos las dos columnas en un solo div para que actúen como una única fila. */}
        {/* Este div ahora controla la dirección responsive (columna en móvil, fila en desktop). */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center mt-20">
          {/* Columna Izquierda (Texto y botones) - SIN CAMBIOS INTERNOS */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mb-8 md:mb-0 pt-20">
            <p className='text-white michroma-regular text-lg sm:text-xl lg:text-2xl mb-4 relative z-10'>
              {t('auditWeb3')}
            </p>
            <h1 className="text-white hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 relative z-10">
              <span dangerouslySetInnerHTML={{ __html: t('blockchainSecurityAuditorTitle') as string }} />
            </h1>
            <p className='text-white michroma-regular text-base sm:text-lg lg:text-xl mb-8 relative z-10'>
              {t('certifyTechnology')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-[80%] mx-auto md:mx-0 '>
              <Link href="/form" className='no-underline relative z-10'>
                <button className="px-6 py-3 bg-sentinel-primary text-white text-base sm:text-lg michroma-regular rounded-md hover:bg-opacity-90 transition-opacity duration-200 w-full sm:w-auto">
                  {t('talkToAdvisor')}
                </button>
              </Link>
              <Link href="/audits" className='no-underline relative z-10'>
                <button className="px-6 py-3 bg-gray-300 text-black text-base sm:text-lg michroma-regular rounded-md hover:bg-gray-400 transition-colors duration-200 w-full sm:w-auto">
                  {t('viewSuccessStoriesBtn')}
                </button>
              </Link>
            </div>
          </div>

          {/* Columna Derecha (Imagen) - SIN CAMBIOS INTERNOS */}
          <div className="w-full md:w-1/2 flex justify-center p-4">
            <Image
              className="block max-w-full h-auto relative z-10"
              height={620}
              width={620}
              src={'/sentinel.png'}
              alt={t('sentinelImageAlt')}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
        {/* ✅ FIN DE LA CORRECCIÓN: Contenedor para la fila superior */}

        {/* ✅ INICIO DE LA CORRECCIÓN: Contenedor para BlockchainLogos */}
        {/* Movemos BlockchainLogos aquí, como un hermano del contenedor superior. */}
        {/* Le damos un ancho completo y un margen superior para separarlo del contenido de arriba. */}
        <div className="w-full relative z-10">
          <BlockchainLogos />
        </div>
        {/* ✅ FIN DE LA CORRECCIÓN: Contenedor para BlockchainLogos */}
      </section>

      {/* Blockchains Supported Section */}
      <section className="py-12 bg-transparent px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8">
            {t('TechMarketCap')}
          </h2>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-[700px] w-full divide-y divide-gray-800">
              <thead className="bg-sentinel-dark">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Puesto
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Logo
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Puntuación
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {projectsToShow.map((project, index) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                    onClick={() => window.open(`/cert/${project.reportId}`, '_blank')}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-xl font-medium text-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={40}
                        height={40}
                        className="object-contain rounded-full"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xl text-gray-200">
                      {project.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xl text-gray-200">
                      {project.verdict.grade}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xl text-gray-200">
                      {project.verdict.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center mt-12 px-4">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('PoweredBySharkTechnology')}
            </h2>
            <Image
              src={'/SHARKTE.png'}
              alt={`Shark logo`}
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Services Section (Asumimos que ya es responsive) */}
      <ServicesSection />


      {/* Technologies Section - Adjusted to bg-gray-50 to potentially avoid text visibility issues */}
      {/* <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 relative z-10"> 
      
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"> 
              {t('technologiesAuditedTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {t('technologiesAuditedDesc')}
            </p>
          </div>
 
          <TechnologiesGrid />
        </div>
      </section> */}

      {/* Process Visualization */}
      <div className="bg-sentinel-dark rounded-3xl p-8 md:p-12 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Proceso de Auditoría IA</h3>
          <p className="text-white text-lg">De código fuente a reporte completo en tiempo record</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Análisis Inicial', desc: 'Escaneo automático del código fuente' },
            { step: '02', title: 'IA Processing', desc: 'Análisis profundo con modelos especializados' },
            { step: '03', title: 'Validación', desc: 'Verificación manual por expertos' },
            { step: '04', title: 'Reporte Final', desc: 'Entrega de resultados y recomendaciones' }
          ].map((process, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sentinel-primary to-sentinel-accent text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                {process.step}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{process.title}</h4>
              <p className="text-white text-sm">{process.desc}</p>

              {index < 3 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-sentinel-primary to-sentinel-accent transform -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-sentinel-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t('rigorousMethodologyTitle')}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t('rigorousMethodologyDesc')}
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-md relative z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-sentinel-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t('qualityAssuranceTitle')}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t('qualityAssuranceDesc')}
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-md relative z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-sentinel-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t('eliteTeamTitle')}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t('eliteTeamDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-sentinel-dark px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('readyToProtectTitle')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto">
            {t('readyToProtectDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contacto" className="no-underline">
              <button className="px-8 py-3 bg-sentinel-primary text-white text-base sm:text-lg rounded-md font-semibold hover:bg-opacity-90 transition-opacity duration-200 w-full sm:w-auto">
                {t('startAuditBtn')}
              </button>
            </Link>
            <Link href="/audits" className="no-underline">
              <button className="px-8 py-3 text-white border-2 border-white text-base sm:text-lg rounded-md font-semibold hover:bg-white hover:text-black transition-colors duration-200 w-full sm:w-auto">
                {t('viewSuccessStoriesBtn')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
