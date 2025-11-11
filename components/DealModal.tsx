import React, { useState, useContext, useEffect } from 'react';
import { DealContext } from '../contexts/DealContext';
import { DataContext } from '../contexts/DataProvider';
import { CartContext } from '../contexts/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import type { MenuItem } from '../types';
import { ToastContext } from '../contexts/ToastContext';

const DealModal: React.FC = () => {
    const { isDealModalOpen, activeDeal, closeDealModal } = useContext(DealContext);
    const { menuItems } = useContext(DataContext);
    const { addToCart, toggleCart } = useContext(CartContext);
    const { language, t } = useTranslation();
    const { showToast } = useContext(ToastContext);

    const [step, setStep] = useState(1);
    const [selectedMains, setSelectedMains] = useState<MenuItem[]>([]);
    const [selectedGift, setSelectedGift] = useState<MenuItem | null>(null);

    useEffect(() => {
        // Reset state when modal opens or deal changes
        if (isDealModalOpen) {
            setStep(1);
            setSelectedMains([]);
            setSelectedGift(null);
        }
    }, [isDealModalOpen, activeDeal]);

    if (!isDealModalOpen || !activeDeal || !activeDeal.rules) return null;

    const { mainCourseCount, giftOptions } = activeDeal.rules;
    const totalSteps = mainCourseCount + (giftOptions.length > 0 ? 1 : 0);

    let mainCourseOptions: MenuItem[];
    if (activeDeal.id === 'deal1') { // Combo for Two deal
        mainCourseOptions = menuItems.filter(item => item.category === 'combo');
    } else if (activeDeal.id === 'deal2') { // Employee Lunch deal
        mainCourseOptions = menuItems.filter(item => item.category === 'mains');
    } else { // Fallback for other deals like the family deal
        mainCourseOptions = menuItems.filter(item => item.category === 'mains' || item.category === 'combo');
    }
    
    let giftItemOptions: MenuItem[];
    if (activeDeal.id === 'deal3') { // 'deal3' is the Weekend Family Deal
        giftItemOptions = menuItems.filter(item => item.category === 'kids');
    } else {
        giftItemOptions = menuItems.filter(item => giftOptions.includes(item.id));
    }


    const handleSelectMain = (item: MenuItem) => {
        const newSelectedMains = [...selectedMains, item];
        setSelectedMains(newSelectedMains);

        if (newSelectedMains.length < mainCourseCount) {
            // This is for intermediate selections (e.g., first item of two)
            showToast(t('firstMealSelected'));
            setStep(step + 1);
        } else {
            // This is for the final main course selection
            if (mainCourseCount > 1) {
                showToast(t('secondMealSelected'));
            }
            
            setStep(step + 1); // Move to gift selection
            
            if (giftItemOptions.length > 0) {
                 // Delay to show after the "meal selected" toast
                 setTimeout(() => showToast(t('nowSelectGift')), mainCourseCount > 1 ? 1200 : 500);
            }
        }
    };

    const handleSelectGift = (item: MenuItem) => {
        setSelectedGift(item);
        showToast(t('giftSelected'));
    };

    const handleAddToCart = () => {
        selectedMains.forEach(main => {
            addToCart(main);
        });
        if (selectedGift) {
            addToCart(selectedGift, 0); // Add gift with price 0
        }
        closeDealModal();
        toggleCart(); // Open cart to show the added items
    };

    const getStepTitle = () => {
        if (step <= mainCourseCount) {
            return `${t('selectMainCourse')} (${step}/${mainCourseCount})`;
        }
        return t('selectYourGift');
    };
    
    const renderSelectionGrid = (items: MenuItem[], onSelect: (item: MenuItem) => void) => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map(item => (
                <button key={item.id} onClick={() => onSelect(item)} className="bg-gray-800 rounded-lg overflow-hidden group text-left">
                    <img src={item.image} alt={item.name[language]} className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-300" />
                    <div className="p-3">
                        <h4 className="font-semibold text-white">{item.name[language]}</h4>
                        <p className="text-sm text-amber-500">{item.price} {t('currency')}</p>
                    </div>
                </button>
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={closeDealModal}>
            <div className="bg-gray-900 w-full max-w-3xl h-full max-h-[90vh] rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-amber-500">{activeDeal.title[language]}</h2>
                    <p className="text-sm text-gray-400 mt-1">{`${t('step')} ${step}/${totalSteps}: ${getStepTitle()}`}</p>
                </div>

                <div className="flex-grow overflow-y-auto p-6">
                    {step <= mainCourseCount && renderSelectionGrid(mainCourseOptions, handleSelectMain)}
                    {step > mainCourseCount && renderSelectionGrid(giftItemOptions, handleSelectGift)}
                </div>

                {(step > mainCourseCount && selectedGift) && (
                     <div className="p-6 border-t border-gray-700 bg-gray-900">
                        <div className="bg-gray-800 p-4 rounded-md mb-4">
                            <h3 className="font-bold text-lg text-white mb-2">Your Deal Summary:</h3>
                            <ul className="text-gray-300 list-disc list-inside">
                                {selectedMains.map((item, i) => <li key={i}>{item.name[language]}</li>)}
                                {selectedGift && <li>{selectedGift.name[language]} (Free)</li>}
                            </ul>
                        </div>
                        <button onClick={handleAddToCart} className="w-full bg-amber-500 text-white font-bold py-3 rounded-full hover:bg-amber-600 transition-colors text-lg">
                           {t('addDealToCart')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DealModal;