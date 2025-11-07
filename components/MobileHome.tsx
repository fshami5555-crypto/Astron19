import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import { useTranslation } from '../hooks/useTranslation';

const MobileHome: React.FC = () => {
    const { t } = useTranslation();

    const buttons = [
        { path: '/deals', label: t('navDeals') },
        { path: '/offers', label: t('navOffers') },
        { path: '/menu', label: t('navMenu') },
    ];

    return (
        <div className="flex flex-col animate-fadeIn">
            <HeroSection />
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="grid grid-cols-1 gap-4">
                    {buttons.map(button => (
                        <Link
                            key={button.path}
                            to={button.path}
                            className="text-center bg-gray-800 text-white font-bold py-6 px-4 rounded-lg text-xl hover:bg-amber-500 transition-colors duration-300 shadow-lg"
                        >
                            {button.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileHome;
