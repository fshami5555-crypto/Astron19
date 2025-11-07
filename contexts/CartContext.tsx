import React, { createContext, useState, ReactNode } from 'react';
import type { CartItem, MenuItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: MenuItem, priceOverride?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  toggleCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (itemToAdd: MenuItem, priceOverride?: number) => {
    setCart((prevCart) => {
      const finalPrice = priceOverride !== undefined ? priceOverride : itemToAdd.price;
      const cartItemId = `${itemToAdd.id}-${finalPrice}`;
      
      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Create a new item with the correct price and unique cart ID
      const newCartItem: CartItem = {
        ...itemToAdd,
        price: finalPrice,
        quantity: 1,
        cartItemId: cartItemId
      };

      return [...prevCart, newCartItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
      setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, isCartOpen, addToCart, removeFromCart, updateQuantity, toggleCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};