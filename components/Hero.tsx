// components/Hero.tsx
import React, { useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button } from "@components/ui/button";
import { ArrowRight, Shield, TrendingUp, Award } from "lucide-react";

// Importaciones de Partículas
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";

const Hero = () => {
    const { t } = useTranslation('common');
    const [particlesInit, setParticlesInit] = useState(false);

    // Efecto para inicializar el motor de partículas
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setParticlesInit(true);
        });
    }, []);

    // Opciones para las partículas
    const particlesOptions: RecursivePartial<IOptions> = useMemo(
        () => ({
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                },
            },
            particles: {
                color: { value: "#ffffff" },
                links: { enable: false },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: { default: OutMode.bounce },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: { enable: true },
                    value: 80,
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <section className="relative overflow-hidden bg-gray-900 backdrop-blur-lg pt-16 lg:pt-24 pb-10 lg:pb-10" style={{
            backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/mask.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundAttachment: 'scroll'
        }}>

            {/* Partículas de fondo */}
            {/* {particlesInit && (
                <Particles
                    id="tsparticles-hero"
                    className="absolute inset-0 w-full h-full z-0"
                    options={particlesOptions}
                />
            )} */}

            {/* Efectos de fondo sutiles (Gris / Blanco) */}
            {/* <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/2 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div> */}

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-5xl mx-auto">

                    <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect text-foreground text-sm font-medium mb-8 border border-border">
                        <Award className="w-4 h-4 mr-2" />
                        Pionero en Tech MarketCap Web3
                    </div>
                    {/* from-blue-400 to-[#55f7ed] */}
                    <h1 className="text-white hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-[#4F596196] to-foreground  bg-clip-text text-transparent">
                            Tech MarketCap
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto leading-relaxed michroma-regular">
                        Mide y demuestra tu calidad tecnológica
                    </p>

                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto michroma-regular">
                        Con <span className="text-foreground font-semibold">SentinelScore</span>, tu proyecto no solo está auditado,
                        evoluciona constantemente y gana reputación.
                    </p>

                    {/* Botones de acción (CTA) */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="/form" passHref>
                            {/* ✅ COLOR CORREGIDO: Botón principal ahora es negro/gris oscuro */}
                            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-lg px-8 py-4 group michroma-regular">
                                {t('talkToAdvisor')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/audits" passHref>
                            <Button size="lg" variant="outline" className="border-border bg-card text-foreground hover:bg-accent text-lg px-8 py-4 glass-effect michroma-regular">
                                {t('viewSuccessStoriesBtn')}
                            </Button>
                        </Link>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="text-center blockchair-card p-4 coingecko-hover">

                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-accent/50 rounded-full border border-border">
                                <Shield className="w-6 h-6 text-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-1">500+</h3>
                            <p className="text-sm text-muted-foreground">Proyectos auditados</p>
                        </div>
                        <div className="text-center blockchair-card p-4 coingecko-hover">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-accent/50 rounded-full border border-border">
                                <TrendingUp className="w-6 h-6 text-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-1">95%</h3>
                            <p className="text-sm text-muted-foreground">Mejora en seguridad</p>
                        </div>
                        <div className="text-center blockchair-card p-4 coingecko-hover">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-accent/50 rounded-full border border-border">
                                <Award className="w-6 h-6 text-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-1">24/7</h3>
                            <p className="text-sm text-muted-foreground">Monitoreo continuo</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;