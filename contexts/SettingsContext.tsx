import React, { createContext, ReactNode, useContext } from 'react';
import type { SiteSettings } from '../types';
import { DataContext } from './DataProvider';

interface SettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: SiteSettings) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const { siteSettings, updateSiteSettings } = useContext(DataContext);

    // DataProvider now handles the fallback, so we can expect siteSettings to always be available.
    if (!siteSettings) {
        return null; // or a loading spinner, while DataProvider initializes
    }

    const value = { 
        settings: siteSettings, 
        updateSettings: updateSiteSettings 
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};