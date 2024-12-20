import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart items from the backend
  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Add a product to the cart
  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const response = await api.post('/cart', {
        product_id: product.id,
        quantity,
      });
      setCart((prevCart) => [...prevCart, response.data.cartItem]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove a product from the cart
  const removeFromCart = async (id: number) => {
    try {
      await api.delete(`/cart/${id}`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, fetchCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
