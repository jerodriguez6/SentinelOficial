// pages/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Importa tus componentes
import ServicesSection from '@components/ServicesSection';
import BlockchainLogos from '@components/BlockchainLogos';
import TechRanking from '@components/TechRanking'; // ✨ NUEVA IMPORTACIÓN ✨
import { Shield, CheckCircle, Users } from 'lucide-react';

// ✨ PARTICLE IMPORTS ✨
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";

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

  // ✨ PARTICLE OPTIONS ✨
  const particlesOptions: RecursivePartial<IOptions> = useMemo(
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
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.bounce },
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

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('https://img.freepik.com/free-vector/abstract-red-neon-arrow-light-glow-background_107791-28871.jpg?semt=ais_items_boosted&w=740')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        className="min-h-[80vh] bg-black flex flex-col items-center justify-center p-4 sm:p-8 pt-20 relative overflow-hidden"
      >
        {particlesInit && (
          <Particles
            id="tsparticles-hero"
            className="absolute inset-0 w-full h-full z-0"
            options={particlesOptions}
          />
        )}

        <div className="w-full flex flex-col md:flex-row items-center justify-center mt-20">
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mb-8 md:mb-0 py-20">
            <p className='text-white michroma-regular text-lg sm:text-xl lg:text-3xl mb-4 relative z-10'>
              {t('auditWeb3')}
            </p>
            <h1 className="text-white hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 relative z-10">
              <span dangerouslySetInnerHTML={{ __html: t('blockchainSecurityAuditorTitle') as string }} />
            </h1>
            <p className='text-white michroma-regular text-base sm:text-lg lg:text-xl mb-8 relative z-10'>
              {t('certifyTechnology')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-[80%] mx-auto md:mx-0'>
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
        </div>

        <div className="w-full relative z-10">
          <BlockchainLogos />
        </div>
      </section>

      {/* ✨ SECCIÓN DE RANKING REFACTORIZADA ✨ */}
      <TechRanking />

      {/* Services Section */}
      {/* <ServicesSection /> */}

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