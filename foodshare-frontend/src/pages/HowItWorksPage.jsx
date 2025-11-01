import React from 'react';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  return (
    // --- WRAP IN CONTAINER ---
    <div className="container">
      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <p className="subtitle">A simple process to connect surplus food with local needs in three easy steps.</p>
        
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon-wrapper">
              <span>🚚</span>
            </div>
            <h3>1. Post a Donation</h3>
            <p>Individuals and businesses can easily list surplus food items, specifying details like type, quantity, and pickup location.</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon-wrapper">
              <span>👥</span>
            </div>
            <h3>2. Find Food Nearby</h3>
            <p>Charities, food banks, and individuals in need can browse our map and listings to find available food in their local area.</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon-wrapper">
              <span>❤️</span>
            </div>
            <h3>3. Make a Difference</h3>
            <p>Once a match is made, parties coordinate a pickup. You've successfully reduced waste and helped someone in your community.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
