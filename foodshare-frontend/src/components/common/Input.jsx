import React from 'react';

// Basic styles for the input, you can move this to a CSS file
const groupStyle = {
  marginBottom: '1.5rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '500',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  border: '1px solid #ddd', // border-color
  borderRadius: '4px',
  boxSizing: 'border-box', // Important!
};

const Input = ({ label, id, type, value, onChange, required, ...props }) => {
  return (
    <div style={groupStyle}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        {...props}
      />
    </div>
  );
};

export default Input;
