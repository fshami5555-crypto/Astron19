import React, { useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { DataContext } from '../contexts/DataProvider';
import { AppContext } from '../contexts/AppContext';

const About: React.FC = () => {
  const { t } = useTranslation();
  const { aboutSettings } = useContext(DataContext);
  const { language } = useContext(AppContext);

  if (!aboutSettings) {
    return <div>Loading...</div>; // Or some other placeholder
  }

  return (
    <div className="py-20 bg-[#1a1a1a] animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('aboutTitle')}</h1>
          <p className="mt-4 text-lg text-gray-400">{t('aboutSubtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-last">
            <img src={aboutSettings.mainImageUrl} alt={t('ourStoryTitle')} className="rounded-lg shadow-2xl w-full h-auto object-cover"/>
          </div>
          <div>
            <h2 className="text-4xl font-bold font-display text-amber-400 mb-4">{t('ourStoryTitle')}</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {aboutSettings.ourStory[language]}
            </p>
          </div>
        </div>
        
        <div className="mt-20 space-y-16 text-center">
          <div>
            <h2 className="text-4xl font-bold font-display text-amber-400 mb-4">{t('ourPhilosophyTitle')}</h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
              {aboutSettings.ourPhilosophy[language]}
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold font-display text-amber-400 mb-4">{t('ourTeamTitle')}</h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
               {aboutSettings.ourTeam[language]}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
