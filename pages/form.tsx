// components/ContactForm.tsx
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'; // Usar next/router para Pages Router
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

    // Simula el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Simular un envío de API
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula retardo de red
            // Aquí normalmente enviarías `formData` a tu API
            console.log('Form data submitted:', formData);
            setMessage(t('formSubmittedSuccess'));
            setLoading(false);
            // Redirigir a una página de agradecimiento
            router.push('/thank-you');
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(t('formSubmissionError'));
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg my-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{t('formTitle')}</h2>
                {/* Puedes añadir un botón de cerrar si es un modal */}
                {/* <button className="text-gray-500 hover:text-gray-700">&times;</button> */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Project/Company Name */}
                <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                        {t('projectCompanyName')}*
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Your Full Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            {t('yourFullName')}*
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t('email')}*
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Job Title */}
                <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                        {t('jobTitle')}
                    </label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Telegram / WeChat / Others */}
                <div>
                    <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700">
                        {t('telegramWechatOthers')}
                    </label>
                    <input
                        type="text"
                        id="contactMethod"
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        placeholder={t('telegramWechatOthersPlaceholder')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Select Services */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('selectServicesInterest')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-800">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="auditing"
                                checked={formData.services.auditing}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('auditing')}</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="penetrationTesting"
                                checked={formData.services.penetrationTesting}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('penetrationTesting')}</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="skynetScore"
                                checked={formData.services.skynetScore}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('skynetScore')}</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="teamVerification"
                                checked={formData.services.teamVerification}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('teamVerificationContractVerificationBugBounty')}</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="advisory"
                                checked={formData.services.advisory}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('advisoryOrOtherServices')}</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="skynetQuest"
                                checked={formData.services.skynetQuest}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('skynetQuest')}</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="complianceAML"
                                checked={formData.services.complianceAML}
                                onChange={handleServiceChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{t('complianceAML')}</span>
                        </label>
                    </div>
                </div>

                {/* Additional Notes */}
                <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                        {t('additionalNotes')}
                    </label>
                    <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                </div>

                {/* reCAPTCHA placeholder (replace with actual reCAPTCHA implementation) */}
                <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 p-2 rounded-md flex items-center justify-between flex-grow">
                        <span className="text-xs text-gray-600">{t('protectedByRecaptcha')}</span>
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div> {/* Placeholder for reCAPTCHA logo */}
                    </div>
                    <span className="text-xs text-blue-600 cursor-pointer">{t('privacyTerms')}</span>
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? t('submit') + '...' : t('submit')}
                </button>
            </form>
        </div>
    );
};
export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            // Pass the translations for the 'common' namespace to the page component
            ...(await serverSideTranslations(locale, ['common'])),
            // You can add other props here if your page needs them
        },
    };
};
export default ContactForm;