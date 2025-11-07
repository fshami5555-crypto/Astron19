import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

const CartModal: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { language } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.16;
  const total = subtotal + vat;
  
  const handleCheckout = () => {
      toggleCart(); // Close the cart modal
      if (user) {
          navigate('/checkout');
      } else {
          navigate('/login', { state: { from: { pathname: '/checkout' } } });
      }
  }

  if (!isCartOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end"
        onClick={toggleCart}
    >
      <div 
        className={`w-full max-w-md h-full bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : (language === 'ar' ? '-translate-x-full' : 'translate-x-full')}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-amber-500">{t('shoppingCart')}</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-400">{t('emptyCart')}</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.map(item => (
              <div key={item.cartItemId} className="flex items-center gap-4">
                <img src={item.image} alt={item.name[language]} className="w-20 h-20 object-cover rounded-md"/>
                <div className="flex-grow">
                  <h3 className="font-semibold text-white">{item.name[language]}</h3>
                  <p className="text-sm text-amber-400">{item.price > 0 ? `${item.price} ${t('currency')}`: 'FREE'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-2 py-1 bg-gray-700 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-2 py-1 bg-gray-700 rounded">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500 hover:text-red-400 text-xs">
                  {t('removeItem')}
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-700 space-y-3">
            <div className="flex justify-between text-md text-gray-300">
              <span>{t('subtotal')}</span>
              <span>{subtotal.toFixed(2)} {t('currency')}</span>
            </div>
            <div className="flex justify-between text-md text-gray-300">
              <span>{t('vat')}</span>
              <span>{vat.toFixed(2)} {t('currency')}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-gray-700 pt-3 mt-3">
              <span>{t('total')}</span>
              <span className="text-amber-500">{total.toFixed(2)} {t('currency')}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-amber-500 text-white font-bold py-3 rounded-full hover:bg-amber-600 transition-colors mt-4"
            >
              {t('checkout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;