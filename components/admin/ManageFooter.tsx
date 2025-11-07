import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { SiteSettings, ContactPageSettings } from '../../types';

const ManageFooter: React.FC = () => {
    const { t } = useTranslation();
    const { siteSettings, contactSettings, updateSiteSettings, updateContactSettings } = useContext(DataContext);
    
    const [localSiteSettings, setLocalSiteSettings] = useState<SiteSettings | null>(siteSettings);
    const [localContactSettings, setLocalContactSettings] = useState<ContactPageSettings | null>(contactSettings);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setLocalSiteSettings(siteSettings);
    }, [siteSettings]);
    
    useEffect(() => {
        setLocalContactSettings(contactSettings);
    }, [contactSettings]);

    if (!localSiteSettings || !localContactSettings) {
        return <div>Loading settings...</div>;
    }
    
    const handleSiteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.');
        
        setLocalSiteSettings(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [field]: {
                    ...(prev as any)[field],
                    [lang]: value
                }
            };
        });
    }

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
         setLocalContactSettings(prev => {
            if (!prev) return null;
            return {
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [name]: value
                }
            };
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (localSiteSettings && localContactSettings) {
            await Promise.all([
                updateSiteSettings(localSiteSettings),
                updateContactSettings(localContactSettings)
            ]);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('manageFooter')}</h1>
             <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg space-y-6">
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="footerDescription.ar" className="block text-sm font-medium text-gray-300">{t('footerDescriptionLabel')} (Arabic)</label>
                        <textarea name="footerDescription.ar" id="footerDescription.ar" value={localSiteSettings.footerDescription.ar} onChange={handleSiteChange} required rows={4} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                    <div>
                        <label htmlFor="footerDescription.en" className="block text-sm font-medium text-gray-300">{t('footerDescriptionLabel')} (English)</label>
                        <textarea name="footerDescription.en" id="footerDescription.en" value={localSiteSettings.footerDescription.en} onChange={handleSiteChange} required rows={4} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{t('socialMediaLinksLabel')}</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-300">{t('facebookUrlLabel')}</label>
                            <input type="url" name="facebook" id="facebook" value={localContactSettings.socialLinks.facebook} onChange={handleContactChange} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                        </div>
                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-300">{t('twitterUrlLabel')}</label>
                            <input type="url" name="twitter" id="twitter" value={localContactSettings.socialLinks.twitter} onChange={handleContactChange} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                        </div>
                        <div>
                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-300">{t('instagramUrlLabel')}</label>
                            <input type="url" name="instagram" id="instagram" value={localContactSettings.socialLinks.instagram} onChange={handleContactChange} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                        </div>
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

export default ManageFooter;