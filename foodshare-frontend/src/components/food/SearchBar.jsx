import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search for food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-bar-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
