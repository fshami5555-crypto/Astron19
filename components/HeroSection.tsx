import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { useTranslation } from '../hooks/useTranslation';

interface HeroSectionProps {
    children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
    const { settings } = useContext(SettingsContext);
    const { language } = useContext(AppContext);
    const { t } = useTranslation();

    return (
        <section
            className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url('${settings.heroImageUrl}')` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 text-center px-4">
                <img
                    src={settings.logoUrl}
                    alt={t('restaurantName')}
                    className="w-auto h-28 md:h-36 lg:h-48 mx-auto drop-shadow-lg"
                />
                <p className="mt-4 text-lg md:text-xl tracking-[0.2em] text-gray-300 uppercase">
                    {settings.heroTagline[language]}
                </p>
                {children}
            </div>
        </section>
    );
};

export default HeroSection;
