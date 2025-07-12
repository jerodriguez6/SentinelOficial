import React from 'react';

const CryptoTicker = () => {
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

  return (
    <div className="bg-black border-b border-zinc-800 text-white relative h-12">
      <div className="ticker-wrapper h-full">
        <div className="ticker-content h-full">
          {/* Triple content for seamless infinite loop */}
          {[...cryptoData, ...cryptoData, ...cryptoData].map((crypto, index) => (
            <div key={index} className="ticker-item flex items-center space-x-3 whitespace-nowrap h-full">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{crypto.logo}</span>
                <span className="text-white font-medium text-sm">{crypto.symbol}</span>
              </div>
              <span className={`text-sm font-medium ${crypto.isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                {crypto.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          // overflow: hidden;
        }
        
        .ticker-content {
          display: flex;
          animation: scroll-left 120s linear infinite;
          width: fit-content;
        }
        
        .ticker-item {
          padding: 0 32px;
          border-right: 1px solid #3f3f46;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          min-width: 140px;
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