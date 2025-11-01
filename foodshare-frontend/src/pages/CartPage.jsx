import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { useAuth } from '../hooks/useAuth';
import './CartPage.css';

const CartPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchClaims = async () => {
      if (!user) {
        setError('You must be logged in to view your claims.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await apiClient.get('/claims/my-claims');
        setClaims(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load your claims.');
      }
      setLoading(false);
    };

    fetchClaims();
  }, [user]);

  if (loading) {
    return <div className="container">Loading your claims...</div>;
  }

  if (error) {
    return <div className="container"><p style={{ color: 'red', textAlign: 'center' }}>{error}</p></div>;
  }
  
  return (
    // --- WRAP IN CONTAINER ---
    <div className="container">
      <div className="cart-page">
        <h1>My Claims</h1>
        
        {claims.length === 0 ? (
          <p>You have not claimed any items yet.</p>
        ) : (
          <>
            <p>Here are the items you have successfully claimed. Please coordinate pickup.</p>
            <div className="claims-list">
              {claims.map(claim => (
                <div key={claim.id} className="claim-card">
                  <img 
                    src={claim.foodListing.imageUrl || 'https://via.placeholder.com/150'} 
                    alt={claim.foodListing.title} 
                    className="claim-image"
                  />
                  <div className="claim-details">
                    <h3>{claim.foodListing.title}</h3>
                    <p><strong>Status:</strong> {claim.status}</p>
                    <p><strong>Claimed On:</strong> {new Date(claim.claimDate).toLocaleDateString()}</p>
                    <p><strong>Pickup Address:</strong> {claim.foodListing.pickupAddress}</p>
                  </div>
                  <div className="claim-contact">
                    <h4>Your Provided Info</h4>
                    <p><strong>Email:</strong> {claim.recipientEmail}</p>
                    <p><strong>Phone:</strong> {claim.recipientPhone}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
