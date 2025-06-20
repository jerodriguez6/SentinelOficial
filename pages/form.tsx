// components/ContactForm.tsx
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'; // Usar next/router para Pages Router
// serverSideTranslations no es necesario en este componente, se usa en las páginas

const ContactForm: React.FC = () => {
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Maneja cambios en los checkboxes de servicios
    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                [name]: checked,
            },
        }));
    };

    // Nueva función para redirigir a la página del asesor
    const handleTalkToAdvisor = () => {
        router.push('/advisor-chat'); // Redirige a la página de chat con un asesor
    };

    // Maneja el envío del formulario a tu API
    const handleSubmit = async (e: React.FormEvent) => {
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
                setMessage(t('formSubmittedSuccess'));
                router.push('/thank-you');
            } else {
                const errorData = await res.json();
                setMessage(errorData.message || t('formSubmissionError'));
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(t('formSubmissionError'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white pt-[80px]">

            <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg my-8 pt-[120px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{t('formTitle')}</h2> {/* Texto más oscuro para fondo blanco */}
                    {/* Puedes añadir un botón de cerrar si es un modal */}
                    {/* <button className="text-gray-500 hover:text-gray-700">&times;</button> */}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Project/Company Name */}
                    <div>
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-800">
                            {t('projectCompanyName')}*
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            required
                            // Estilo de input para fondo blanco
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-sentinel-primary focus:border-sentinel-primary sm:text-sm"
                        />
                    </div>

                    {/* Your Full Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-800">
                                {t('yourFullName')}*
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-sentinel-primary focus:border-sentinel-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                                {t('email')}*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-sentinel-primary focus:border-sentinel-primary sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Job Title */}
                    <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-800">
                            {t('jobTitle')}
                        </label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-sentinel-primary focus:border-sentinel-primary sm:text-sm"
                        />
                    </div>

                    {/* Telegram / WeChat / Others */}
                    <div>
                        <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-800">
                            {t('telegramWechatOthers')}
                        </label>
                        <input
                            type="text"
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            placeholder={t('telegramWechatOthersPlaceholder')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-sentinel-primary focus:border-sentinel-primary sm:text-sm"
                        />
                    </div>

                    {/* Select Services */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            {t('selectServicesInterest')}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-800">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="auditing"
                                    checked={formData.services.auditing}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('auditing')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="penetrationTesting"
                                    checked={formData.services.penetrationTesting}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('penetrationTesting')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="skynetScore"
                                    checked={formData.services.skynetScore}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('skynetScore')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="teamVerification"
                                    checked={formData.services.teamVerification}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('teamVerificationContractVerificationBugBounty')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="advisory"
                                    checked={formData.services.advisory}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('advisoryOrOtherServices')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="skynetQuest"
                                    checked={formData.services.skynetQuest}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('skynetQuest')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="complianceAML"
                                    checked={formData.services.complianceAML}
                                    onChange={handleServiceChange}
                                    className="focus:ring-sentinel-primary h-4 w-4 text-sentinel-primary border-gray-300 rounded"
                                />
                                <span className="ml-2">{t('complianceAML')}</span>
                            </label>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-800">
                            {t('additionalNotes')}
                        </label>
                        <textarea
                            id="additionalNotes"
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-sentinel-primary focus:border-sentinel-primary sm:text-sm"
                        ></textarea>
                    </div>

                    {/* reCAPTCHA placeholder (replace with actual reCAPTCHA implementation) */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-100 p-2 rounded-md flex items-center justify-between flex-grow"> {/* Fondo más claro */}
                            <span className="text-xs text-gray-700">{t('protectedByRecaptcha')}</span>
                            <div className="w-6 h-6 bg-gray-400 rounded-full"></div> {/* Placeholder for reCAPTCHA logo */}
                        </div>
                        <span className="text-xs text-sentinel-primary cursor-pointer">{t('privacyTerms')}</span> {/* Color rojo */}
                    </div>

                    {/* Message area */}
                    {message && (
                        <p className={`text-center text-sm font-medium ${message.includes('éxito') || message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        // Color de botón del Hero: bg-sentinel-primary
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sentinel-primary hover:bg-sentinel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sentinel-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? t('submit') + '...' : t('submit')}
                    </button>

                    {/* Botón para Hablar con un Asesor (Secundario) */}
                    <button
                        type="button"
                        onClick={handleTalkToAdvisor}
                        // Color de botón del Hero (secundario): bg-white text-sentinel-primary border-sentinel-primary
                        className="w-full flex justify-center py-2 px-4 border border-sentinel-primary rounded-md shadow-sm text-sm font-medium text-sentinel-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sentinel-primary mt-2"
                    >
                        {t('talkToAdvisor')}
                    </button>
                </form>
            </div>
        </div>
    );
};

// getStaticProps es para la página, no para el componente.
// Si este componente se usa en una página como pages/contacto.tsx,
// el getStaticProps DEBE estar en pages/contacto.tsx.
// Lo he comentado aquí para evitar confusiones y errores si este archivo es solo un componente.
// export const getStaticProps = async ({ locale }: { locale: string }) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['common'])),
//         },
//     };
// };

export default ContactForm;