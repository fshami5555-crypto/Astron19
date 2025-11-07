import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CartContext } from '../contexts/CartContext';

// SVGs for icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;


const BottomNav: React.FC = () => {
    const { t } = useTranslation();
    const { cart, toggleCart } = useContext(CartContext);
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    const navItems = [
        { path: '/', label: t('navHome'), icon: <HomeIcon /> },
        { path: '/menu', label: t('navMenu'), icon: <MenuIcon /> },
        { path: '/contact', label: t('navContact'), icon: <ContactIcon /> },
    ];
    
    const activeClassName = "text-amber-500";
    const inactiveClassName = "text-gray-400 hover:text-amber-500";

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 h-16 flex items-center justify-around z-40">
            {navItems.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `flex flex-col items-center justify-center transition-colors w-1/4 ${isActive ? activeClassName : inactiveClassName}`}
                >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                </NavLink>
            ))}
            <button onClick={toggleCart} className={`relative flex flex-col items-center justify-center transition-colors w-1/4 ${inactiveClassName}`}>
                <CartIcon />
                <span className="text-xs mt-1">{t('shoppingCart')}</span>
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 right-[calc(50%-20px)] bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                )}
            </button>
        </nav>
    );
};

export default BottomNav;