import React, { useState } from 'react';
import './ClaimModal.css';

const ClaimModal = ({ foodItem, isOpen, onClose, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !location || !phone) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    onConfirm({
      foodId: foodItem.id,
      email,
      location,
      phone,
    });
  };

  if (!isOpen || !foodItem) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Claim "{foodItem.title}"</h2>
        <p>You are claiming: <strong>{foodItem.title}</strong>. Please provide your details for pickup coordination.</p>
        
        {error && <p className="modal-error">{error}</p>}

        <form>
          <div className="form-group">
            <label htmlFor="claim-email">Email Address</label>
            <input
              type="email"
              id="claim-email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="claim-location">Your Location</label>
            <input
              type="text"
              id="claim-location"
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="claim-phone">Phone Number</label>
            <input
              type="tel"
              id="claim-phone"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="button" className="btn-confirm-claim" onClick={handleSubmit}>
            Confirm Claim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
