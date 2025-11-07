import React, { useState, useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../contexts/AppContext';
import { DataContext } from '../contexts/DataProvider';
import type { MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

type Category = 'all' | 'appetizers' | 'mains' | 'drinks' | 'kids' | 'soups' | 'salads' | 'combo';

const Menu: React.FC = () => {
    const { t, language, menuCategories } = useTranslation();
    const { menuItems } = useContext(DataContext);
    const [activeCategory, setActiveCategory] = useState<Category>('all');

    const filteredItems = activeCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === activeCategory);

    const showGroupedView = activeCategory === 'mains' || activeCategory === 'combo';
    
    const groupedItems = showGroupedView 
        ? filteredItems.reduce((acc, item) => {
            const defaultKey = activeCategory === 'mains' ? t('navMains') : t('comboDealsTitle');
            const key = item.subcategory?.[language] || defaultKey;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as Record<string, MenuItem[]>)
        : {};

    // Define the order of subcategories
    const subcategoryOrder = [
        t('navMains'), 
        t('comboDealsTitle'),
        t('subcategories.signatureAstren'),
        t('subcategories.highProtein'),
        t('subcategories.healthyLight')
    ];

    return (
        <div className="py-20 bg-[#1a1a1a]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('menuTitle')}</h1>
                    <p className="mt-4 text-lg text-gray-400">{t('menuSubtitle')}</p>
                </div>

                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {menuCategories.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key as Category)}
                            className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 ${
                                activeCategory === key
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-amber-500 hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {!showGroupedView && filteredItems.map((item) => (
                       <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
                 {showGroupedView && (
                    <div className="space-y-12">
                        {subcategoryOrder.map(subcategory => {
                            if (!groupedItems[subcategory]) return null;
                            return (
                                <div key={subcategory}>
                                    <h2 className="text-3xl font-bold text-amber-400 mb-6 border-b-2 border-amber-400/20 pb-3">{subcategory}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                        {groupedItems[subcategory].map(item => (
                                            <MenuItemCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;