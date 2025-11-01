import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';

const formContainerStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '2rem',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
  textAlign: 'center',
};

const dividerStyle = {
  margin: '1.5rem 0',
  borderBottom: '1px solid var(--border-color)',
  lineHeight: '0.1em',
  textAlign: 'center',
};

const dividerTextStyle = {
  background: '#fafafa',
  padding: '0 10px',
  color: '#888',
  fontSize: '0.9em',
};

const SignUpPage = () => {
  return (
    // Make sure .container class provides basic layout
    <div className="container"> 
      <div style={formContainerStyle}>
        <h2>Create Account</h2>
        <SignUpForm />
        <div style={dividerStyle}>
          <span style={dividerTextStyle}>OR</span>
        </div>
        {/* Render SocialLoginButtons directly */}
        <SocialLoginButtons /> 
      </div>
    </div>
  );
};

export default SignUpPage;
