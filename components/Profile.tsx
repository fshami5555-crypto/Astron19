import React, { useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataProvider';
import type { Order, OrderStatus } from '../types';

const statusColors: Record<OrderStatus, string> = {
    Received: 'bg-blue-500',
    Preparing: 'bg-yellow-500',
    'Out for Delivery': 'bg-purple-500',
    Delivered: 'bg-green-500',
    Cancelled: 'bg-red-500',
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const { t, language } = useTranslation();

    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm text-gray-400">{t('orderId')}</p>
                    <p className="font-mono text-lg text-white">{order.id}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${statusColors[order.status]}`}>
                    {t(`orderStatus_${order.status}`)}
                </span>
            </div>
            <div className="border-t border-gray-700 pt-4">
                <div className="space-y-2 text-gray-300">
                    <p><strong>{t('orderDate')}:</strong> {new Date(order.date).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                    <p><strong>{t('orderTotal')}:</strong> <span className="font-bold text-amber-500">{order.total.toFixed(2)} {t('currency')}</span></p>
                    {order.loyaltyPointsUsed && order.loyaltyPointsUsed > 0 && (
                        <p><strong>{t('loyaltyPointsUsed')}:</strong> <span className="text-green-400">-{order.loyaltyPointsUsed.toFixed(2)}</span></p>
                    )}
                    <div>
                        <p><strong>Items:</strong></p>
                        <ul className="list-disc list-inside ps-4 text-gray-400">
                            {order.items.map((item, index) => (
                                <li key={index}>{item.quantity} x {item.name[language]}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Profile: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const { orders, users } = useContext(DataContext);
    
    // Get the full user object from DataContext to ensure loyalty points are up-to-date
    const currentUser = user ? users.find(u => u.phone === user.phone) : null;
    const userOrders = user ? orders.filter(order => order.userPhone === user.phone) : [];

    return (
        <div className="py-20 bg-[#1a1a1a]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold font-display text-amber-500">{t('profileTitle')}</h1>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-12">
                     {currentUser && (
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold text-white">{t('loyaltyBalance')}</h2>
                            <p className="text-4xl font-bold text-amber-500 mt-2">{currentUser.loyaltyBalance.toFixed(2)}</p>
                        </div>
                    )}

                    <div>
                        <h2 className="text-3xl font-bold text-white text-center mb-8">{t('myOrders')}</h2>
                        {userOrders.length > 0 ? (
                            <div className="space-y-8">
                                {userOrders.map(order => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 text-xl py-10 bg-gray-900 rounded-lg">
                                <p>{t('noOrdersYet')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;