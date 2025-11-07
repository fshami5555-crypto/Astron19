import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { GalleryImage } from '../../types';

const ManageGallery: React.FC = () => {
    const { t, language } = useTranslation();
    const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useContext(DataContext);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<GalleryImage | null>(null);

    const openModal = (item: GalleryImage | null = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm(t('confirmDelete'))) {
            deleteGalleryImage(id);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-amber-500">{t('galleryTitle')}</h1>
                <button onClick={() => openModal()} className="bg-amber-500 text-white font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors">
                    {t('addNewItem')}
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map(image => (
                    <div key={image.id} className="group relative">
                        <img src={image.src} alt={image.alt[language]} className="w-full h-48 object-cover rounded-lg"/>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button onClick={() => openModal(image)} className="text-white text-sm bg-blue-500/80 px-3 py-1 rounded">Edit</button>
                            <button onClick={() => handleDelete(image.id)} className="text-white text-sm bg-red-500/80 px-3 py-1 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
      
            {isModalOpen && <GalleryModal item={currentItem} closeModal={closeModal} addImage={addGalleryImage} updateImage={updateGalleryImage} t={t} />}
        </div>
    );
};


interface GalleryModalProps {
    item: GalleryImage | null;
    closeModal: () => void;
    addImage: (image: Omit<GalleryImage, 'id'>) => Promise<void>;
    updateImage: (image: GalleryImage) => Promise<void>;
    t: (key: string) => string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, closeModal, addImage, updateImage, t }) => {
    const [src, setSrc] = useState(item?.src || '');
    const [altAr, setAltAr] = useState(item?.alt.ar || '');
    const [altEn, setAltEn] = useState(item?.alt.en || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const imageData = {
            src,
            alt: { ar: altAr, en: altEn }
        };
        
        if (item) {
            updateImage({ ...imageData, id: item.id });
        } else {
            addImage(imageData);
        }
        closeModal();
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-amber-500 mb-6">{item ? t('editItem') : t('addNewItem')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="src" className="block text-sm font-medium text-gray-300">Image URL</label>
                        <input type="url" id="src" value={src} onChange={(e) => setSrc(e.target.value)} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                    </div>
                     <div>
                        <label htmlFor="altAr" className="block text-sm font-medium text-gray-300">Alt Text (Arabic)</label>
                        <input type="text" id="altAr" value={altAr} onChange={(e) => setAltAr(e.target.value)} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
                    </div>
                     <div>
                        <label htmlFor="altEn" className="block text-sm font-medium text-gray-300">Alt Text (English)</label>
                        <input type="text" id="altEn" value={altEn} onChange={(e) => setAltEn(e.target.value)} required className="mt-1 w-full bg-gray-700 rounded p-2 text-white"/>
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

export default ManageGallery;
