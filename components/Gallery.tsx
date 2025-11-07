import React, { useState, useContext } from 'react';
import type { GalleryImage } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../contexts/AppContext';
import { DataContext } from '../contexts/DataProvider';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useTranslation();
  const { language } = useContext(AppContext);
  const { galleryImages } = useContext(DataContext);

  const openModal = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('galleryTitle')}</h1>
          <p className="mt-4 text-lg text-gray-400">{t('gallerySubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg cursor-pointer" onClick={() => openModal(image.src)}>
              <img
                src={image.src}
                alt={image.alt[language]}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;