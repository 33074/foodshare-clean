import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import FoodList from '../components/food/FoodList';
import SearchBar from '../components/food/SearchBar';
import CategoryFilter from '../components/food/CategoryFilter';
import ClaimModal from '../components/food/ClaimModal';
import apiClient from '../services/api';
import { useAuth } from '../hooks/useAuth'; // 2. Import useAuth
import './BrowseFoodPage.css';

const BrowseFoodPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [claimError, setClaimError] = useState('');
  const [claimSuccess, setClaimSuccess] = useState('');
  
  const { user } = useAuth(); // 3. Get the current user
  const navigate = useNavigate(); // 4. Get the navigate function

  const handleOpenClaimModal = (food) => {
    // --- THIS IS THE FIX ---
    // 5. Check if the user is logged in
    if (!user) {
      // If not logged in, redirect to login page
      navigate('/login'); 
    } else {
      // If logged in, proceed to open the modal
      setSelectedFood(food);
      setIsModalOpen(true);
      setClaimError('');
      setClaimSuccess('');
    }
    // --- END FIX ---
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  const handleConfirmClaim = async (claimDetails) => {
    try {
      setClaimError('');
      // Send the claim request (backend now handles null user if needed)
      await apiClient.post('/claims', claimDetails); 
      handleCloseModal();
      setClaimSuccess('Item claimed successfully!');
      // Force a refresh of the list
      setSearchQuery(q => q + ' '); 
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setClaimError(err.response.data);
      } else {
        setClaimError('Failed to claim item. Please check your connection.');
      }
    }
  };

  return (
    <div className="container">
      <div className="browse-header">
        <h1>Available Near You</h1>
        <p>Claim fresh food donations from your community.</p>
        <div className="search-and-filter">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter 
            selected={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>
      </div>
      
      {claimError && <p style={{color: 'red', textAlign: 'center'}}>{claimError}</p>}
      {claimSuccess && <p style={{color: 'green', textAlign: 'center'}}>{claimSuccess}</p>}

      <FoodList 
        searchQuery={searchQuery} 
        category={selectedCategory}
        onClaimClick={handleOpenClaimModal} // Pass the updated handler
      />
      
      <ClaimModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        foodItem={selectedFood}
        onConfirm={handleConfirmClaim}
      />
    </div>
  );
};

export default BrowseFoodPage;
