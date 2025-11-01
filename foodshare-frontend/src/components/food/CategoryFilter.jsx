import React from 'react';
import './CategoryFilter.css';

// --- THIS IS THE FIX ---
// Updated category names to match typical database entries
const categories = [
  'All',
  'Fresh Produce', // Changed from 'Fresh'
  'Baked',
  'Prepared',
  'Desi Indian',
  'Vegetables', // You might want to remove this if 'Fresh Produce' covers it
  'Fruits',     // You might want to remove this if 'Fresh Produce' covers it
  'Pantry',
  'Dairy',
  'Canned Goods' // Added this based on your Donate form
];
// --- END FIX ---

const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <div className="category-filter-dropdown">
      <select 
        value={selected} 
        onChange={(e) => onSelect(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
