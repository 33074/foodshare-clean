import React, { useState, useEffect } from 'react';
import { fetchFoodListings } from '../../services/foodService';
import FoodCard from './FoodCard';
import './FoodList.css';

// 1. Accept the new onClaimClick prop
const FoodList = ({ searchQuery, category, onClaimClick }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchFoodListings(searchQuery, category);
        setFoodItems(data);
      } catch (err) {
        console.error('Failed to fetch food:', err);
        setError('Could not load food listings. Please try again later.');
      }
      setLoading(false);
    };

    const timerId = setTimeout(() => {
      fetchFood();
    }, 300);

    return () => clearTimeout(timerId);

  }, [searchQuery, category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (foodItems.length === 0) return <div>No food listings found.</div>;

  return (
    <div className="food-list-grid">
      {foodItems.map((item) => (
        <FoodCard 
          key={item.id} 
          food={item} 
          onClaimClick={onClaimClick} // 2. Pass it to the card
        />
      ))}
    </div>
  );
};

export default FoodList;
