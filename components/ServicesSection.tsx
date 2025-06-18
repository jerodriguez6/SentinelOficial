import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Shield, Eye, Zap, Brain, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
    const services = [
        {
            icon: Shield,
            title: 'Auditorías de Smart Contracts',
            description: 'Análisis exhaustivo de código con IA avanzada para detectar vulnerabilidades críticas antes del despliegue.',
            features: ['Detección automatizada', 'Reportes detallados', 'Corrección de vulnerabilidades'],
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: Eye,
            title: 'Monitoreo Continuo',
            description: 'Vigilancia 24/7 de tus contratos desplegados con alertas en tiempo real ante actividades sospechosas.',
            features: ['Alertas instantáneas', 'Dashboard en vivo', 'Análisis de comportamiento'],
            color: 'from-green-500 to-green-600'
        },
        {
            icon: Brain,
            title: 'IA Predictiva',
            description: 'Predicción de vulnerabilidades futuras usando machine learning y análisis de patrones avanzados.',
            features: ['Análisis predictivo', 'Patrones de riesgo', 'Recomendaciones IA'],
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Zap,
            title: 'Respuesta Rápida',
            description: 'Equipo de respuesta inmediata disponible 24/7 para incidentes críticos de seguridad.',
            features: ['Respuesta < 15 min', 'Mitigación automática', 'Soporte experto'],
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: Lock,
            title: 'Consultoría Especializada',
            description: 'Asesoría estratégica en seguridad blockchain por expertos con años de experiencia.',
            features: ['Estrategia de seguridad', 'Mejores prácticas', 'Capacitación de equipos'],
            color: 'from-teal-500 to-teal-600'
        },
        {
            icon: AlertTriangle,
            title: 'Auditorías de Emergencia',
            description: 'Servicios de auditoría urgente para proyectos que requieren validación inmediata.',
            features: ['Delivery < 24h', 'Prioridad máxima', 'Equipo dedicado'],
            color: 'from-red-500 to-red-600'
        }
    ];

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Servicios de
                        <span className="bg-gradient-to-r from-sentinel-primary to-sentinel-accent bg-clip-text text-transparent"> Seguridad Avanzada</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Protección integral para tu ecosistema blockchain con tecnología de vanguardia
                        y expertise humano especializado.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                                <CardContent className="p-8">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:animate-glow`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-sentinel-accent mr-3"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Button variant="outline" className="w-full group-hover:bg-sentinel-primary group-hover:text-white group-hover:border-sentinel-primary">
                                        Más información
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-sentinel-primary to-sentinel-accent rounded-2xl p-8 md:p-12 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            ¿Necesitas una solución personalizada?
                        </h3>
                        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                            Nuestro equipo de expertos puede diseñar una estrategia de seguridad específica para tu proyecto.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-sentinel-primary hover:bg-gray-100 px-8 py-4">
                                Consulta Gratuita
                            </Button>
                            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4">
                                Ver Casos de Estudio
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
