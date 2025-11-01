import React from 'react';
import './SocialLoginButtons.css'; 

// --- THIS IS THE FIX ---
// Hardcode the local backend URL for development
// We will replace this later when deploying to Render/Vercel
const backendBaseUrl = 'http://localhost:8086'; 
// --- END FIX ---

const GOOGLE_AUTH_URL = `${backendBaseUrl}/oauth2/authorization/google`; 

const SocialLoginButtons = () => {
  return (
    <div className="social-login-container">
      {/* Google Button */}
      <a href={GOOGLE_AUTH_URL} className="social-button google-button">
        <span className="social-icon">G</span> 
        Sign in with Google
      </a>
    </div>
  );
};

export default SocialLoginButtons;
