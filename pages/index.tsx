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

const Home = () => {
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

  return (
    <div className="overflow-hidden"> {/* Asegura que no haya scroll horizontal */}
      {/* Hero Section */}
      <section className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 lg:p-12 pt-20 md:pt-24 relative overflow-hidden">
        {/* ✨ PARTÍCULAS DE FONDO ✨ */}
        {particlesInit && (
          <Particles
            id="tsparticles-hero" // ID único para esta instancia de Particles
            className="absolute inset-0 w-full h-full z-0" // Ocupa todo el espacio, detrás del contenido
            options={particlesOptions}
          />
        )}
        {/* Contenido del Hero (texto y botones) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mb-8 md:mb-0 pt-20">
          <p className='text-white michroma-regular text-lg sm:text-xl lg:text-2xl mb-4'>
            {t('auditWeb3')}
          </p>
          <h1 className="text-white hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {/* dangerousSetInnerHTML para el <br /> */}
            <span dangerouslySetInnerHTML={{ __html: t('blockchainSecurityAuditorTitle') as string }} />
          </h1>
          <p className='text-white michroma-regular text-base sm:text-lg lg:text-xl mb-8'>
            {t('certifyTechnology')}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-[80%] mx-auto md:mx-0'>
            <Link href="/contacto" className='no-underline'>
              <button className="px-6 py-3 bg-sentinel-primary text-white text-base sm:text-lg michroma-regular rounded-md hover:bg-opacity-90 transition-opacity duration-200 w-full sm:w-auto">
                {t('talkToAdvisor')}
              </button>
            </Link>
            <Link href="/audits" className='no-underline'>
              <button className="px-6 py-3 bg-gray-300 text-black text-base sm:text-lg michroma-regular rounded-md hover:bg-gray-400 transition-colors duration-200 w-full sm:w-auto">
                {t('viewSuccessStoriesBtn')} {/* Botón para ver casos de éxito */}
              </button>
            </Link>
          </div>
        </div>
        {/* Imagen del Hero */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <Image
            className="block max-w-full h-auto" // Ajusta la imagen al ancho de su contenedor
            height={620} // Altura base, se escalará con 'h-auto'
            width={620} // Ancho base, se escalará con 'max-w-full'
            src={'/sentinel.png'}
            alt={t('sentinelImageAlt')}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimización de Next.js Image
            priority // Carga prioritaria para LCP
          />
        </div>
      </section>

      {/* Services Section (Asumimos que ya es responsive) */}
      <ServicesSection />

      {/* Blockchains Supported Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('blockchainsSupportedTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {t('blockchainsSupportedDesc')}
            </p>
          </div>
          {/* Asumimos que BlockchainLogos ya es responsive internamente */}
          <BlockchainLogos />
        </div>
      </section>

      {/* Technologies Section - Adjusted to bg-gray-50 to potentially avoid text visibility issues */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"> {/* Changed background to gray-50 */}
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"> {/* Changed text-white to text-gray-900 */}
              {t('technologiesAuditedTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"> {/* Changed text-white to text-gray-600 */}
              {t('technologiesAuditedDesc')}
            </p>
          </div>
          {/* Asumimos que TechnologiesGrid ya es responsive internamente */}
          <TechnologiesGrid />
        </div>
      </section>

      {/* Process Visualization */}
      <div className="bg-sentinel-dark rounded-3xl p-8 md:p-12">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
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

            <div className="text-center p-4 bg-white rounded-lg shadow-md">
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

            <div className="text-center p-4 bg-white rounded-lg shadow-md">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-sentinel-dark px-4 sm:px-6 lg:px-8">
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
