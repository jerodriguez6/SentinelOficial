import React from 'react';
import Footer from '@components/Footer/Footer';
import WhatsApp from '@components/WhatsApp';
import CryptoTicker from "@components/CryptoTicker";
import Header from "@components/Header";

type AppLayoutProps = {
  children?: React.ReactNode;
};

// Este es el Layout principal. Contiene los elementos comunes a TODA la web.
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    // El div principal que establece el fondo para toda la aplicación
    <div style={{
      backgroundColor: 'rgb(9 9 11)',
      backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/circuits.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
    }}>
      {/* El header y el ticker se mantienen fijos en la parte superior */}
      <div className="sticky top-0 z-40">
        <CryptoTicker />
        <Header />
      </div>

      {/* El contenido principal de cada página se renderiza aquí */}
      <main>
        {children}
      </main>

      {/* Componentes flotantes y el footer van al final */}
      <WhatsApp />
      <Footer />
    </div>
  );
};

export default AppLayout;
