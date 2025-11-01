import React from 'react';

const iconStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#007bff', // Blue, or any color
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '1rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
};

const UserIcon = ({ email }) => {
  const firstLetter = email ? email[0] : '?';

  return (
    <div style={iconStyle} title={email}>
      {firstLetter}
    </div>
  );
};

export default UserIcon;
