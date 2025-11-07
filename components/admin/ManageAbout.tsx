import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { AboutPageSettings } from '../../types';

const ManageAbout: React.FC = () => {
    const { t } = useTranslation();
    const { aboutSettings, updateAboutSettings } = useContext(DataContext);
    
    const [localSettings, setLocalSettings] = useState<AboutPageSettings | null>(aboutSettings);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setLocalSettings(aboutSettings);
    }, [aboutSettings]);

    if (!localSettings) {
        return <div>Loading settings...</div>;
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleTranslatableChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.'); // e.g., "ourStory.ar"
        
        setLocalSettings(prev => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (localSettings) {
            await updateAboutSettings(localSettings);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('aboutTitle')} Settings</h1>
             <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg space-y-6">
                
                <div>
                    <label htmlFor="mainImageUrl" className="block text-sm font-medium text-gray-300">Main Image URL</label>
                    <input type="url" name="mainImageUrl" id="mainImageUrl" value={localSettings.mainImageUrl} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ourStory.ar" className="block text-sm font-medium text-gray-300">{t('ourStoryTitle')} (Arabic)</label>
                        <textarea name="ourStory.ar" id="ourStory.ar" value={localSettings.ourStory.ar} onChange={handleTranslatableChange} required rows={8} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                    <div>
                        <label htmlFor="ourStory.en" className="block text-sm font-medium text-gray-300">{t('ourStoryTitle')} (English)</label>
                        <textarea name="ourStory.en" id="ourStory.en" value={localSettings.ourStory.en} onChange={handleTranslatableChange} required rows={8} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ourPhilosophy.ar" className="block text-sm font-medium text-gray-300">{t('ourPhilosophyTitle')} (Arabic)</label>
                        <textarea name="ourPhilosophy.ar" id="ourPhilosophy.ar" value={localSettings.ourPhilosophy.ar} onChange={handleTranslatableChange} required rows={8} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                    <div>
                        <label htmlFor="ourPhilosophy.en" className="block text-sm font-medium text-gray-300">{t('ourPhilosophyTitle')} (English)</label>
                        <textarea name="ourPhilosophy.en" id="ourPhilosophy.en" value={localSettings.ourPhilosophy.en} onChange={handleTranslatableChange} required rows={8} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ourTeam.ar" className="block text-sm font-medium text-gray-300">{t('ourTeamTitle')} (Arabic)</label>
                        <textarea name="ourTeam.ar" id="ourTeam.ar" value={localSettings.ourTeam.ar} onChange={handleTranslatableChange} required rows={8} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                    <div>
                        <label htmlFor="ourTeam.en" className="block text-sm font-medium text-gray-300">{t('ourTeamTitle')} (English)</label>
                        <textarea name="ourTeam.en" id="ourTeam.en" value={localSettings.ourTeam.en} onChange={handleTranslatableChange} required rows={8} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
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

export default ManageAbout;
