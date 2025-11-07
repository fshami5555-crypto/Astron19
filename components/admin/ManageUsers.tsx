import React, { useContext } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { DataContext } from '../../contexts/DataProvider';

const ManageUsers: React.FC = () => {
    const { t } = useTranslation();
    const { users } = useContext(DataContext);

    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('users')}</h1>
            <div className="bg-gray-900 rounded-lg">
                <div className="hidden md:grid grid-cols-3 gap-4 font-bold text-gray-400 p-4">
                    <div>{t('phone')}</div>
                    <div>{t('role')}</div>
                    <div>{t('loyaltyBalance')}</div>
                </div>
                {users.map(user => (
                    <div key={user.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-t border-gray-700">
                        <div className="font-mono">{user.phone}</div>
                        <div>
                            <span className={`px-2 py-1 inline-block rounded text-white text-xs ${user.role === 'admin' ? 'bg-amber-600' : 'bg-gray-600'}`}>
                                {user.role}
                            </span>
                        </div>
                        <div>{user.loyaltyBalance.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
