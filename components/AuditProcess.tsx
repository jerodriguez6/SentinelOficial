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

                {/* Process Steps - Horizontal layout like in the image */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Connection line */}
                        <div className="absolute top-[2rem] left-0 right-0 h-0.5 metalic z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {steps.map((step, index) => (
                                <div key={step.number} className="text-center">
                                    {/* Step Circle */}
                                    <div className="w-16 h-16 metalic rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto relative z-10">
                                        {step.number}
                                    </div>

                                    {/* Step Content */}
                                    <div className="bg-gradient-to-r from-[#4F596196] to-foreground/3 rounded-lg border border-border p-4">
                                        <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-12">
                        <div className="bg-gradient-to-l from-[#4F596196] to-foreground/3 rounded-xl border border-border p-6">
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                ¿Listo para comenzar tu evolución tecnológica?
                            </h3>
                            <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                                Únete a los proyectos más innovadores y construye una reputación sólida en el ecosistema Web3
                            </p>
                            <Button className="metalic-clasic text-white metalic-clasic-hover font-semibold px-6 py-2">
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