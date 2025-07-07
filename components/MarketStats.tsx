import { TrendingUp, TrendingDown } from "lucide-react";
interface InfoBarProps {

    isVisible: boolean; // Un booleano para controlar la visibilidad
}
const MarketStats: React.FC<InfoBarProps> = ({ isVisible }) => {
    const cryptoLogos = [
        { symbol: "BTC", name: "Bitcoin", logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
        { symbol: "ETH", name: "Ethereum", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
        { symbol: "BNB", name: "BNB", logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
        { symbol: "AVAX", name: "Avalanche", logo: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png" },
        { symbol: "SOL", name: "Solana", logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
        { symbol: "ADA", name: "Cardano", logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
        { symbol: "DOT", name: "Polkadot", logo: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png" },
        { symbol: "MATIC", name: "Polygon", logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png" }
    ];

    return (
        <div
            className={`
  fixed top-0 left-0 w-full h-12 bg-black overflow-hidden z-50
  transition-transform duration-300 ease-in-out
  ${isVisible ? 'translate-y-0' : '-translate-y-full'}
`}
        >
            <div className="h-14 mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between text-xs text-gray-400">
                    {/* Market Stats */}
                    <div className="flex flex-wrap items-center space-x-6">
                        <span>Monedas: <span className="text-white font-medium">17,572</span></span>
                        <span>Intercambios: <span className="text-white font-medium">1,307</span></span>
                        <span className="flex items-center space-x-1">
                            <span>Cap. de mercado: <span className="text-white font-medium">3,422 B US$</span></span>
                            <span className="text-green-400 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                3.5%
                            </span>
                        </span>
                        <span>Volumen en 24 h: <span className="text-white font-medium">81,204 mil M US$</span></span>
                    </div>

                    {/* Dominance */}
                    <div className="flex items-center space-x-4">
                        <span>Dominio:</span>
                        <span>BTC <span className="text-white font-medium">62,9%</span></span>
                        <span>ETH <span className="text-white font-medium">8,94%</span></span>
                        <span>Gas: <span className="text-white font-medium">3,222 GWE</span></span>
                    </div>
                </div>

                {/* Scrolling Crypto Logos */}
                <div className=" overflow-hidden">
                    <div className="flex animate-scroll space-x-4 w-full">
                        {[...cryptoLogos, ...cryptoLogos].map((crypto, index) => (
                            <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-gray-900/50 rounded-full hover:bg-gray-800/50 transition-colors cursor-pointer whitespace-nowrap">
                                <img src={crypto.logo} alt={crypto.symbol} className="w-4 h-4" />
                                <span className="text-white text-xs font-medium">{crypto.symbol}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketStats;