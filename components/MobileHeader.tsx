import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext';

// Icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LoginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>;


const MobileHeader: React.FC = () => {
    const { language, toggleLanguage } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <Link to="/" className="text-2xl font-bold text-amber-500 font-display">
                {t('restaurantName')}
            </Link>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleLanguage}
                    className="text-gray-300 hover:text-amber-500 font-bold text-lg"
                    aria-label={t('toggleLanguage')}
                >
                    {language === 'ar' ? 'EN' : 'AR'}
                </button>
                 {user ? (
                    <Link
                        to={user.role === 'admin' ? '/admin' : '/profile'}
                        className="text-gray-300 hover:text-amber-500"
                        aria-label={t('myAccount')}
                    >
                        <UserIcon />
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="text-gray-300 hover:text-amber-500"
                        aria-label={t('login')}
                    >
                        <LoginIcon />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default MobileHeader;