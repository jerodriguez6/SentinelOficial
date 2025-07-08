import React from 'react';
import Image from 'next/image';

const BlockchainLogos = () => {
    const blockchains = [
        { name: 'Ethereum', symbol: 'ETH', url: '/eth.png' },
        { name: 'SharkEthereum', symbol: 'ETH', url: '/SHARKTE.png' },
        { name: 'BNB Chain', symbol: 'BNB', url: '/bnb.png' },
        { name: 'Polygon', symbol: 'MATIC', url: '/polygon.png' },
        { name: 'AWS', symbol: 'ETH', url: '/Amazon-Web-Services-AWS-Logo.png' },
        { name: 'Solana', symbol: 'SOL', url: '/solana.webp' },
        { name: 'Avalanche', symbol: 'AVAX', url: '/avalanche.png' },
        { name: 'Cardano', symbol: 'ADA', url: '/cardano.webp' },
        { name: 'SOLIDITY', symbol: 'ETH', url: '/solidity.webp' },
        { name: 'Polkadot', symbol: 'DOT', url: '/polkadot.png' },
        { name: 'Cosmos', symbol: 'ATOM', url: '/Cosmos.png' }
    ];

    // ✅ 1. DUPLICAMOS EL ARRAY DE LOGOS PARA UN BUCLE PERFECTO
    const extendedLogos = [...blockchains, ...blockchains];

    return (
        <div
            className="w-full inline-flex flex-nowrap overflow-hidden h-auto
                       [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
        >
            {/* ✅ 2. AÑADIMOS EL CONTENEDOR ANIMADO */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {/* Renderizamos la lista duplicada */}
                {extendedLogos.map((blockchain, index) => (
                    <li key={`${blockchain.name}-${index}`} className="flex-shrink-0">
                        <div className="flex flex-col items-center justify-center p-4 text-white w-36">
                            <div className="w-8 h-4 flex items-center justify-center mb-2 relative">
                                {blockchain.url ? (
                                    <Image
                                        src={blockchain.url}
                                        alt={`${blockchain.name} logo`}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                ) : (
                                    <span className="text-white font-bold text-sm">
                                        {blockchain.symbol}
                                    </span>
                                )}
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            {/* ✅ 3. PAUSAR AL PASAR EL CURSOR (HOVER) */}
            {/* Este es el mismo contenido, pero se muestra solo para la animación en hover.
                Tailwind no puede manejar la animación duplicada en hover directamente. */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {extendedLogos.map((blockchain, index) => (
                    <li key={`${blockchain.name}-${index}-hover`} className="flex-shrink-0">
                        <div className="flex flex-col items-center justify-center p-4 text-white w-36">
                            <div className="w-16 h-16 flex items-center justify-center mb-2 relative">
                                {blockchain.url ? (
                                    <Image
                                        src={blockchain.url}
                                        alt={`${blockchain.name} logo`}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                ) : (
                                    <span className="text-white font-bold text-sm">
                                        {blockchain.symbol}
                                    </span>
                                )}
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            {/* ✅ 4. CSS PARA LA ANIMACIÓN */}
            {/* Necesitarás añadir esta animación a tu archivo CSS global (o tailwind.config.js) */}
            {/* En globals.css: */}
            {/*
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
            */}
        </div>
    );
};

export default BlockchainLogos;