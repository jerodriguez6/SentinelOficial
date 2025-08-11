import { Eye, TrendingUp, Shield, Share, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Benefits = () => {
    const benefits = [
        {
            icon: Eye,
            title: "Transparencia total",
            description: "Tu calidad tecnológica queda documentada y accesible al público.",
            buttonText: "Explorar más",
            image: "/s1.jpg"
        },
        {
            icon: Star,
            title: "Visibilidad Web3",
            description: "Destaca en el ranking y llama la atención de socios e inversores.",
            buttonText: "Más detalles",
            image: "/s2.jpg"
        },
        {
            icon: TrendingUp,
            title: "Mejora continua",
            description: "El sistema te incentiva a mantener buenas prácticas y seguridad.",
            buttonText: "Ver beneficios",
            image: "/s3.jpg"
        },
        {
            icon: Share,
            title: "Marketing verificado",
            description: "Comparte tu score o insignia con un widget y respalda tu marca.",
            buttonText: "Obtener ahora",
            image: "/s4.jpg"
        },
        {
            icon: Shield,
            title: "Ventaja competitiva",
            description: "Un SentinelScore alto es tu carta de presentación en blockchain.",
            buttonText: "Iniciar hoy",
            image: "/s5.jpg"
        }
    ];

    // Duplicamos el array para dar efecto infinito
    const extendedBenefits = [...benefits, ...benefits];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const cardsPerView = 3;

    const intervalRef = useRef(null);

    // Función para avanzar el carrusel
    const nextSlide = () => {
        setCurrentIndex(prev => prev + 1);
    };

    // Auto-play
    useEffect(() => {
        intervalRef.current = setInterval(nextSlide, 4000);
        return () => clearInterval(intervalRef.current);
    }, []);

    // Reset suave al llegar al final de la primera tanda
    useEffect(() => {
        if (currentIndex === benefits.length) {
            // Pausamos animación
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500); // tiempo de transición
        } else {
            setIsTransitioning(true);
        }
    }, [currentIndex, benefits.length]);

    return (
        <section id="beneficios" className="py-12 relative bg-[#09090B]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        ¿Por qué te conviene?
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                        Descubre las ventajas únicas que SentinelScore aporta a tu proyecto
                    </p>
                </div>

                {/* Carrusel */}
                <div className="max-w-5xl mx-auto overflow-hidden relative">
                    <div
                        className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                        }}
                    >
                        {extendedBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="w-full md:w-1/3 p-4 flex-shrink-0"
                            >
                                <div className="relative rounded-lg border border-cyan-400 overflow-hidden flex flex-col h-full">
                                    {/* Imagen de fondo */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${benefit.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/70"></div>

                                    {/* Ícono */}
                                    <div className="relative z-10 p-4">
                                        <div className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center relative bg-transparent">
                                            <div className="absolute inset-0 rounded-full animate-pulse-glow"></div>
                                            <benefit.icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="relative z-10 flex-grow flex flex-col justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-cyan-400 mb-3 text-center">{benefit.title}</h3>
                                            <p className="text-sm text-gray-300 leading-relaxed text-center">{benefit.description}</p>
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                                {benefit.buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicadores */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: benefits.length - cardsPerView + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex ? "bg-cyan-400 w-6" : "bg-gray-600 hover:bg-gray-500"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
