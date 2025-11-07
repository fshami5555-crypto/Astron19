import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { SettingsContext } from '../contexts/SettingsContext';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const { login, signup, user } = useContext(AuthContext);
    const { settings } = useContext(SettingsContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isThrottled, setIsThrottled] = useState(false);

    const from = location.state?.from?.pathname || (user?.role === 'admin' ? '/admin' : '/');

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password.length < 6 && isRegisterMode) {
            setError(t('errorWeakPassword'));
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (isRegisterMode) {
                await signup(phone, password);
            } else {
                await login(phone, password);
            }
            // useEffect will handle navigation on user state change
        } catch (e: any) {
            const errorMessageKey = e.message;
            setError(t(errorMessageKey));
            
            if (errorMessageKey === 'errorTooManyRequests') {
                setIsThrottled(true);
                setTimeout(() => setIsThrottled(false), 30000); // 30-second cooldown
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setError(null);
        setPassword('');
    }

    const isAdminLogin = location.pathname.includes('login') && location.state?.from?.pathname?.startsWith('/admin');

    return (
        <div className="py-20 bg-[#1a1a1a] flex items-center justify-center min-h-[calc(100vh-160px)]">
            <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-xl">
                <div className="text-center mb-8">
                     <img
                        src={settings.logoUrl}
                        alt={t('restaurantName')}
                        className="w-auto h-20 mx-auto"
                    />
                    <h1 className="text-3xl font-bold text-amber-500 mt-4">
                        {isAdminLogin ? t('adminLoginTitle') : (isRegisterMode ? t('createAccountTitle') : t('loginTitle'))}
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {!isAdminLogin && (isRegisterMode ? t('createAccountSubtitle') : t('loginSubtitle'))}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">{t('phoneNumber')}</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            placeholder="05XXXXXXXX"
                        />
                    </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">{t('password')}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            placeholder="******"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <div>
                         <button
                            type="submit"
                            disabled={isLoading || isThrottled}
                            className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-full hover:bg-amber-600 transition-colors duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '...' : (isRegisterMode ? t('createAccountCTA') : t('loginCTA'))}
                        </button>
                    </div>
                </form>
                
                {!isAdminLogin && (
                    <p className="text-center text-gray-400 mt-6">
                        {isRegisterMode ? t('haveAccount') : t('noAccount')}
                        <button onClick={toggleMode} className="text-amber-500 hover:underline font-semibold mx-1">
                            {isRegisterMode ? t('loginNow') : t('registerNow')}
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;