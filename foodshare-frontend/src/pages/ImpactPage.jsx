import React from 'react';
import './ImpactPage.css';

const ImpactPage = () => {
  return (
    // --- WRAP IN CONTAINER ---
    <div className="container">
      <div className="impact-container">
        <h2>Our Impact</h2>
        <p className="subtitle">Together, we are creating a more sustainable and equitable food system.</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>1.2M+</h3>
            <p>Meals Served</p>
          </div>
          <div className="stat-card">
            <h3>500k+</h3>
            <p>Tonnes of CO2 Saved</p>
          </div>
          <div className="stat-card">
            <h3>5,000+</h3>
            <p>Community Partners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
