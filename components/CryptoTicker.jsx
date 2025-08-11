// components/CryptoTicker.tsx
import React, { useEffect, useState } from 'react';

const CryptoTicker = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const cryptoData = [
    { symbol: 'BTC', logo: '₿', change: '+2.4%', isPositive: true },
    { symbol: 'ETH', logo: 'Ξ', change: '-1.2%', isPositive: false },
    { symbol: 'BNB', logo: '🔶', change: '+3.7%', isPositive: true },
    { symbol: 'SOL', logo: '◎', change: '+8.9%', isPositive: true },
    { symbol: 'ADA', logo: '₳', change: '+1.8%', isPositive: true },
    { symbol: 'AVAX', logo: '🔺', change: '-2.1%', isPositive: false },
    { symbol: 'DOT', logo: '●', change: '+5.3%', isPositive: true },
    { symbol: 'MATIC', logo: '🔷', change: '+4.2%', isPositive: true },
    { symbol: 'LINK', logo: '🔗', change: '-0.8%', isPositive: false },
    { symbol: 'UNI', logo: '🦄', change: '+2.9%', isPositive: true },
    { symbol: 'LTC', logo: 'Ł', change: '+1.5%', isPositive: true },
    { symbol: 'XRP', logo: '◈', change: '-1.9%', isPositive: false },
    { symbol: 'DOGE', logo: 'Ð', change: '+6.7%', isPositive: true },
    { symbol: 'TRX', logo: '▲', change: '-0.5%', isPositive: false },
    { symbol: 'ATOM', logo: '⚛', change: '+3.2%', isPositive: true },
    { symbol: 'ALGO', logo: '△', change: '+4.8%', isPositive: true },
    { symbol: 'VET', logo: '💚', change: '-1.4%', isPositive: false },
    { symbol: 'FIL', logo: '📁', change: '+2.1%', isPositive: true },
    { symbol: 'THETA', logo: 'Θ', change: '+7.3%', isPositive: true },
    { symbol: 'XLM', logo: '✨', change: '-0.9%', isPositive: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Solo cambiar visibilidad si el scroll es significativo (>5px)
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        // Si se scrollea hacia abajo, ocultar
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } 
        // Si se scrollea hacia arriba, mostrar
        else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    // El contenedor principal del CryptoTicker
    // No necesita posicionamiento fijo, se comporta como un bloque normal
    // La transición se maneja con translate-y
    <div 
      className={`bg-blue border-b border-zinc-900 text-white relative h-10 transition-transform duration-300 ease-in-out w-full ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      // Aseguramos que el ancho sea completo y que no interfiera con otros elementos
      style={{
        // Si necesitas un z-index específico para que esté por encima de otros elementos del flujo
        // puedes añadirlo aquí, pero normalmente no es necesario si va antes del Header fijo.
        // zIndex: 40, 
      }}
    >
      <div className="ticker-wrapper h-full">
        <div className="ticker-content h-full">
          {/* Triple content for seamless infinite loop */}
          {[...cryptoData, ...cryptoData, ...cryptoData].map((crypto, index) => (
            <div key={index} className="ticker-item flex items-center space-x-2 whitespace-nowrap h-full">
              <div className="flex items-center space-x-1">
                <span className="text-base">{crypto.logo}</span>
                <span className="text-white font-medium text-xs">{crypto.symbol}</span>
              </div>
              <span className={`text-xs font-medium ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
        }
        
        .ticker-content {
          display: flex;
          animation: scroll-left 120s linear infinite;
          width: fit-content;
        }
        
        .ticker-item {
          padding: 0 20px;
          border-right: 1px solid #3f3f46;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          min-width: 110px;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoTicker;