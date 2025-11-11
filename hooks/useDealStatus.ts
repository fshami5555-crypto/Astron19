import type { Offer } from '../types';

export const useDealStatus = (deal: Offer) => {
    // The deal status is now controlled manually by the admin via the `isActive` property.
    // The hook simply returns the value of this property.
    return deal.isActive;
};