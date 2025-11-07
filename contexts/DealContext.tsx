import React, { createContext, useState, ReactNode } from 'react';
import type { Offer } from '../types';

interface DealContextType {
  isDealModalOpen: boolean;
  activeDeal: Offer | null;
  openDealModal: (deal: Offer) => void;
  closeDealModal: () => void;
}

export const DealContext = createContext<DealContextType>({
  isDealModalOpen: false,
  activeDeal: null,
  openDealModal: () => {},
  closeDealModal: () => {},
});

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [activeDeal, setActiveDeal] = useState<Offer | null>(null);

  const openDealModal = (deal: Offer) => {
    setActiveDeal(deal);
    setIsDealModalOpen(true);
  };

  const closeDealModal = () => {
    setIsDealModalOpen(false);
    setActiveDeal(null);
  };

  return (
    <DealContext.Provider value={{ isDealModalOpen, activeDeal, openDealModal, closeDealModal }}>
      {children}
    </DealContext.Provider>
  );
};