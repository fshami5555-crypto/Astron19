import React, { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const SiteSettings: React.FC = () => {
    const { settings, updateSettings } = useContext(SettingsContext);
    const { t } = useTranslation();
    const [localSettings, setLocalSettings] = useState(settings);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };
    
    const handleTranslatableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.'); // e.g., "heroSubtitle.ar"
        
        setLocalSettings(prev => ({
            ...prev,
            [field]: {
                ...(prev as any)[field],
                [lang]: value
            }
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateSettings(localSettings);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('siteSettingsTitle')}</h1>
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg space-y-6">
                
                <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-300">{t('logoUrlLabel')}</label>
                    <input type="url" name="logoUrl" id="logoUrl" value={localSettings.logoUrl} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                </div>

                <div>
                    <label htmlFor="heroImageUrl" className="block text-sm font-medium text-gray-300">{t('heroImageUrlLabel')}</label>
                    <input type="url" name="heroImageUrl" id="heroImageUrl" value={localSettings.heroImageUrl} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="heroTagline.ar" className="block text-sm font-medium text-gray-300">{t('heroTaglineArLabel')}</label>
                        <input name="heroTagline.ar" id="heroTagline.ar" value={localSettings.heroTagline.ar} onChange={handleTranslatableChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
                    </div>
                     <div>
                        <label htmlFor="heroTagline.en" className="block text-sm font-medium text-gray-300">{t('heroTaglineEnLabel')}</label>
                        <input name="heroTagline.en" id="heroTagline.en" value={localSettings.heroTagline.en} onChange={handleTranslatableChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="heroSubtitle.ar" className="block text-sm font-medium text-gray-300">{t('heroSubtitleArLabel')}</label>
                        <textarea name="heroSubtitle.ar" id="heroSubtitle.ar" value={localSettings.heroSubtitle.ar} onChange={handleTranslatableChange} required rows={3} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                     <div>
                        <label htmlFor="heroSubtitle.en" className="block text-sm font-medium text-gray-300">{t('heroSubtitleEnLabel')}</label>
                        <textarea name="heroSubtitle.en" id="heroSubtitle.en" value={localSettings.heroSubtitle.en} onChange={handleTranslatableChange} required rows={3} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                </div>

                <div>
                    <label htmlFor="aboutImageUrl" className="block text-sm font-medium text-gray-300">{t('aboutImageUrlLabel')}</label>
                    <input type="url" name="aboutImageUrl" id="aboutImageUrl" value={localSettings.aboutImageUrl} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="aboutSnippet.ar" className="block text-sm font-medium text-gray-300">{t('aboutSnippetArLabel')}</label>
                        <textarea name="aboutSnippet.ar" id="aboutSnippet.ar" value={localSettings.aboutSnippet.ar} onChange={handleTranslatableChange} required rows={5} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                     <div>
                        <label htmlFor="aboutSnippet.en" className="block text-sm font-medium text-gray-300">{t('aboutSnippetEnLabel')}</label>
                        <textarea name="aboutSnippet.en" id="aboutSnippet.en" value={localSettings.aboutSnippet.en} onChange={handleTranslatableChange} required rows={5} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-4 pt-4">
                    {showSuccess && <span className="text-green-400">{t('settingsSaved')}</span>}
                    <button type="submit" className="bg-amber-500 text-white font-bold py-2 px-6 rounded-md hover:bg-amber-600 transition-colors">
                        {t('save')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettings;