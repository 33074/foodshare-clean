import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (foodItem) => {
    setCartItems((prevItems) => {
      // Prevent adding the same item twice
      if (prevItems.find((item) => item.id === foodItem.id)) {
        return prevItems;
      }
      return [...prevItems, foodItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // This line is now fixed
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
