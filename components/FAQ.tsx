import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "¿Qué es SentinelScore?",
            answer: "Una métrica basada en auditorías, actualizaciones, seguridad e innovación tecnológica. Es el primer sistema que evalúa la calidad tecnológica real de proyectos Web3, no su volumen de trading."
        },
        {
            question: "¿Cada cuánto se actualiza?",
            answer: "El score se recalcula de forma automática tras cada auditoría o revisión solicitada. Además, monitoreamos continuamente las actualizaciones del código y la evolución del proyecto."
        },
        {
            question: "¿Puedo exportarlo en mi propia web?",
            answer: "Sí, te proveemos un widget personalizable con tu score e insignia. Puedes integrarlo fácilmente en tu sitio web, documentación o presentaciones para mostrar tu reputación tecnológica."
        },
        {
            question: "¿Garantiza que no hay vulnerabilidades?",
            answer: "El score mide el historial de revisiones: no promete que no haya riesgos, pero sí evidencia una alta calidad técnica continua. Es una herramienta de transparencia, no una garantía absoluta."
        },
        {
            question: "¿Cómo se calcula el SentinelScore?",
            answer: "Evaluamos múltiples factores: calidad del código, seguridad, frecuencia de actualizaciones, innovación tecnológica, respuesta a vulnerabilidades y adopción de mejores prácticas del ecosistema."
        },
        {
            question: "¿Qué diferencia a SentinelScore de otras auditorías?",
            answer: "Mientras otras auditorías son estáticas, SentinelScore es dinámico y evolutivo. Creamos un perfil público que se actualiza constantemente, similar a un 'MarketCap tecnológico' que refleja la evolución real del proyecto."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <HelpCircle className="w-8 h-8 text-foreground mr-3" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white">

                            <span className="bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent">
                                Preguntas{" "}frecuentes
                            </span>
                        </h2>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Resolvemos todas tus dudas sobre SentinelScore y nuestro sistema de evaluación tecnológica
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                                >
                                    <h3 className="text-lg font-semibold text-white pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-blue-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {openIndex === index && (
                                    <div className="px-6 pb-6">
                                        <div className="border-t border-white/10 pt-4">
                                            <p className="text-gray-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="text-center mt-12">
                        <div className="bg-gradient-to-l from-[#4F596196] to-foreground/3 rounded-2xl border border-blue-500/20 p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                ¿Tienes más preguntas?
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Nuestro equipo está aquí para ayudarte a entender cómo SentinelScore puede impulsar tu proyecto
                            </p>
                            <button className="metalic-clasic metalic-clasic-hover text-white font-semibold px-8 py-3 rounded-lg transition-all">
                                Contactar equipo de soporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
