import React from 'react';
import './Pagination.css';

const Pagination = () => {
  // This is a placeholder.
  // Real pagination requires state and logic.
  return (
    <div className="pagination-container">
      <button className="pagination-button" disabled>Previous</button>
      <span className="page-info">Page 1 of 1</span>
      <button className="pagination-button" disabled>Next</button>
    </div>
  );
};

export default Pagination;
