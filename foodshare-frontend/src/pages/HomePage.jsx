import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClaimClick = () => {
    if (user) {
      navigate('/browse');
    } else {
      navigate('/login');
    }
  };

  // --- NEW HANDLER ---
  const handleShareClick = () => {
    if (user) {
      // If user is logged in, go to donate page
      navigate('/donate');
    } else {
      // If user is not logged in, go to login page
      navigate('/login');
    }
  };
  // --- END NEW HANDLER ---

  return (
    <>
      {/* Hero Section is now full-width */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Connect Food Donors<br />with Those In Need</h1>
          <p>Help reduce food waste and fight hunger in your community.</p>
          <div className="hero-buttons">
            {/* --- THIS IS THE FIX --- */}
            {/* Changed from Link to button, added onClick */}
            <button onClick={handleShareClick} className="btn btn-primary">
              Share Your Surplus
            </button>
            {/* --- END FIX --- */}
            
            <button onClick={handleClaimClick} className="btn btn-secondary">
              Claim Food
            </button>
          </div>
        </div>
      </section>

      {/* Wrap the content below in a .container div */}
      <div className="container">
        {/* How It Works Section */}
        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <p>A simple process to connect surplus food with those who need it in three easy steps.</p>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-icon">🍽️</div>
              <h3>1. Post a Donation</h3>
              <p>Donors list surplus food items, quantities, and pickup details.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">❤️</div>
              <h3>2. Find Food Nearby</h3>
              <p>Recipients browse available food donations in their local area.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🤝</div>
              <h3>3. Make a Difference</h3>
              <p>Coordinate a pickup and enjoy! Less waste, more happy faces.</p>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="impact-section">
          <h2>Our Impact</h2>
          <p>Together, we are making a tangible difference in our community.</p>
          <div className="stats-container">
            <div className="stat-card">
              <h3>1.2M+</h3>
              <p>Meals Saved</p>
            </div>
            <div className="stat-card">
              <h3>500K+</h3>
              <p>Tons of CO2 Saved</p>
            </div>
            <div className="stat-card">
              <h3>5,000+</h3>
              <p>Community Members</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
