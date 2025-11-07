import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { SettingsContext } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, navLinks } = useTranslation();
  const { language, toggleLanguage } = useContext(AppContext);
  const { user, logout } = useContext(AuthContext);
  const { cart, toggleCart } = useContext(CartContext);
  const { settings } = useContext(SettingsContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b-2 border-amber-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold text-amber-500 font-display tracking-wider">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={t('restaurantName')} className="h-12 w-auto" />
              ) : (
                t('restaurantName')
              )}
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-amber-500 transition-all duration-300 text-lg font-medium px-4 py-2 rounded-md ${
                      isActive ? 'border-2 border-sky-400 text-amber-500' : 'border-2 border-transparent'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <button onClick={toggleCart} className="text-gray-300 hover:text-amber-500 transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                )}
            </div>
            <button
              onClick={toggleLanguage}
              className="hidden md:block text-gray-300 hover:text-amber-500 transition-colors duration-300 font-medium text-lg"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                {user.role === 'admin' ? (
                  <Link to="/admin" className="text-gray-300 hover:text-amber-500">
                    {t('adminDashboard')}
                  </Link>
                ) : (
                   <Link to="/profile" className="text-gray-300 hover:text-amber-500">
                    {t('myAccount')}
                  </Link>
                )}
                <button onClick={handleLogout} className="text-gray-300 hover:text-amber-500">
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block text-gray-300 hover:text-amber-500">
                {t('login')}
              </Link>
            )}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive ? 'bg-amber-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
             <div className="border-t border-gray-700 my-2"></div>
             {user ? (
                <>
                 {user.role === 'admin' ? (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md">{t('adminDashboard')}</Link>
                 ) : (
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md">{t('myAccount')}</Link>
                 )}
                 <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md">{t('logout')}</button>
                </>
             ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md">{t('login')}</Link>
             )}
             <button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="w-full text-left text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md">
                {language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
             </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;