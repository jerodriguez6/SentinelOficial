import React from 'react';
import Image from 'next/image'; // Importar el componente Image de Next.js

const BlockchainLogos = () => {
    // Hemos añadido URLs de logos para cada blockchain.
    // Es CRUCIAL que estas URLs estén incluidas en el 'remotePatterns' de tu next.config.js
    // Si no están, las imágenes no se cargarán y verás errores en la consola.
    const blockchains = [
        { name: 'Ethereum', symbol: 'ETH', url: '/eth.png' }, // Usar SVG local si es posible
        { name: 'BNB Chain', symbol: 'BNB', url: '/bnb.png' },
        { name: 'Polygon', symbol: 'MATIC', url: '/polygon.png' },
        { name: 'Solana', symbol: 'SOL', url: '/solana.webp' },
        { name: 'Avalanche', symbol: 'AVAX', url: '/avalanche.png' },
        { name: 'Cardano', symbol: 'ADA', url: '/cardano.webp' },
        { name: 'Polkadot', symbol: 'DOT', url: '/Polkadot.png' },
        { name: 'Cosmos', symbol: 'ATOM', url: '/Cosmos.png' }
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {blockchains.map((blockchain) => (
                <div
                    key={blockchain.name}
                    className="flex flex-col items-center justify-center p-3 sm:p-4 bg-black rounded-lg text-white hover:shadow-md transition-shadow duration-200 w-full max-w-[120px] aspect-square" // Ajustes de tamaño y aspecto
                >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 relative">
                        {/* Usar el componente Image de Next.js */}
                        {blockchain.url ? (
                            <Image
                                src={blockchain.url}
                                alt={`${blockchain.name} logo`}
                                width={100} // Ancho y alto de la imagen en px
                                height={100}
                                className="object-contain" // Para que la imagen se ajuste dentro del div sin cortarse
                            />
                        ) : (
                            // Fallback si no hay URL de imagen, usa el símbolo de texto
                            <span className="text-whitefont-bold text-sm">
                                {blockchain.symbol}
                            </span>
                        )}
                    </div>
                    <span className="text-white text-xs sm:text-sm font-medium text-center">
                        {blockchain.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default BlockchainLogos;
