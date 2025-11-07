import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataProvider';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: number | string, linkTo: string }> = ({ title, value, linkTo }) => (
    <Link to={linkTo} className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-amber-500/20 hover:-translate-y-1 transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
        <p className="text-4xl font-bold text-amber-500 mt-2">{value}</p>
    </Link>
);

const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { menuItems, users, orders } = useContext(DataContext);
    
    const totalRevenue = orders
        .filter(order => order.status === 'Delivered')
        .reduce((sum, order) => sum + order.total, 0);
        
    const pendingOrders = orders.filter(order => order.status !== 'Delivered' && order.status !== 'Cancelled').length;
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-8">{t('dashboard')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`${totalRevenue.toFixed(2)} ${t('currency')}`} linkTo="/admin/orders" />
                <StatCard title="Pending Orders" value={pendingOrders} linkTo="/admin/orders" />
                <StatCard title="Total Users" value={users.length} linkTo="/admin/users" />
                <StatCard title="Menu Items" value={menuItems.length} linkTo="/admin/menu" />
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Orders</h2>
                <div className="bg-gray-900 rounded-lg">
                    {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 last:border-b-0">
                            <div className="font-mono text-sm">{order.id}</div>
                            <div>{order.userPhone}</div>
                            <div className="font-bold text-amber-500">{order.total.toFixed(2)} {t('currency')}</div>
                             <div>
                                <span className={`px-2 py-1 inline-block rounded text-white text-xs ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                    {t(`orderStatus_${order.status}`)}
                                </span>
                            </div>
                        </div>
                    ))}
                     {orders.length === 0 && <p className="text-center text-gray-400 p-4">No recent orders.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;