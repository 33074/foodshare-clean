import React from 'react';

// Basic styles for the button, you can move this to a CSS file
const buttonStyle = {
  display: 'inline-block',
  border: 'none',
  borderRadius: '8px',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: '#2c8c5a', // primary-color
  color: 'white',
};

const Button = ({ children, onClick, type = 'button', style, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...buttonStyle, ...style }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
