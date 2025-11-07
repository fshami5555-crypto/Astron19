import React from 'react';
import { NavLink, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

// Import Admin components
import AdminDashboard from './AdminDashboard';
import ManageContent from './ManageContent'; // Generic content manager
import ManageUsers from './ManageUsers';
import ManageOrders from './ManageOrders';
import SiteSettings from './SiteSettings';
import ManagePromoCodes from './ManagePromoCodes';
import ManageLoyalty from './ManageLoyalty';
import ManageAbout from './ManageAbout';
import ManageContact from './ManageContact';
import ManageGallery from './ManageGallery';

const AdminLayout: React.FC = () => {
    const { t } = useTranslation();

    const navItems = [
        { path: '/admin', label: t('dashboard'), exact: true },
        { path: '/admin/menu', label: t('manageMenu') },
        { path: '/admin/deals', label: t('manageDeals') },
        { path: '/admin/users', label: t('manageUsers') },
        { path: '/admin/orders', label: t('manageOrders') },
        { path: '/admin/promo-codes', label: t('managePromoCodes') },
        { path: '/admin/loyalty', label: t('manageLoyaltyPoints') },
        { path: '/admin/site-settings', label: t('manageSiteSettings') },
        { path: '/admin/about', label: t('aboutTitle') },
        { path: '/admin/contact', label: t('contactTitle') },
        { path: '/admin/gallery', label: t('galleryTitle') },
    ];

    const activeLinkClass = "bg-amber-500 text-white";
    const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <div className="flex min-h-screen bg-gray-800 text-white">
            <aside className="w-64 bg-gray-900 p-4 flex flex-col">
                <div className="text-center py-4 border-b border-gray-700">
                     <Link to="/" className="text-2xl font-bold text-amber-500 font-display tracking-wider">
                       {t('restaurantName')}
                     </Link>
                </div>
                <nav className="mt-6 flex-grow">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-10">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="menu" element={<ManageContent type="menuItems" />} />
                    <Route path="deals" element={<ManageContent type="dailyDeals" />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="promo-codes" element={<ManagePromoCodes />} />
                    <Route path="loyalty" element={<ManageLoyalty />} />
                    <Route path="site-settings" element={<SiteSettings />} />
                    <Route path="about" element={<ManageAbout />} />
                    <Route path="contact" element={<ManageContact />} />
                    <Route path="gallery" element={<ManageGallery />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminLayout;