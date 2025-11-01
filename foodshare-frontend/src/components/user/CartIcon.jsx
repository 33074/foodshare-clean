import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const cartIconStyle = {
  position: 'relative',
  cursor: 'pointer',
  padding: '0.5rem',
};

const cartCountStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  backgroundColor: '#e63946', // red
  color: 'white',
  borderRadius: '50%',
  width: '18px',
  height: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 'bold',
};

const CartIcon = () => {
  // Use a fallback if useCart hook fails
  const cartContext = useCart();
  const count = cartContext ? cartContext.cartItems.length : 0;

  return (
    <Link to="/cart" style={cartIconStyle} title="View Cart">
      {/* A simple SVG for the cart icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {count > 0 && (
        <span style={cartCountStyle}>
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
