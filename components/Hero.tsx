import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Button } from "@components/ui/button";
import { ArrowRight, Shield, TrendingUp, Award } from "lucide-react";
import Image from "next/image";
// Importaciones de Partículas
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";

const Hero = () => {
  const { t } = useTranslation("common");
  const [particlesInit, setParticlesInit] = useState(false);

  // Efecto para inicializar el motor de partículas
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  // Efecto Matrix Rain MEJORADO
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar tamaño del canvas al contenedor
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuración del efecto Matrix MEJORADO
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array para almacenar la posición Y de cada columna
    const drops = new Array(columns).fill(0);
    drops.forEach((_, i) => {
      drops[i] = Math.floor(Math.random() * -100);
    });

    // Función para dibujar el efecto MEJORADO
    const draw = () => {
      // Fondo semitransparente para efecto de desvanecimiento
      ctx.fillStyle = "rgba(5, 5, 7, 0.03)"; // Más sutil
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar caracteres en cada columna
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Determinar si esta letra debe brillar
        const shouldGlow = Math.random() > 0.95; // 5% de probabilidad de brillo
        
        if (shouldGlow) {
          // Letra brillante
          ctx.shadowColor = "#55f7ed";
          ctx.shadowBlur = 15;
          ctx.fillStyle = "#ffffff"; // Blanco brillante
        } else {
          // Letra normal
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(85, 247, 237, 0.3)"; // Azul aguamarina más visible
        }

        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.fillText(text, x, y);

        // Resetear la posición si llega al final o aleatoriamente
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        }

        // Mover la gota hacia abajo
        drops[i]++;
      }
    };

    // Iniciar animación
    const interval = setInterval(draw, 60); // Más fluido

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);
    };
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
        opacity: { value: 0.2 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section
      className="relative overflow-hidden bg-gray-900 backdrop-blur-lg pt-16 lg:pt-24 pb-10 lg:pb-10"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 5, 7, 0.6), rgba(10, 10, 15, 0.6)), url('/poly1.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Canvas para el efecto Matrix MEJORADO */}
      <canvas 
        id="matrix-canvas" 
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Partículas de fondo */}
      {particlesInit && (
        <Particles
          id="tsparticles-hero"
          className="absolute inset-0 w-full h-full z-0"
          options={particlesOptions}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect text-foreground text-sm font-medium mb-8 border border-border">
            <Award className="w-4 h-4 mr-2" />
            Pionero en Tech MarketCap Web3
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Image
              className="block mx-auto md:mx-0"
              height={80}
              width={80}
              src={"/sentinel-logo.png"}
              alt={"sentinel-logo"}
            />
            <h1
              className="text-white hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-center md:text-left"
            >
              SENTINEL IA
            </h1>
          </div>
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
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-lg px-8 py-4 group michroma-regular"
              >
                {t("talkToAdvisor")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/audits" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent text-lg px-8 py-4 glass-effect michroma-regular"
              >
                {t("viewSuccessStoriesBtn")}
              </Button>
            </Link>
          </div>

          {/* Estadísticas - TARJETAS CON IMÁGENES DE FONDO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {/* Tarjeta 1 - Proyectos auditados */}
            <div className="p-6 rounded-2xl border border-cyan-400/50 backdrop-blur-md bg-transparent shadow-lg hover:shadow-2xl hover:border-cyan-300/80 hover:shadow-[0_0_15px_5px_rgba(85,247,237,0.8)] transition-all duration-300 text-white/90">
              <div
                className="w-full h-32 mb-4"
                style={{
                  backgroundImage: `url('/im1.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top', // Mostrar desde la parte superior
                  backgroundRepeat: 'no-repeat',
                }}
              >
                &nbsp;
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-100 mb-1">Proyectos</h3>
                <p className="text-sm text-white/70">auditados</p>
              </div>
            </div>

            {/* Tarjeta 2 - Mejora en seguridad */}
            <div className="p-6 rounded-2xl border border-cyan-400/50 backdrop-blur-md bg-transparent shadow-lg hover:shadow-2xl hover:border-cyan-300/80 hover:shadow-[0_0_15px_5px_rgba(85,247,237,0.8)] transition-all duration-300 text-white/90">
              <div
                className="w-full h-32 mb-4"
                style={{
                  backgroundImage: `url('/scan.svg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center', // Mantener centrado para el SVG
                  backgroundRepeat: 'no-repeat',
                }}
              >
                &nbsp;
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-emerald-100 mb-1">Mejora</h3>
                <p className="text-sm text-white/70">en seguridad</p>
              </div>
            </div>

            {/* Tarjeta 3 - Monitoreo continuo */}
            <div className="p-6 rounded-2xl border border-cyan-400/50 backdrop-blur-md bg-transparent shadow-lg hover:shadow-2xl hover:border-cyan-300/80 hover:shadow-[0_0_15px_5px_rgba(85,247,237,0.8)] transition-all duration-300 text-white/90">
              <div
                className="w-full h-32 mb-4"
                style={{
                  backgroundImage: `url('/im3.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top', // Mostrar desde la parte superior
                  backgroundRepeat: 'no-repeat',
                }}
              >
                &nbsp;
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-indigo-100 mb-1">Monitoreo</h3>
                <p className="text-sm text-white/70">continuo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;