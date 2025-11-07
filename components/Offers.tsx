import React, { useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { DataContext } from '../contexts/DataProvider';
import MenuItemCard from './MenuItemCard';

const Offers: React.FC = () => {
  const { t } = useTranslation();
  const { menuItems } = useContext(DataContext);

  const comboDeals = menuItems.filter(item => item.category === 'combo' || item.originalPrice);


  return (
    <div className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('comboDealsTitle')}</h1>
          <p className="mt-4 text-lg text-gray-400">{t('comboDealsSubtitle')}</p>
        </div>

        {comboDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comboDeals.map(deal => (
              <MenuItemCard key={deal.id} item={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-xl py-10">
            <p>{t('noComboDeals')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;