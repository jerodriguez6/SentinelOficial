// components/Layout/Layout.tsx

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoBar from '../InfoBar';
import Footer from '@components/Footer/Footer';
import { useTranslation } from 'next-i18next';


const DynamicNavBar = dynamic(() => import('@components/NavBar/NavBar'), { ssr: false });

// Se definen las props que el Layout puede recibir
type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

  const { t } = useTranslation('common');

  // Estados para controlar la visibilidad del InfoBar y la posición del scroll
  const [isInfoBarVisible, setInfoBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);


  const infoMessages = [
    t('infoBarMessage1'),
    t('infoBarMessage2'),
    t('infoBarMessage3'),
  ];

  // Efecto para controlar la visibilidad del InfoBar al hacer scroll
  useEffect(() => {
    const controlInfoBar = () => {
      // Oculta la barra al bajar y la muestra al subir
      if (window.scrollY > lastScrollY && window.scrollY > 10) {
        setInfoBarVisible(false);
      } else {
        setInfoBarVisible(true);
      }
      // Actualiza la última posición del scroll
      setLastScrollY(Math.max(0, window.scrollY));
    };

    window.addEventListener('scroll', controlInfoBar);

    // Limpia el listener al desmontar el componente para evitar fugas de memoria
    return () => {
      window.removeEventListener('scroll', controlInfoBar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {/* Componentes fijos que se muestran sobre el contenido */}
      <InfoBar messages={infoMessages} isVisible={isInfoBarVisible} />
      <DynamicNavBar isInfoBarVisible={isInfoBarVisible} />


      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isInfoBarVisible ? '' : 'h-24'}
        `}
      />

      {/* Contenedor principal donde se renderizará el contenido de cada página */}
      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;