import React, { useContext } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { DataContext } from '../../contexts/DataProvider';

const ManageLoyalty: React.FC = () => {
    const { t } = useTranslation();
    const { loyaltyLog } = useContext(DataContext); 

    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('loyaltyLog')}</h1>
            
            <div className="bg-gray-900 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-4 font-bold text-gray-400 p-2">
                    <div>{t('orderId')}</div>
                    <div>{t('orderUser')}</div>
                    <div>{t('pointsAwarded')}</div>
                    <div>{t('orderDate')}</div>
                </div>
                {loyaltyLog.length > 0 ? (
                    loyaltyLog.map(log => (
                        <div key={log.id} className="grid grid-cols-4 gap-4 items-center p-2 border-t border-gray-700">
                            <div className="font-mono text-sm">{log.orderId}</div>
                            <div>{log.userPhone}</div>
                            <div className="text-green-400 font-semibold">+{log.pointsAwarded.toFixed(2)}</div>
                            <div>{new Date(log.date).toLocaleString()}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-8 border-t border-gray-700">
                        {t('noLoyaltyHistory')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageLoyalty;