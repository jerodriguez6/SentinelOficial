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
import Hero from "@components/Hero";
import AuditProcess from "@components/AuditProcess";

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
      <Hero />
      <TechRanking />
      {/* Process Visualization */}
      <AuditProcess />
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