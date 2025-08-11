import React from "react";
import { Badge } from "./Badge";
import { Button } from "./ui/button";

const AuditProcess = () => {
    const steps = [
        { number: '01', title: 'Análisis Inicial', description: 'Escaneo automático del código fuente' },
        { number: '02', title: 'IA Processing', description: 'Análisis profundo con modelos especializados' },
        { number: '03', title: 'Validación', description: 'Verificación manual por expertos' },
        { number: '04', title: 'Reporte Final', description: 'Entrega de resultados y recomendaciones' },
    ];

    // Función para redirigir a WhatsApp
    const redirectToWhatsApp = () => {
        const phoneNumber = '573175090528';
        const message = 'Hola, estoy interesado en comenzar mi evolución tecnológica.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <section id="como-funciona" className="py-16 relative bg-[#09090B]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="border-primary/50 text-white mb-4">
                        Proceso SentinelScore
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Proceso de Auditoría IA
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        De código fuente a reporte completo en tiempo record
                    </p>
                </div>

                {/* Process Steps - Horizontal layout */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Circles and cards - SIN LÍNEA HORIZONTAL */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {steps.map((step, index) => (
                                <div key={step.number} className="text-center">
                                    {/* Step Circle with circular border and aquamarine color */}
                                    <div className="w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto relative bg-transparent">
                                        {/* Circulating glow effect */}
                                        <div className="absolute inset-0 rounded-full animate-spin-slow"></div>
                                        {step.number}
                                    </div>

                                    {/* Step Content - Futuristic cards */}
                                    <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-cyan-400 p-4 hover:bg-cyan-400/10 transition-all duration-300 shadow-lg shadow-cyan-400/10">
                                        <h3 className="text-lg font-bold text-cyan-400 mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-300">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-12">
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-400 p-6 hover:bg-cyan-400/10 transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3">
                                ¿Listo para comenzar tu evolución tecnológica?
                            </h3>
                            <p className="text-gray-300 mb-4 max-w-xl mx-auto">
                                Únete a los proyectos más innovadores y construye una reputación sólida en el ecosistema Web3
                            </p>
                            {/* Botón modificado para redirigir a WhatsApp */}
                            <Button 
                                onClick={redirectToWhatsApp}
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 font-semibold px-6 py-2 transition-all duration-300 cursor-pointer"
                            >
                                Hablar con un asesor
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuditProcess;