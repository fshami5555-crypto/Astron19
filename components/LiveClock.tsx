import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LiveClock: React.FC = () => {
    const { t } = useTranslation();
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const timeZone = 'Asia/Amman';
        
        const updateClock = () => {
            const now = new Date();
            
            const timeFormatter = new Intl.DateTimeFormat('ar-JO', {
                timeZone,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            });
            
            const dateFormatter = new Intl.DateTimeFormat('ar-JO', {
                timeZone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            setTime(timeFormatter.format(now));
            setDate(dateFormatter.format(now));
        };

        updateClock();
        const timerId = setInterval(updateClock, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="bg-gray-900/50 border border-amber-500/20 text-center p-4 rounded-lg mb-12 max-w-md mx-auto">
            <p className="text-amber-400 font-semibold text-lg">{t('jordanTime')}</p>
            <p className="text-white text-2xl font-bold font-mono tracking-wider mt-2">{time}</p>
            <p className="text-gray-300 text-md">{date}</p>
        </div>
    );
};

export default LiveClock;
