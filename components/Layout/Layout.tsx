import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoBar from '../InfoBar';
import Footer from '@components/Footer/Footer';

const DynamicNavBar = dynamic(() => import('@components/NavBar/NavBar'), { ssr: false });

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isInfoBarVisible, setInfoBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const infoMessages = [
    "¿Listo para el Lanzamiento? Audita Primero. ••• No Dejes tu Código al Azar. Asegúralo Hoy. ••• Una Falla Puede Costarlo Todo.",
    "La Seguridad de tu dApp Empieza Aquí ••• Obtén tu Certificado de Auditoría NFT ",
    "No Esperes a ser Vulnerable. Anticipa. ••• Agenda tu Auditoría y Lanza con Confianza ••• Protege tu Inversión desde la Línea Uno",
  ];


  useEffect(() => {
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
      {/* Estos dos componentes están FIJOS y fuera del flujo normal */}
      <InfoBar messages={infoMessages} isVisible={isInfoBarVisible} />
      <DynamicNavBar isInfoBarVisible={isInfoBarVisible} />


      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isInfoBarVisible ? '' : 'h-24'}
        `}
      />

      {/* La etiqueta <main> ahora no necesita ninguna clase de padding o transición. */}
      <main>
        {children}
      </main>

      {/* ✅ FIN DE LA CORRECCIÓN */}

      <Footer />
    </div>
  );
};

export default Layout;