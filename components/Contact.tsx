import React, { useContext, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { DataContext } from '../contexts/DataProvider';
import { AppContext } from '../contexts/AppContext';

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const { contactSettings } = useContext(DataContext);
    const { language } = useContext(AppContext);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    if (!contactSettings) {
        return <div>Loading...</div>;
    }

    return (
        <div className="py-20 bg-[#1a1a1a] animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('contactTitle')}</h1>
                    <p className="mt-4 text-lg text-gray-400">{t('contactSubtitle')}</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold text-white mb-2">{t('contactInfo')}</h2>
                        <p className="text-gray-400 mb-6">{t('contactInfoSubtitle')}</p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-amber-500">{t('addressTitle')}</h3>
                                <p className="text-gray-300">{contactSettings.address[language]}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-amber-500">{t('phoneTitle')}</h3>
                                <p className="text-gray-300">{contactSettings.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-amber-500">{t('emailTitle')}</h3>
                                <p className="text-gray-300">{contactSettings.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
                        {formSubmitted ? (
                            <div className="text-center h-full flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-green-400">{t('formSuccess')}</h2>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('formName')}</label>
                                    <input type="text" name="name" id="name" required className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('formEmail')}</label>
                                    <input type="email" name="email" id="email" required className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">{t('formMessage')}</label>
                                    <textarea name="message" id="message" rows={4} required className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-full hover:bg-amber-600 transition-colors duration-300 text-lg">
                                        {t('formSubmit')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">{t('ourLocation')}</h2>
                    <div className="overflow-hidden rounded-lg shadow-2xl">
                        <img src={contactSettings.mapImageUrl} alt={t('ourLocation')} className="w-full h-auto object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
