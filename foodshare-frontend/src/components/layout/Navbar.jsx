import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import UserIcon from '../user/UserIcon';
import CartIcon from '../user/CartIcon';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data
    // Ensure redirect goes to the welcome page (/)
    window.location.href = '/'; 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="https://media.istockphoto.com/id/1384532150/vector/recycle-symbol-inside-circle-with-leaves-zero-waste-concept.jpg?s=612x612&w=0&k=20&c=lQPT8cj_dpkQBxa1G4Y6RzDz5vLog6OmWERx-vGpF_Y=" 
            alt="FoodShare Logo" 
            className="logo-image" 
          />
        </Link>
        <div className="navbar-links">
          <Link to="/browse" className="nav-link">Browse Food</Link>
          <Link to="/donate" className="nav-link">Donate Food</Link>
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
          <Link to="/impact" className="nav-link">Impact</Link>
        </div>
        <div className="navbar-actions">
          {user ? (
            <>
              <CartIcon />
              <UserIcon email={user.email} />
              <button onClick={handleLogout} className="nav-link btn-logout">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
