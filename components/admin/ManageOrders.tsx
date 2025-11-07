import React, { useContext } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { DataContext } from '../../contexts/DataProvider';
import type { OrderStatus } from '../../types';

const ManageOrders: React.FC = () => {
    const { t, language } = useTranslation();
    const { orders, updateOrderStatus } = useContext(DataContext); 

    const statuses: OrderStatus[] = ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

    const statusColors: Record<OrderStatus, string> = {
        Received: 'bg-blue-500',
        Preparing: 'bg-yellow-500',
        'Out for Delivery': 'bg-purple-500',
        Delivered: 'bg-green-500',
        Cancelled: 'bg-red-500',
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('orders')}</h1>
            <div className="bg-gray-900 rounded-lg">
                <div className="hidden md:grid grid-cols-5 gap-4 font-bold text-gray-400 p-4">
                    <div>{t('orderId')}</div>
                    <div>{t('orderUser')}</div>
                    <div>{t('orderDate')}</div>
                    <div>{t('orderTotal')}</div>
                    <div>{t('orderStatus')}</div>
                </div>
                {orders.map(order => (
                    <div key={order.id} className="border-t border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start p-4">
                            <div className="font-mono text-sm">{order.id}</div>
                            <div>{order.userPhone}</div>
                            <div>{new Date(order.date).toLocaleDateString()}</div>
                            <div>{order.total.toFixed(2)} {t('currency')}</div>
                            <div>
                               <select
                                 value={order.status}
                                 onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                 className={`px-2 py-1 rounded text-white text-sm border-0 focus:ring-2 focus:ring-amber-500 ${statusColors[order.status]}`}
                               >
                                {statuses.map(status => (
                                    <option key={status} value={status} className="bg-gray-800 text-white">
                                        {t(`orderStatus_${status}`)}
                                    </option>
                                ))}
                               </select>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 text-sm">
                           <h4 className="font-bold text-gray-300 mb-2">{t('orderDetails')}</h4>
                           <div className="text-gray-400 space-y-1">
                                <div><strong>{t('deliveryAddress')}:</strong> {order.deliveryAddress}</div>
                                <div><strong>{t('contactPhone')}:</strong> {order.contactPhone}</div>
                                <div><strong>{t('deliveryTime')}:</strong> {order.deliveryTime}</div>
                                {order.promoCode && (
                                    <div>
                                        <strong>{t('promoCodeLabel')}:</strong> {order.promoCode} (-{order.discount?.toFixed(2)} {t('currency')})
                                    </div>
                                )}
                                {order.loyaltyPointsUsed && order.loyaltyPointsUsed > 0 && (
                                    <div>
                                        <strong>{t('loyaltyPointsUsed')}:</strong> -{order.loyaltyPointsUsed.toFixed(2)} {t('currency')}
                                    </div>
                                )}
                                <div className="pt-2">
                                    <strong>Items:</strong> {order.items.map((item, index) => (
                                    <span key={index}>{item.quantity}x {item.name[language]}{index < order.items.length - 1 ? ', ' : ''}</span>
                                ))}
                                </div>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageOrders;