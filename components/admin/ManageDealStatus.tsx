import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import { AppContext } from '../../contexts/AppContext';

const ManageDealStatus: React.FC = () => {
    const { t, language } = useTranslation();
    const { dailyDeals, updateDealStatus } = useContext(DataContext);

    const handleStatusChange = (dealId: string, newStatus: boolean) => {
        updateDealStatus(dealId, newStatus);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('manageDealStatus')}</h1>
            <div className="bg-gray-900 p-6 rounded-lg space-y-6">
                {dailyDeals.map(deal => (
                    <div key={deal.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-md shadow-md">
                        <div>
                            <p className="font-bold text-lg text-white">{deal.title[language]}</p>
                            <p className="text-sm text-gray-400 max-w-lg">{deal.description[language]}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={deal.isActive}
                                onChange={(e) => handleStatusChange(deal.id, e.target.checked)}
                                aria-label={`Toggle status for ${deal.title[language]}`}
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-amber-500/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 ltr:left-[2px] rtl:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            <span className="ltr:ml-3 rtl:mr-3 text-sm font-medium text-gray-300">{deal.isActive ? t('active') : t('inactive')}</span>
                        </label>
                    </div>
                ))}
                 {dailyDeals.length === 0 && <p className="text-center text-gray-400 p-4">No daily deals found.</p>}
            </div>
        </div>
    );
};

export default ManageDealStatus;