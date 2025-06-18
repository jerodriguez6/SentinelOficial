import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router"
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ServicesSection from '@components/ServicesSection';
import BlockchainLogos from '@components/BlockchainLogos';
import TechnologiesGrid from '@components/TechnologiesGrid';
import { Shield, CheckCircle, Users, Star } from 'lucide-react';

const Home = () => {
  const router = useRouter();
  // Usar el hook useTranslation. Si no pasas un namespace, usa el default.
  // Es una buena práctica especificar el namespace si tus traducciones están divididas.
  const { t, i18n } = useTranslation('common');
  console.log('Idioma actual detectado:', i18n.language);
  // Función para cambiar el idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    console.log('Idioma actual detectado por useEffect:', i18n.language);
  }, [i18n.language]); // This will log every time i18n.language changes

  return (
    <div>
      <div className="hero h-[90vh] bg-black items-center flex justify-center ">
        <div className="w-[50%] flex justify-center flex-column">
          <p className='mx-10 text-white michroma-regular'>{t('auditWeb3')}</p>
          <h1 className="text-white hero-title mx-10 p-0">{t('blockchainSecurityAuditorTitle')}</h1>
          <p className='mx-10 text-white michroma-regular'>{t('certifyTechnology')}</p>
          <div className='flex w-[80%] justify-around m-2'>
            <Link href="/form" className='text-white'>
              <button className="p-3 bg-[#BA181B] text-xl michroma-regular ">
                {t('talkToAdvisor')}
              </button>
            </Link>
            <button className="p-3 bg-[#d3d3d3] text-xl michroma-regular text-black">
              {t('talkToAdvisor')}
            </button>
          </div>
        </div>
        <div className="w-[50%] flex justify-center">
          <Image className="block" height={620} width={620} src={'/sentinel.png'} alt={'sentinel'} />
        </div>
      </div>
      <ServicesSection />
      {/* Blockchains Supported Section */}
      <section className="section-padding py-20 bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
              Blockchains Soportadas
            </h2>
            <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
              Expertise comprobado en las principales redes blockchain del ecosistema
            </p>
          </div>
          <BlockchainLogos />
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding py-20 bg-gray-50 g">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Tecnologías Auditadas
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Cobertura completa para todos los componentes de tu proyecto Web3
            </p>
          </div>
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
      <section className="section-padding py-20 bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d3d3d3] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold text-brand-black mb-4">
                Metodología Rigurosa
              </h3>
              <p className="text-brand-gray-600">
                Proceso de auditoría sistemático con más de 200 checks de seguridad
                y revisión manual exhaustiva por expertos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#d3d3d3] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold text-brand-black mb-4">
                Garantía de Calidad
              </h3>
              <p className="text-brand-gray-600">
                Reportes detallados con recomendaciones específicas y seguimiento
                post-auditoría para garantizar la implementación correcta.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#d3d3d3] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold text-brand-black mb-4">
                Equipo de Elite
              </h3>
              <p className="text-brand-gray-600">
                Auditores certificados con experiencia en ciberseguridad,
                desarrollo blockchain y investigación en vulnerabilidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      {/* c:\Dev\Shark\BH\VetaWallet\AUKA-ICO\components\BlockchainLogos.tsx */}

      {/* Final CTA */}
      <section className="section-padding py-20 bg-sentinel-dark">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Listo para proteger tu proyecto?
            </h2>
            <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
              Únete a los cientos de proyectos que han confiado en nuestra experiencia
              para asegurar su código y proteger a sus usuarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contacto" className="btn-primary text-lg px-10 py-4">
                Comenzar Auditoría
              </Link>
              <Link href="/audits" className="text-white border-2 border-white hover:bg-white hover:text-brand-black px-10 py-4 rounded-md font-medium transition-all duration-200">
                Ver Casos de Éxito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      // Pass the translations for the 'common' namespace to the page component
      ...(await serverSideTranslations(locale, ['common'])),
      // You can add other props here if your page needs them
    },
  };
};

export default Home;
