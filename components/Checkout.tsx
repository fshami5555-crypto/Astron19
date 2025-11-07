import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataProvider';
import type { Order, PromoCode, User } from '../types';

const Checkout: React.FC = () => {
    const { t, language } = useTranslation();
    const { cart, clearCart } = useContext(CartContext);
    const { user: authUser } = useContext(AuthContext);
    const { addOrder, promoCodes, users } = useContext(DataContext);
    const navigate = useNavigate();

    const currentUser = authUser ? users.find(u => u.phone === authUser.phone) : null;

    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [contactPhone, setContactPhone] = useState(authUser?.phone || '');
    const [deliveryTimeOption, setDeliveryTimeOption] = useState('now');
    const [specificTime, setSpecificTime] = useState('');

    const [promoCodeInput, setPromoCodeInput] = useState('');
    const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(null);
    const [promoError, setPromoError] = useState('');
    
    const [useLoyalty, setUseLoyalty] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = appliedPromoCode ? (subtotal * appliedPromoCode.discount) / 100 : 0;
    const subtotalAfterPromo = subtotal - discountAmount;
    
    const maxLoyaltyDiscount = currentUser ? Math.min(currentUser.loyaltyBalance, subtotalAfterPromo) : 0;
    const loyaltyDiscount = useLoyalty ? maxLoyaltyDiscount : 0;

    const subtotalAfterDiscounts = subtotalAfterPromo - loyaltyDiscount;
    const vat = subtotalAfterDiscounts * 0.16;
    const total = subtotalAfterDiscounts + vat;

    const handleApplyPromoCode = () => {
        setPromoError('');
        const code = promoCodes.find(p => p.code.toLowerCase() === promoCodeInput.toLowerCase());

        if (code && code.isActive) {
            setAppliedPromoCode(code);
        } else {
            setPromoError(t('invalidPromoCode'));
            setAppliedPromoCode(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!authUser || cart.length === 0) return;

        let deliveryTime = t('deliveryTimeNow');
        if (deliveryTimeOption === 'later') {
            deliveryTime = t('deliveryTimeLater');
        } else if (deliveryTimeOption === 'specific') {
            deliveryTime = specificTime;
        }

        const newOrder: Omit<Order, 'id'> = {
            userPhone: authUser.phone,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            subtotal,
            vat,
            total,
            status: 'Received',
            date: new Date().toISOString(),
            deliveryAddress,
            contactPhone,
            deliveryTime
        };
        
        // Conditionally add fields to avoid Firestore errors with `undefined`
        if (appliedPromoCode && discountAmount > 0) {
            newOrder.discount = discountAmount;
            newOrder.promoCode = appliedPromoCode.code;
        }

        if (loyaltyDiscount > 0) {
            newOrder.loyaltyPointsUsed = loyaltyDiscount;
        }
        
        addOrder(newOrder);
        clearCart();
        navigate('/order-success');
    };
    
    if (cart.length === 0) {
        return (
             <div className="container mx-auto text-center py-20">
                <h1 className="text-3xl text-amber-500">{t('emptyCart')}</h1>
            </div>
        )
    }

    return (
        <div className="py-20 bg-[#1a1a1a]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold font-display text-amber-500 text-center mb-12">{t('checkoutTitle')}</h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
                    {/* Delivery Details */}
                    <div className="bg-gray-900 p-8 rounded-lg shadow-xl space-y-6">
                        <h2 className="text-2xl font-bold text-white">{t('deliveryDetails')}</h2>
                        <div>
                            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-300">{t('deliveryAddress')}</label>
                            <textarea id="deliveryAddress" name="deliveryAddress" rows={3} required value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300">{t('contactPhone')}</label>
                            <input type="tel" id="contactPhone" name="contactPhone" required value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-300">{t('deliveryTime')}</label>
                             <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input id="now" name="deliveryTime" type="radio" value="now" checked={deliveryTimeOption === 'now'} onChange={e => setDeliveryTimeOption(e.target.value)} className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500" />
                                    <label htmlFor="now" className="ms-3 block text-sm font-medium text-gray-300">{t('deliveryTimeNow')}</label>
                                </div>
                                 <div className="flex items-center">
                                    <input id="later" name="deliveryTime" type="radio" value="later" checked={deliveryTimeOption === 'later'} onChange={e => setDeliveryTimeOption(e.target.value)} className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500" />
                                    <label htmlFor="later" className="ms-3 block text-sm font-medium text-gray-300">{t('deliveryTimeLater')}</label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input id="specific" name="deliveryTime" type="radio" value="specific" checked={deliveryTimeOption === 'specific'} onChange={e => setDeliveryTimeOption(e.target.value)} className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500" />
                                    <label htmlFor="specific" className="ms-3 block text-sm font-medium text-gray-300">{t('deliveryTimeSpecific')}</label>
                                    <input type="time" disabled={deliveryTimeOption !== 'specific'} value={specificTime} onChange={e => setSpecificTime(e.target.value)} required={deliveryTimeOption === 'specific'} className="bg-gray-800 border-gray-600 rounded-md py-1 px-2 text-white disabled:opacity-50" />
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-900 p-8 rounded-lg shadow-xl h-fit">
                        <h2 className="text-2xl font-bold text-white mb-6">{t('orderSummary')}</h2>
                        <div className="space-y-3">
                            {cart.map(item => (
                                <div key={item.cartItemId} className="flex justify-between items-center text-gray-300">
                                    <span>{item.quantity} x {item.name[language]}</span>
                                    <span>{(item.price * item.quantity).toFixed(2)} {t('currency')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 my-4"></div>
                        
                        {/* Loyalty Points Section */}
                        {currentUser && currentUser.loyaltyBalance > 0 && (
                             <div className="bg-amber-900/30 p-4 rounded-md mb-4">
                                <label htmlFor="useLoyalty" className="flex items-center justify-between cursor-pointer">
                                    <span className="flex flex-col">
                                        <span className="font-semibold text-white">{t('useLoyaltyBalance')}</span>
                                        <span className="text-sm text-amber-400">{currentUser.loyaltyBalance.toFixed(2)} {t('pointsAvailable')}</span>
                                    </span>
                                    <input type="checkbox" id="useLoyalty" checked={useLoyalty} onChange={e => setUseLoyalty(e.target.checked)} className="h-5 w-5 rounded text-amber-500 focus:ring-amber-500 bg-gray-700 border-gray-600"/>
                                </label>
                            </div>
                        )}

                        {/* Promo Code Section */}
                        <div className="mb-4">
                            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-300 mb-2">{t('promoCodeLabel')}</label>
                            <div className="flex gap-2">
                                <input type="text" id="promoCode" value={promoCodeInput} onChange={e => setPromoCodeInput(e.target.value)} placeholder={t('promoCodeLabel')} className="flex-grow bg-gray-800 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                                <button type="button" onClick={handleApplyPromoCode} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">
                                    {t('applyPromoCode')}
                                </button>
                            </div>
                             {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
                             {appliedPromoCode && <p className="text-green-400 text-sm mt-2">"{appliedPromoCode.code}" applied! You saved {appliedPromoCode.discount}%. </p>}
                        </div>

                        <div className="space-y-2 text-lg">
                            <div className="flex justify-between text-gray-300">
                                <span>{t('subtotal')}</span>
                                <span>{subtotal.toFixed(2)} {t('currency')}</span>
                            </div>
                            {appliedPromoCode && (
                                <div className="flex justify-between text-green-400">
                                    <span>{t('discountLabel')} ({appliedPromoCode.discount}%)</span>
                                    <span>-{discountAmount.toFixed(2)} {t('currency')}</span>
                                </div>
                            )}
                             {loyaltyDiscount > 0 && (
                                <div className="flex justify-between text-green-400">
                                    <span>{t('loyaltyCredit')}</span>
                                    <span>-{loyaltyDiscount.toFixed(2)} {t('currency')}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-300">
                                <span>{t('vat')}</span>
                                <span>{vat.toFixed(2)} {t('currency')}</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-xl pt-2 border-t border-gray-700 mt-2">
                                <span>{t('total')}</span>
                                <span className="text-amber-500">{total.toFixed(2)} {t('currency')}</span>
                            </div>
                        </div>
                         <button type="submit" className="w-full mt-8 bg-amber-500 text-white font-bold py-3 px-6 rounded-full hover:bg-amber-600 transition-colors duration-300 text-lg">
                            {t('confirmOrder')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;