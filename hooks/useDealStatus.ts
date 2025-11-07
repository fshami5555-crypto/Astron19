import { useState, useEffect } from 'react';
import type { Offer } from '../types';

export const useDealStatus = (deal: Offer) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            if (!deal.activeDays || deal.activeDays.length === 0) {
                setIsActive(false); 
                return;
            }

            const now = new Date();
            const currentDay = now.getDay(); // Sunday - 0, Monday - 1, ...
            const currentHour = now.getHours();

            const isDayActive = deal.activeDays.includes(currentDay);

            if (!isDayActive) {
                setIsActive(false);
                return;
            }

            if (deal.timeRange) {
                const isTimeActive = currentHour >= deal.timeRange.start && currentHour < deal.timeRange.end;
                setIsActive(isTimeActive);
            } else {
                setIsActive(true);
            }
        };

        checkStatus();
        const intervalId = setInterval(checkStatus, 60000);

        return () => clearInterval(intervalId);
    }, [deal]);

    return isActive;
};
