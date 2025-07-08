import { Eye, TrendingUp, Shield, Share, Star } from "lucide-react";

const Benefits = () => {
    const benefits = [
        {
            icon: Eye,
            title: "Transparencia total",
            description: "Tu calidad tecnológica queda documentada y accesible al público."
        },
        {
            icon: Star,
            title: "Visibilidad Web3",
            description: "Destaca en el ranking y llama la atención de socios e inversores."
        },
        {
            icon: TrendingUp,
            title: "Mejora continua",
            description: "El sistema te incentiva a mantener buenas prácticas y seguridad."
        },
        {
            icon: Share,
            title: "Marketing verificado",
            description: "Comparte tu score o insignia con un widget y respalda tu marca."
        },
        {
            icon: Shield,
            title: "Ventaja competitiva",
            description: "Un SentinelScore alto es tu carta de presentación en blockchain."
        }
    ];

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

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {benefits.slice(0, 3).map((benefit, index) => (
                            <div
                                key={index}
                                className="blockchair-card p-4 coingecko-hover group"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                    <benefit.icon className="w-5 h-5 text-foreground" />
                                </div>

                                {/* Content */}
                                <h3 className="text-sm font-semibold text-foreground mb-2">{benefit.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom row with 2 items centered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {benefits.slice(3).map((benefit, index) => (
                            <div
                                key={index + 3}
                                className="blockchair-card p-4 coingecko-hover group"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                    <benefit.icon className="w-5 h-5 text-foreground" />
                                </div>

                                {/* Content */}
                                <h3 className="text-sm font-semibold text-foreground mb-2">{benefit.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;