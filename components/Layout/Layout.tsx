// components/Layout/Layout.tsx

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoBar from '../InfoBar';
import Footer from '@components/Footer/Footer';
import { useTranslation } from 'next-i18next';

// Se puede importar el NavBar dinámicamente, pero controlaremos su renderizado
const DynamicNavBar = dynamic(() => import('@components/NavBar/NavBar'));

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation('common');

  const [isInfoBarVisible, setInfoBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Este estado es la clave para la solución
  const [isClient, setIsClient] = useState(false);

  const infoMessages = [
    t('infoBarMessage1'),
    t('infoBarMessage2'),
    t('infoBarMessage3'),
  ];

  // Este efecto solo se ejecuta en el cliente
  useEffect(() => {
    setIsClient(true);

    const controlInfoBar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 10) {
        setInfoBarVisible(false);
      } else {
        setInfoBarVisible(true);
      }
      setLastScrollY(Math.max(0, window.scrollY));
    };

    window.addEventListener('scroll', controlInfoBar);
    return () => {
      window.removeEventListener('scroll', controlInfoBar);
    };
  }, [lastScrollY]);

  return (
    <div>
      {/* 👇 FIX: Renderiza los componentes SOLO cuando estemos en el cliente */}
      {isClient && (
        <>
          <InfoBar messages={infoMessages} isVisible={isInfoBarVisible} />
          <DynamicNavBar isInfoBarVisible={isInfoBarVisible} />
        </>
      )}

      {/* ... el resto de tu layout ... */}
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;