import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { CartContext } from '../contexts/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import type { MenuItem } from '../types';

interface MenuItemCardProps {
    item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const { language, t } = useTranslation();
    const { addToCart } = useContext(CartContext);

    const discountPercent = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
    
    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(item);
    };

    return (
        <Link to={`/menu/${item.id}`} className="block bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col group relative hover:shadow-amber-500/20 transition-shadow duration-300">
            {item.originalPrice && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                    {discountPercent}% {t('discountOff')}
                </div>
            )}
            <div className="overflow-hidden">
                <img className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.name[language]} />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white">{item.name[language]}</h3>
                <p className="mt-2 text-gray-400 text-sm flex-grow">{item.description[language]}</p>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-lg font-semibold text-amber-500 flex items-baseline gap-2">
                        <span>{item.price.toFixed(2)} {t('currency')}</span>
                        {item.originalPrice && (
                            <del className="text-gray-500 text-sm">{item.originalPrice.toFixed(2)} {t('currency')}</del>
                        )}
                    </div>
                    <button onClick={handleAddToCartClick} className="bg-amber-500 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-600 transition-colors duration-300 text-sm z-20 relative">
                        {t('addToCart')}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default MenuItemCard;