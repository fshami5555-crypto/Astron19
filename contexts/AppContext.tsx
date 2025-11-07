import React, { createContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
}

export const AppContext = createContext<AppContextType>({
  language: 'ar',
  toggleLanguage: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'ar' ? 'en' : 'ar'));
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
