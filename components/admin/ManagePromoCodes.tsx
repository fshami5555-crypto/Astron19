import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { PromoCode } from '../../types';

const ManagePromoCodes: React.FC = () => {
    const { t } = useTranslation();
    const { promoCodes, addPromoCode, updatePromoCode, deletePromoCode } = useContext(DataContext);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<PromoCode | null>(null);

    const openModal = (item: PromoCode | null = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm(t('confirmDelete'))) {
            deletePromoCode(id);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-amber-500">{t('managePromoCodes')}</h1>
                <button onClick={() => openModal()} className="bg-amber-500 text-white font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors">
                    {t('addNewPromoCode')}
                </button>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
                <div className="grid grid-cols-5 gap-4 font-bold text-gray-400 p-2">
                    <div>{t('promoCodeLabel')}</div>
                    <div>{t('discountPercentageLabel')}</div>
                    <div>{t('statusLabel')}</div>
                    <div className="col-span-2">Actions</div>
                </div>
                {promoCodes.map(item => (
                    <div key={item.id} className="grid grid-cols-5 gap-4 items-center p-2 border-t border-gray-700">
                        <div className="font-mono">{item.code}</div>
                        <div>{item.discount}%</div>
                        <div>
                           <span className={`px-2 py-1 inline-block rounded text-white text-xs ${item.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                {item.isActive ? t('activeStatus') : t('inactiveStatus')}
                           </span>
                        </div>
                        <div className="col-span-2 flex gap-4">
                            <button onClick={() => openModal(item)} className="text-blue-400 hover:underline">{t('editItem')}</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:underline">{t('deleteItem')}</button>
                        </div>
                    </div>
                ))}
            </div>
      
            {isModalOpen && <PromoCodeModal item={currentItem} closeModal={closeModal} addPromoCode={addPromoCode} updatePromoCode={updatePromoCode} t={t} />}
        </div>
    );
};

// Modal Form Component
interface PromoCodeModalProps {
    item: PromoCode | null;
    closeModal: () => void;
    addPromoCode: (promo: PromoCode) => void;
    updatePromoCode: (promo: PromoCode) => void;
    t: (key: string) => string;
}

const PromoCodeModal: React.FC<PromoCodeModalProps> = ({ item, closeModal, addPromoCode, updatePromoCode, t }) => {
    const [code, setCode] = useState(item?.code || '');
    const [discount, setDiscount] = useState(item?.discount || 0);
    const [isActive, setIsActive] = useState(item?.isActive ?? true);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const promoData: PromoCode = {
            id: item?.id || `promo-${Date.now()}`,
            code: code.toUpperCase(),
            discount,
            isActive,
        };
        
        if (item) {
            updatePromoCode(promoData);
        } else {
            addPromoCode(promoData);
        }
        closeModal();
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-amber-500 mb-6">{item ? t('editItem') : t('addNewPromoCode')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-300">{t('promoCodeLabel')}</label>
                        <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white uppercase"/>
                    </div>
                    <div>
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-300">{t('discountPercentageLabel')}</label>
                        <input type="number" id="discount" value={discount} min="0" max="100" onChange={(e) => setDiscount(Number(e.target.value))} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-5 w-5 rounded text-amber-500 focus:ring-amber-500 bg-gray-700 border-gray-600"/>
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-300">{t('activeStatus')}</label>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={closeModal} className="bg-gray-600 text-white font-bold py-2 px-4 rounded">{t('cancel')}</button>
                        <button type="submit" className="bg-amber-500 text-white font-bold py-2 px-4 rounded">{t('save')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManagePromoCodes;
