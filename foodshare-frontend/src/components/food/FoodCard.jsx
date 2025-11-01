import React from 'react';
import Button from '../common/Button';
import './FoodCard.css';

// A simple function to format dates
const formatExpiry = (dateString) => {
  if (!dateString) return 'Expires: N/A';
  const date = new Date(dateString);
  const now = new Date();
  
  // Basic check if it's today
  if (date.toDateString() === now.toDateString()) {
    return `Expires: Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Expired';
  if (diffDays === 1) return 'Expires: Tomorrow';
  return `Expires: In ${diffDays} days`;
};

const getTagClass = (category) => {
  if (!category) return 'tag-general';
  const cat = category.toLowerCase();
  if (cat.includes('fresh')) return 'tag-fresh';
  if (cat.includes('baked')) return 'tag-baked';
  if (cat.includes('prepared')) return 'tag-prepared';
  if (cat.includes('pantry')) return 'tag-pantry';
  if (cat.includes('dairy')) return 'tag-dairy';
  return 'tag-general';
};

const FoodCard = ({ food, onClaimClick }) => {
  const imageUrl = food.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image';

  return (
    <div className="food-card">
      <img src={imageUrl} alt={food.title} className="food-card-image" />
      <div className="food-card-body">
        <div className="food-card-header">
          <h3 className="food-card-title">{food.title}</h3>
          <span className={`food-card-tag ${getTagClass(food.category)}`}>
            {food.category || 'Food'}
          </span>
        </div>
        <p className="food-card-description">{food.description}</p>
        
        {/* --- NEW ICON ROWS --- */}
        <div className="food-card-info-row">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f39c12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            4.9
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            {food.portions} portions
          </span>
        </div>
        <div className="food-card-info-row">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {food.pickupAddress || 'Community Center'}
          </span>
        </div>
        {/* --- END ICON ROWS --- */}

        <div className="food-card-expiry">
          {formatExpiry(food.expiresAt)}
        </div>
      </div>
      <div className="food-card-footer">
        <Button 
          style={{ width: '100%' }}
          onClick={() => onClaimClick(food)}
          disabled={food.status !== 'AVAILABLE'}
        >
          {food.status === 'AVAILABLE' ? 'Claim This Food' : 'Claimed'}
        </Button>
      </div>
    </div>
  );
};

export default FoodCard;
