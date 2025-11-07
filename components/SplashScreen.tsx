import React, { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { useTranslation } from '../hooks/useTranslation';

const SplashScreen: React.FC = () => {
    const { settings } = useContext(SettingsContext);
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 bg-[#1a1a1a] z-[100] flex items-center justify-center animate-fadeOut">
            <img 
                src={settings.logoUrl} 
                alt={t('restaurantName')} 
                className="w-auto h-24 animate-pulse"
            />
        </div>
    );
};

export default SplashScreen;