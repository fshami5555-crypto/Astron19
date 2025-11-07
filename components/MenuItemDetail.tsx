import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataProvider';
import { CartContext } from '../contexts/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import MenuItemCard from './MenuItemCard';

const MenuItemDetail: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const { menuItems } = useContext(DataContext);
    const { language, t } = useTranslation();
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const item = menuItems.find(i => i.id === itemId);

    if (!item) {
        React.useEffect(() => {
            navigate('/menu');
        }, [navigate]);
        return <div className="text-center py-20 text-white">{t('itemNotFound')}</div>;
    }

    const suggestedItems = menuItems
        .filter(i => i.category === item.category && i.id !== item.id)
        .slice(0, 4);

    const handleShare = async () => {
        const canonicalUrl = `${window.location.origin}${window.location.pathname}#/menu/${itemId}`;

        const shareData = {
            title: item.name[language],
            text: item.description[language],
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
    
    const discountPercent = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

    return (
        <div className="py-12 md:py-20 bg-[#1a1a1a]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="relative">
                         {item.originalPrice && (
                            <div className="absolute top-4 right-4 bg-red-600 text-white text-lg font-bold rounded-full px-4 py-2 z-10">
                                {discountPercent}% {t('discountOff')}
                            </div>
                        )}
                        <img src={item.image} alt={item.name[language]} className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl bg-gray-900/50 p-2" />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-amber-500">{item.name[language]}</h1>
                        <p className="text-lg text-gray-300 leading-relaxed">{item.description[language]}</p>
                        <div className="text-3xl font-bold text-white flex items-baseline gap-4">
                            <span>{item.price.toFixed(2)} {t('currency')}</span>
                            {item.originalPrice && (
                                <del className="text-gray-500 text-xl">{item.originalPrice.toFixed(2)} {t('currency')}</del>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button onClick={() => addToCart(item)} className="w-full sm:w-auto flex-grow bg-amber-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition-transform duration-300 transform hover:scale-105">
                                {t('addToCart')}
                            </button>
                             <button onClick={handleShare} title={t('share')} className="w-full sm:w-auto bg-gray-700 text-white font-bold p-3 rounded-full hover:bg-gray-600 transition-colors">
                                {isLinkCopied ? (
                                     <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                                )}
                            </button>
                        </div>
                         {isLinkCopied && <div className="text-green-400 text-center sm:text-left pt-2">{t('linkCopied')}</div>}
                    </div>
                </div>

                {suggestedItems.length > 0 && (
                    <div className="mt-20 border-t border-gray-700 pt-12">
                        <h2 className="text-3xl font-bold text-center text-amber-500 mb-8">{t('youMightAlsoLike')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {suggestedItems.map(suggestedItem => (
                                <MenuItemCard key={suggestedItem.id} item={suggestedItem} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuItemDetail;