import React, { useContext, useState } from 'react';
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
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const handleDealClick = () => {
        if (isActive && deal.rules) {
            openDealModal(deal);
        }
    };
    
    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening
        const canonicalUrl = `${window.location.origin}${window.location.pathname.replace('index.html', '')}#/deals/${deal.id}`;

        const shareData = {
            title: deal.title[language],
            text: deal.description[language],
            url: canonicalUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(canonicalUrl).then(() => {
                setIsLinkCopied(true);
                setTimeout(() => setIsLinkCopied(false), 2000);
            });
        }
    };


    return (
        <div
            onClick={handleDealClick}
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
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-bold text-white flex-grow">{deal.title[language]}</h3>
                     <button onClick={handleShare} title={t('share')} className="flex-shrink-0 bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
                        {isLinkCopied ? (
                             <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                        )}
                    </button>
                </div>

                <p className="mt-2 text-gray-400">{deal.description[language]}</p>
            </div>
        </div>
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