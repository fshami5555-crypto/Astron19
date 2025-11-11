import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../contexts/AppContext';
import { DataContext } from '../contexts/DataProvider';
import { SettingsContext } from '../contexts/SettingsContext';
import HeroSection from './HeroSection';
import { useDealStatus } from '../hooks/useDealStatus';
import type { Offer } from '../types';
import { DealContext } from '../contexts/DealContext';
import MenuItemCard from './MenuItemCard';

const HomeDealCard: React.FC<{ deal: Offer }> = ({ deal }) => {
    const { language } = useContext(AppContext);
    const { t } = useTranslation();
    const { openDealModal } = useContext(DealContext);
    const isActive = useDealStatus(deal);

    const handleDealClick = () => {
      if (isActive && deal.rules) {
        openDealModal(deal);
      }
    }

    return (
        <button
          onClick={handleDealClick}
          disabled={!isActive || !deal.rules}
          className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row items-center transition-all duration-300 w-full text-left ${isActive && deal.rules ? 'transform hover:-translate-y-2 cursor-pointer' : 'opacity-70 cursor-not-allowed'}`}
        >
            <div className="absolute top-2 ltr:left-2 rtl:right-2 z-10">
                <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full ${isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                    {isActive ? t('activeNow') : t('inactive')}
                </span>
            </div>
            <img className="w-full md:w-1/3 h-48 md:h-full object-cover" src={deal.image} alt={deal.title[language]} />
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{deal.title[language]}</h3>
                <p className="mt-2 text-gray-400">{deal.description[language]}</p>
            </div>
        </button>
    );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useContext(AppContext);
  const { menuItems, dailyDeals } = useContext(DataContext);
  const { settings } = useContext(SettingsContext);
  
  const featuredDishes = menuItems.slice(0, 3);
  const featuredCombos = menuItems.filter(item => item.category === 'combo').slice(0, 4);
  const featuredDeals = dailyDeals.slice(0, 3);

  return (
    <div className="animate-fadeIn">
      <HeroSection>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
          {settings.heroSubtitle[language]}
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-block bg-amber-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition-transform duration-300 transform hover:scale-105"
        >
          {t('viewMenu')}
        </Link>
      </HeroSection>
      
      {/* Featured Dishes Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold font-display text-amber-500">{t('featuredDishesTitle')}</h2>
            <p className="mt-2 text-gray-400">{t('featuredDishesSubtitle')}</p>
          </div>
          {featuredDishes.length >= 3 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Large item */}
                <Link to={`/menu/${featuredDishes[0].id}`} className="group relative rounded-lg overflow-hidden shadow-lg h-[600px] block">
                    {featuredDishes[0].originalPrice && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold rounded-full px-3 py-1 z-10">
                            {Math.round(((featuredDishes[0].originalPrice - featuredDishes[0].price) / featuredDishes[0].originalPrice) * 100)}% {t('discountOff')}
                        </div>
                    )}
                    <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" src={featuredDishes[0].image} alt={featuredDishes[0].name[language]} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h3 className="text-3xl font-bold">{featuredDishes[0].name[language]}</h3>
                        <p className="mt-2 text-gray-300 max-w-md">{featuredDishes[0].description[language]}</p>
                        <div className="mt-4 text-2xl font-semibold text-amber-500 flex items-baseline gap-3">
                            <span>{featuredDishes[0].price.toFixed(2)} {t('currency')}</span>
                            {featuredDishes[0].originalPrice && (
                                <del className="text-gray-400 text-lg">{featuredDishes[0].originalPrice.toFixed(2)} {t('currency')}</del>
                            )}
                        </div>
                    </div>
                </Link>
                {/* Two smaller items */}
                <div className="grid grid-cols-1 gap-8">
                    <Link to={`/menu/${featuredDishes[1].id}`} className="group relative rounded-lg overflow-hidden shadow-lg h-[284px] block">
                         {featuredDishes[1].originalPrice && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                                {Math.round(((featuredDishes[1].originalPrice - featuredDishes[1].price) / featuredDishes[1].originalPrice) * 100)}% {t('discountOff')}
                            </div>
                        )}
                        <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" src={featuredDishes[1].image} alt={featuredDishes[1].name[language]} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-2xl font-bold">{featuredDishes[1].name[language]}</h3>
                            <div className="mt-2 text-xl font-semibold text-amber-500 flex items-baseline gap-2">
                                <span>{featuredDishes[1].price.toFixed(2)} {t('currency')}</span>
                                {featuredDishes[1].originalPrice && (
                                    <del className="text-gray-400 text-base">{featuredDishes[1].originalPrice.toFixed(2)} {t('currency')}</del>
                                )}
                            </div>
                        </div>
                    </Link>
                    <Link to={`/menu/${featuredDishes[2].id}`} className="group relative rounded-lg overflow-hidden shadow-lg h-[284px] block">
                        {featuredDishes[2].originalPrice && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                                {Math.round(((featuredDishes[2].originalPrice - featuredDishes[2].price) / featuredDishes[2].originalPrice) * 100)}% {t('discountOff')}
                            </div>
                        )}
                        <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" src={featuredDishes[2].image} alt={featuredDishes[2].name[language]} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-2xl font-bold">{featuredDishes[2].name[language]}</h3>
                            <div className="mt-2 text-xl font-semibold text-amber-500 flex items-baseline gap-2">
                                <span>{featuredDishes[2].price.toFixed(2)} {t('currency')}</span>
                                {featuredDishes[2].originalPrice && (
                                    <del className="text-gray-400 text-base">{featuredDishes[2].originalPrice.toFixed(2)} {t('currency')}</del>
                                )}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
          )}
        </div>
      </section>

      {/* Combo Deals Section */}
      {featuredCombos.length > 0 && (
          <section className="py-20 bg-[#1f1f1f]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold font-display text-amber-500">{t('homeCombosTitle')}</h2>
                <p className="mt-2 text-gray-400">{t('homeCombosSubtitle')}</p>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredCombos.map((deal) => (
                  <MenuItemCard key={deal.id} item={deal} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/offers" className="inline-block text-amber-500 font-semibold hover:text-amber-400 text-lg">
                    {t('viewAllCombos')} {language === 'ar' ? <>&larr;</> : <>&rarr;</>}
                </Link>
              </div>
            </div>
          </section>
      )}

      {/* Daily Deals Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold font-display text-amber-500">{t('dailyDealsTitle')}</h2>
            <p className="mt-2 text-gray-400">{t('dailyDealsSubtitle')}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDeals.map((deal) => (
              <HomeDealCard key={deal.id} deal={deal} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/deals" className="inline-block text-amber-500 font-semibold hover:text-amber-400 text-lg">
                {t('viewAllDeals')} {language === 'ar' ? <>&larr;</> : <>&rarr;</>}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;