import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { SettingsContext } from '../contexts/SettingsContext';
import { DataContext } from '../contexts/DataProvider';
import { AppContext } from '../contexts/AppContext';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useContext(AppContext);
  const { settings } = useContext(SettingsContext);
  const { contactSettings } = useContext(DataContext);

  if (!contactSettings) return null;

  return (
    <footer className="bg-black/50 border-t border-gray-800">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
          <div>
             {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={t('restaurantName')} className="h-12 w-auto mx-auto md:mx-0" />
              ) : (
                <h3 className="text-2xl font-bold text-amber-500 font-display tracking-wider">{t('restaurantName')}</h3>
              )}
            <p className="mt-4 text-gray-400">{settings.footerDescription[language]}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">{t('quickLinks')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/menu" className="text-gray-400 hover:text-amber-500">{t('navMenu')}</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-amber-500">{t('navOffers')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-amber-500">{t('navAbout')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">{t('contactUs')}</h3>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>{contactSettings.address[language]}</p>
              <p>{contactSettings.phone}</p>
              <p>{contactSettings.email}</p>
            </div>
            <div className="mt-6 flex justify-center md:justify-start gap-6">
              <SocialIcon href={contactSettings.socialLinks.facebook}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href={contactSettings.socialLinks.twitter}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </SocialIcon>
               <SocialIcon href={contactSettings.socialLinks.instagram}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.161 1.043c-1.087.05-1.79.22-2.327.428a3.9 3.9 0 00-1.388.943 3.9 3.9 0 00-.943 1.388c-.208.537-.378 1.24-.428 2.327-.05 1.063-.06 1.373-.06 3.808s.01 2.745.06 3.808c.05 1.087.22 1.79.428 2.327.195.504.45.918.943 1.388a3.9 3.9 0 001.388.943c.537.208 1.24.378 2.327.428 1.063.05 1.373.06 3.808.06s2.745-.01 3.808-.06c1.087-.05 1.79-.22 2.327-.428a3.9 3.9 0 001.388-.943 3.9 3.9 0 00.943-1.388c.208-.537.378-1.24.428-2.327.05-1.063.06-1.373.06-3.808s-.01-2.745-.06-3.808c-.05-1.087-.22-1.79-.428-2.327a3.9 3.9 0 00-.943-1.388 3.9 3.9 0 00-1.388-.943c-.537-.208-1.24-.378-2.327-.428-1.063-.05-1.373-.06-3.808-.06zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-base text-gray-400">{t('copyright')}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t('designedByPart1')}
            <a 
              href="https://www.instagram.com/the_bloovimedia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-500 hover:underline font-semibold"
            >
              {t('designedByBloovi')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;