import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { translations } from '../lib/translations';

export const useTranslation = () => {
  const { language } = useContext(AppContext);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return the key itself if not found
      }
    }
    return result || key;
  };
  
  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/menu', label: t('navMenu') },
    { path: '/offers', label: t('navOffers') },
    { path: '/deals', label: t('navDeals') },
    { path: '/about', label: t('navAbout') },
    { path: '/gallery', label: t('navGallery') },
    { path: '/contact', label: t('navContact') },
  ];

  const menuCategories = Object.entries(t('menuCategories')).map(([key, label]) => ({
      key,
      label,
  }));

  return { t, language, navLinks, menuCategories };
};