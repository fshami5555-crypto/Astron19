import React, { useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../contexts/AppContext';
import { DataContext } from '../contexts/DataProvider';
import { useDealStatus } from '../hooks/useDealStatus';
import type { Offer } from '../types';
import { DealContext } from '../contexts/DealContext';

const DealCard: React.FC<{ deal: Offer }> = ({ deal }) => {
    const { language } = useContext(AppContext);
    const { t } = useTranslation();
    const { openDealModal } = useContext(DealContext);
    const isActive = useDealStatus(deal);

    const handleDealClick = () => {
        if (isActive && deal.rules) {
            openDealModal(deal);
        }
    };

    return (
        <button
            onClick={handleDealClick}
            disabled={!isActive || !deal.rules}
            className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 text-left w-full ${!isActive || !deal.rules ? 'opacity-70 cursor-not-allowed' : 'transform hover:-translate-y-2 cursor-pointer'}`}
        >
            <div className="absolute top-4 ltr:right-4 rtl:left-4 z-10">
                <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                    {isActive ? t('activeNow') : t('inactive')}
                </span>
            </div>
            
            <img className="w-full h-64 object-cover" src={deal.image} alt={deal.title[language]} />
            
            {!isActive && <div className="absolute inset-0 bg-black/50"></div>}

            <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{deal.title[language]}</h3>
                <p className="mt-2 text-gray-400">{deal.description[language]}</p>
                {!isActive && deal.availabilityText && (
                     <p className="mt-4 text-amber-400 font-semibold border-t border-gray-700 pt-3">
                        {deal.availabilityText[language]}
                    </p>
                )}
            </div>
        </button>
    );
};


const DailyDeals: React.FC = () => {
  const { t } = useTranslation();
  const { dailyDeals } = useContext(DataContext);

  return (
    <div className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('dailyDealsTitle')}</h1>
          <p className="mt-4 text-lg text-gray-400">{t('dailyDealsSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dailyDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyDeals;