import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const OrderSuccess: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 flex items-center justify-center">
            <div className="max-w-xl w-full bg-gray-900 p-8 rounded-lg shadow-xl text-center">
                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-amber-500">{t('orderSuccessTitle')}</h1>
                <p className="mt-4 text-gray-300">{t('orderSuccessMessage')}</p>
                <Link
                    to="/"
                    className="mt-8 inline-block bg-amber-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition-colors duration-300"
                >
                    {t('backToHome')}
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
