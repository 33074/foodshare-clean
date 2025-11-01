import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>FoodShare</h3>
          <p>Reducing food waste, one meal at a time.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/browse">Browse Food</Link></li>
            <li><Link to="/donate">Donate Food</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>123 Green Way, Sustania</p>
          <p>contact@foodshare.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 FoodShare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
