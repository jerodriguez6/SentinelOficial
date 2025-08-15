import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { X } from 'lucide-react'; // Importamos el ícono de cierre

const ContactForm = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [formData, setFormData] = useState({
        projectName: '',
        fullName: '',
        email: '',
        jobTitle: '',
        contactMethod: '',
        services: {
            auditing: false,
            penetrationTesting: false,
            skynetScore: false,
            teamVerification: false,
            advisory: false,
            skynetQuest: false,
            complianceAML: false,
        },
        additionalNotes: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Maneja cambios en los campos de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Maneja cambios en los checkboxes de servicios
    const handleServiceChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                [name]: checked,
            },
        }));
    };

    // Función para redirigir a WhatsApp
    const handleTalkToAdvisor = () => {
        const message = encodeURIComponent("Hola, me gustaría obtener más información sobre Sentinel");
        window.open(`https://wa.me/573175090528?text=${message}`, '_blank');
    };

    // Función para cerrar el formulario
    const handleCloseForm = () => {
        router.push('/'); // Redirige a la página principal
    };

    // Maneja el envío del formulario a tu API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage(t('formSubmittedSuccess', '¡Formulario enviado con éxito!'));
                router.push('/');
            } else {
                const errorData = await res.json();
                setMessage(errorData.message || t('formSubmissionError', 'Error al enviar el formulario. Por favor, inténtalo de nuevo.'));
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(t('formSubmissionError', 'Error al enviar el formulario. Por favor, inténtalo de nuevo.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-transparent pt-[80px]">

            <div className="max-w-2xl mx-auto p-4 bg-transparent shadow-none my-8 pt-[60px] relative">
                {/* Botón de cierre (X) */}
                <button
                    onClick={handleCloseForm}
                    className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300 p-2 rounded-full hover:bg-cyan-900/20 transition-colors z-10"
                    aria-label="Cerrar formulario"
                    type="button"
                >
                    <X className="w-6 h-6" /> {/* Aumentado el tamaño de la X a 6x6 */}
                </button>

                <div className="flex justify-between items-center mb-4"> {/* Reducido el margen inferior del título */}
                    <h2 className="text-2xl font-bold text-cyan-400">
                        {t('formTitle', 'Protege tu Proyecto Hoy')}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Project/Company Name */}
                    <div>
                        <label htmlFor="projectName" className="block text-sm font-medium text-cyan-300">
                            {t('projectCompanyName', 'Nombre del Proyecto/Compañía')}*
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-cyan-400 rounded-md shadow-sm py-2 px-3 text-cyan-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm placeholder-cyan-400/70"
                            placeholder={t('projectCompanyName', 'Nombre del Proyecto/Compañía')}
                        />
                    </div>

                    {/* Your Full Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-cyan-300">
                                {t('yourFullName', 'Tu Nombre Completo')}*
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-cyan-400 rounded-md shadow-sm py-2 px-3 text-cyan-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm placeholder-cyan-400/70"
                                placeholder={t('yourFullName', 'Tu Nombre Completo')}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-cyan-300">
                                {t('email', 'Correo Electrónico')}*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-cyan-400 rounded-md shadow-sm py-2 px-3 text-cyan-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm placeholder-cyan-400/70"
                                placeholder={t('email', 'Correo Electrónico')}
                            />
                        </div>
                    </div>

                    {/* Job Title */}
                    <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-cyan-300">
                            {t('jobTitle', 'Cargo')}
                        </label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-cyan-400 rounded-md shadow-sm py-2 px-3 text-cyan-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-0 focus:border-cyan-400 sm:text-sm placeholder-cyan-400/70"
                            placeholder={t('jobTitle', 'Cargo')}
                        />
                    </div>

                    {/* Telegram / WeChat / Others */}
                    <div>
                        <label htmlFor="contactMethod" className="block text-sm font-medium text-cyan-300">
                            {t('telegramWechatOthers', 'Telegram / WeChat / Otros')}
                        </label>
                        <input
                            type="text"
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            placeholder={t('telegramWechatOthersPlaceholder', 'Telegram, WeChat, WhatsApp, o cualquier método preferido (por favor, especifica).')}
                            className="mt-1 block w-full border border-cyan-400 rounded-md shadow-sm py-2 px-3 text-cyan-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm placeholder-cyan-400/70"
                        />
                    </div>

                    {/* Select Services */}
                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">
                            {t('selectServicesInterest', 'Por favor, selecciona los servicios que te interesan')}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-cyan-300">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="auditing"
                                    checked={formData.services.auditing}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('auditing', 'Auditoría')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="penetrationTesting"
                                    checked={formData.services.penetrationTesting}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('penetrationTesting', 'Pruebas de Penetración')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="skynetScore"
                                    checked={formData.services.skynetScore}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('skynetScore', 'Skynet Score')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="teamVerification"
                                    checked={formData.services.teamVerification}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('teamVerificationContractVerificationBugBounty', 'Verificación de Equipo, Verificación de Contrato, Bug Bounty')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="advisory"
                                    checked={formData.services.advisory}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('advisoryOrOtherServices', 'Asesoría u otros servicios')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="skynetQuest"
                                    checked={formData.services.skynetQuest}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('skynetQuest', 'Skynet Quest')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="complianceAML"
                                    checked={formData.services.complianceAML}
                                    onChange={handleServiceChange}
                                    className="focus:ring-cyan-400 h-4 w-4 text-cyan-400 border-cyan-400 rounded bg-transparent"
                                />
                                <span className="ml-2">{t('complianceAML', 'Cumplimiento / AML')}</span>
                            </label>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label htmlFor="additionalNotes" className="block text-sm font-medium text-cyan-300">
                            {t('additionalNotes', 'Notas Adicionales')}
                        </label>
                        <textarea
                            id="additionalNotes"
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border border-cyan-400 rounded-md shadow-sm py-2 px-3 text-cyan-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm placeholder-cyan-400/70 resize-y"
                            placeholder={t('additionalNotes', 'Notas Adicionales')}
                        ></textarea>
                    </div>

                    {/* reCAPTCHA placeholder (replace with actual reCAPTCHA implementation) */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-cyan-900/20 p-2 rounded-md flex items-center justify-between flex-grow border border-cyan-400">
                            <span className="text-xs text-cyan-300">{t('protectedByRecaptcha', 'Protegido por reCAPTCHA')}</span>
                            <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                        </div>
                        <span className="text-xs text-cyan-400 cursor-pointer hover:text-cyan-300">{t('privacyTerms', 'Privacidad - Términos')}</span>
                    </div>

                    {/* Message area */}
                    {message && (
                        <p className={`text-center text-sm font-medium ${message.includes('éxito') || message.includes('success') ? 'text-cyan-400' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}

                    {/* Submit Button - Color aguamarina con bordes redondeados */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-cyan-400 rounded-full shadow-sm text-sm font-medium text-cyan-900 bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? t('submit', 'Enviar') + '...' : t('submit', 'Enviar')}
                    </button>

                    {/* Botón para Hablar con un Asesor - Borde azul oscuro con bordes redondeados */}
                    <button
                        type="button"
                        onClick={handleTalkToAdvisor}
                        className="w-full flex justify-center py-2 px-4 border border-cyan-400 rounded-full shadow-sm text-sm font-medium text-cyan-400 bg-transparent hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 mt-2 transition-colors"
                    >
                        {t('talkToAdvisor', 'Hablar con un Asesor')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;