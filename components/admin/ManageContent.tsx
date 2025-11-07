import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { MenuItem, Offer, TranslatableString } from '../../types';

// Helper component for translatable string inputs
const TranslatableInput: React.FC<{
  label: string;
  name: string;
  value: TranslatableString;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  isTextArea?: boolean;
}> = ({ label, name, value, onChange, required = false, isTextArea = false }) => {
    const InputComponent = isTextArea ? 'textarea' : 'input';
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label htmlFor={`${name}.ar`} className="block text-sm font-medium text-gray-300">{label} (Arabic)</label>
            <InputComponent id={`${name}.ar`} name={`${name}.ar`} value={value.ar} onChange={onChange} required={required} className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
            </div>
            <div>
            <label htmlFor={`${name}.en`} className="block text-sm font-medium text-gray-300">{label} (English)</label>
            <InputComponent id={`${name}.en`} name={`${name}.en`} value={value.en} onChange={onChange} required={required} className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
            </div>
        </div>
    );
};

// MenuItem Modal
const MenuItemModal: React.FC<{
  item: MenuItem | null;
  closeModal: () => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  t: (key: string) => string;
}> = ({ item, closeModal, addMenuItem, updateMenuItem, t }) => {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: { ar: '', en: '' },
    description: { ar: '', en: '' },
    price: 0,
    originalPrice: undefined,
    category: 'appetizers',
    subcategory: undefined,
    image: '',
  });

  useEffect(() => {
    if (item) {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            originalPrice: item.originalPrice,
            category: item.category,
            subcategory: item.subcategory,
            image: item.image,
        });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'originalPrice' ? Number(value) || undefined : value }));
  };

  const handleTranslatableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [field, lang] = name.split('.') as [keyof Omit<MenuItem, 'id'>, 'ar' | 'en'];
    setFormData(prev => ({ ...prev, [field]: { ...(prev[field] as any), [lang]: value } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // FIX: Explicitly parse prices to numbers to prevent type errors.
    const dataToSubmit: Omit<MenuItem, 'id'> = {
      ...formData,
      price: parseFloat(String(formData.price)) || 0,
      originalPrice: formData.originalPrice ? parseFloat(String(formData.originalPrice)) || undefined : undefined,
    };

    if (!dataToSubmit.originalPrice) {
      delete dataToSubmit.originalPrice;
    }
    if (!dataToSubmit.subcategory?.en && !dataToSubmit.subcategory?.ar) {
      delete dataToSubmit.subcategory;
    }
    
    if (item) {
      updateMenuItem({ ...dataToSubmit, id: item.id });
    } else {
      addMenuItem(dataToSubmit);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-amber-500 mb-6">{item ? t('editItem') : t('addNewItem')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <TranslatableInput label={t('itemName')} name="name" value={formData.name} onChange={handleTranslatableChange} required />
            <TranslatableInput label={t('description')} name="description" value={formData.description} onChange={handleTranslatableChange} required isTextArea />
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300">{t('price')}</label>
              <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
            </div>
            
            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-300">Original Price (optional)</label>
              <input type="number" step="0.01" id="originalPrice" name="originalPrice" value={formData.originalPrice || ''} onChange={handleChange} className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">{t('category')}</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 w-full bg-gray-700 rounded p-2 text-white">
                <option value="appetizers">Appetizers</option>
                <option value="soups">Soups</option>
                <option value="salads">Salads</option>
                <option value="mains">Mains</option>
                <option value="combo">Combos</option>
                <option value="drinks">Drinks</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            
            <TranslatableInput label="Subcategory (optional, for Mains/Combos)" name="subcategory" value={formData.subcategory || { ar: '', en: '' }} onChange={handleTranslatableChange} />

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300">{t('imageUrl')}</label>
              <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={closeModal} className="bg-gray-600 text-white font-bold py-2 px-4 rounded">{t('cancel')}</button>
                <button type="submit" className="bg-amber-500 text-white font-bold py-2 px-4 rounded">{t('save')}</button>
            </div>
        </form>
      </div>
    </div>
  );
};

// Deal Modal (for Offers) - Simplified for editing text and image
const DealModal: React.FC<{
    item: Offer | null;
    closeModal: () => void;
    addDailyDeal: (item: Omit<Offer, 'id'>) => Promise<void>;
    updateDailyDeal: (item: Offer) => Promise<void>;
    t: (key: string) => string;
}> = ({ item, closeModal, addDailyDeal, updateDailyDeal, t }) => {
    const [formData, setFormData] = useState<Partial<Offer>>({});

    useEffect(() => {
        if(item) {
            setFormData(item);
        }
    }, [item]);

    const handleTranslatableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.') as [keyof Offer, 'ar' | 'en'];
        setFormData(prev => ({ ...prev, [field]: { ...(prev[field] as any), [lang]: value } }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (item) {
            updateDailyDeal({ ...item, ...formData });
        } else {
            // NOTE: Adding a new deal via the UI is complex due to `rules` and `activeDays`.
            // This simplified form only adds basic details. Further configuration in code might be needed.
            const newDealData: Omit<Offer, 'id'> = {
                title: { ar: '', en: '' },
                description: { ar: '', en: '' },
                image: '',
                ...formData
            };
            addDailyDeal(newDealData);
        }
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
                 <h2 className="text-2xl font-bold text-amber-500 mb-6">{item ? t('editItem') : t('addNewItem')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TranslatableInput label="Title" name="title" value={formData.title || {ar:'', en:''}} onChange={handleTranslatableChange} required />
                    <TranslatableInput label="Description" name="description" value={formData.description || {ar:'', en:''}} onChange={handleTranslatableChange} required isTextArea/>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-300">{t('imageUrl')}</label>
                        <input type="url" id="image" name="image" value={formData.image || ''} onChange={handleChange} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white" />
                    </div>
                     <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={closeModal} className="bg-gray-600 text-white font-bold py-2 px-4 rounded">{t('cancel')}</button>
                        <button type="submit" className="bg-amber-500 text-white font-bold py-2 px-4 rounded">{t('save')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface ManageContentProps {
  type: 'menuItems' | 'dailyDeals';
}

const ManageContent: React.FC<ManageContentProps> = ({ type }) => {
    const { t, language } = useTranslation();
    const dataContext = useContext(DataContext);
    const { menuItems, dailyDeals, deleteMenuItem, deleteDailyDeal, addMenuItem, updateMenuItem, addDailyDeal, updateDailyDeal } = dataContext;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<MenuItem | Offer | null>(null);

    const items = type === 'menuItems' ? menuItems : dailyDeals;
    const title = type === 'menuItems' ? t('manageMenu') : t('manageDeals');

    const openModal = (item: MenuItem | Offer | null = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm(t('confirmDelete'))) {
            type === 'menuItems' ? deleteMenuItem(id) : deleteDailyDeal(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-amber-500">{title}</h1>
                <button onClick={() => openModal()} className="bg-amber-500 text-white font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors">
                    {t('addNewItem')}
                </button>
            </div>

            <div className="bg-gray-900 rounded-lg">
                <div className={`hidden md:grid ${type === 'menuItems' ? 'grid-cols-5' : 'grid-cols-3'} gap-4 font-bold text-gray-400 p-4`}>
                    <div>{type === 'menuItems' ? t('itemName') : 'Title'}</div>
                    {type === 'menuItems' && <div>{t('category')}</div>}
                    {type === 'menuItems' && <div>{t('price')}</div>}
                    <div className="col-span-2">Actions</div>
                </div>
                {items.map(item => {
                    const displayName = 'name' in item ? item.name[language] : item.title[language];
                    return (
                        <div key={item.id} className={`grid grid-cols-1 md:${type === 'menuItems' ? 'grid-cols-5' : 'grid-cols-3'} gap-4 items-center p-4 border-t border-gray-700`}>
                            <div>{displayName}</div>
                            {type === 'menuItems' && <div>{(item as MenuItem).category}</div>}
                            {type === 'menuItems' && <div>{(item as MenuItem).price.toFixed(2)}</div>}
                            <div className="col-span-2 flex gap-4">
                                <button onClick={() => openModal(item)} className="text-blue-400 hover:underline">{t('editItem')}</button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:underline">{t('deleteItem')}</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                type === 'menuItems'
                ? <MenuItemModal item={currentItem as MenuItem | null} closeModal={closeModal} addMenuItem={addMenuItem} updateMenuItem={updateMenuItem} t={t} />
                : <DealModal item={currentItem as Offer | null} closeModal={closeModal} addDailyDeal={addDailyDeal} updateDailyDeal={updateDailyDeal} t={t} />
            )}
        </div>
    );
};

export default ManageContent;