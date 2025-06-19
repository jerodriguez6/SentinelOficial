import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Shield, Eye, Zap, Brain, Lock, AlertTriangle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'next-i18next'; // Import useTranslation

const ServicesSection = () => {
    const { t } = useTranslation('common'); // Initialize useTranslation

    // Define services using translation keys
    const services = [
        {
            icon: Shield,
            titleKey: 'auditSmartContractsTitle',
            descriptionKey: 'auditSmartContractsDesc',
            featuresKeys: [
                'auditSmartContractsFeature1',
                'auditSmartContractsFeature2',
                'auditSmartContractsFeature3'
            ],
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: Eye,
            titleKey: 'continuousMonitoringTitle',
            descriptionKey: 'continuousMonitoringDesc',
            featuresKeys: [
                'continuousMonitoringFeature1',
                'continuousMonitoringFeature2',
                'continuousMonitoringFeature3'
            ],
            color: 'from-green-500 to-green-600'
        },
        {
            icon: Brain,
            titleKey: 'predictiveAITitle',
            descriptionKey: 'predictiveAIDesc',
            featuresKeys: [
                'predictiveAIFeature1',
                'predictiveAIFeature2',
                'predictiveAIFeature3'
            ],
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Zap,
            titleKey: 'rapidResponseTitle',
            descriptionKey: 'rapidResponseDesc',
            featuresKeys: [
                'rapidResponseFeature1',
                'rapidResponseFeature2',
                'rapidResponseFeature3'
            ],
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: Lock,
            titleKey: 'specializedConsultingTitle',
            descriptionKey: 'specializedConsultingDesc',
            featuresKeys: [
                'specializedConsultingFeature1',
                'specializedConsultingFeature2',
                'specializedConsultingFeature3'
            ],
            color: 'from-teal-500 to-teal-600'
        },
        {
            icon: AlertTriangle,
            titleKey: 'emergencyAuditsTitle',
            descriptionKey: 'emergencyAuditsDesc',
            featuresKeys: [
                'emergencyAuditsFeature1',
                'emergencyAuditsFeature2',
                'emergencyAuditsFeature3'
            ],
            color: 'from-red-500 to-red-600'
        }
    ];

    return (
        <section id="services" className="py-20 bg-gray-50 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('servicesSectionTitlePart1')}
                        <span className="bg-gradient-to-r from-sentinel-primary to-sentinel-accent bg-clip-text text-transparent"> {t('servicesSectionTitlePart2')}</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('servicesSectionDescription')}
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t(service.titleKey)}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{t(service.descriptionKey)}</p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-6">
                                        {service.featuresKeys.map((featureKey, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-sentinel-accent mr-3"></div>
                                                {t(featureKey)}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Button variant="outline" className="w-full group-hover:bg-sentinel-primary group-hover:text-white group-hover:border-sentinel-primary">
                                        {t('moreInfoBtn')}
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
                            {t('customSolutionQuestion')}
                        </h3>
                        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                            {t('customSolutionDesc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-sentinel-primary hover:bg-gray-100 px-8 py-4">
                                {t('freeConsultationBtn')}
                            </Button>
                            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4">
                                {t('viewCaseStudiesBtn')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;