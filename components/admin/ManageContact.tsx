import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { ContactPageSettings } from '../../types';

const ManageContact: React.FC = () => {
    const { t } = useTranslation();
    const { contactSettings, updateContactSettings } = useContext(DataContext);
    
    const [localSettings, setLocalSettings] = useState<ContactPageSettings | null>(contactSettings);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setLocalSettings(contactSettings);
    }, [contactSettings]);

    if (!localSettings) {
        return <div>Loading settings...</div>;
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleTranslatableChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.');
        
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
            await updateContactSettings(localSettings);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('contactTitle')} Settings</h1>
             <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg space-y-6">
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="address.ar" className="block text-sm font-medium text-gray-300">{t('addressTitle')} (Arabic)</label>
                        <textarea name="address.ar" id="address.ar" value={localSettings.address.ar} onChange={handleTranslatableChange} required rows={3} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                    <div>
                        <label htmlFor="address.en" className="block text-sm font-medium text-gray-300">{t('addressTitle')} (English)</label>
                        <textarea name="address.en" id="address.en" value={localSettings.address.en} onChange={handleTranslatableChange} required rows={3} className="mt-1 w-full bg-gray-700 rounded p-2 text-white"></textarea>
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">{t('phoneTitle')}</label>
                    <input type="tel" name="phone" id="phone" value={localSettings.phone} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('emailTitle')}</label>
                    <input type="email" name="email" id="email" value={localSettings.email} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                </div>

                <div>
                    <label htmlFor="mapImageUrl" className="block text-sm font-medium text-gray-300">Map Image URL</label>
                    <input type="url" name="mapImageUrl" id="mapImageUrl" value={localSettings.mapImageUrl} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
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

export default ManageContact;
