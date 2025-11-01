import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import './DonateFoodPage.css';

// YOUR CLOUDINARY DETAILS
const YOUR_CLOUD_NAME = "dqtrej6r9";
const YOUR_UPLOAD_PRESET = "xysyhu7h";

const DonateFoodPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Set default category to match the first option
  const [category, setCategory] = useState('Fresh Produce'); 
  const [portions, setPortions] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please select an image to upload.');
      return;
    }
    
    if (!expiresAt) {
      setError('Please set an expiry date and time.');
      return;
    }

    setIsUploading(true);
    let imageUrl = '';

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', YOUR_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${YOUR_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      imageUrl = data.secure_url;
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Image upload failed. Please try again.');
      setIsUploading(false);
      return;
    }

    if (imageUrl) {
      try {
        const donationData = {
          title,
          description,
          category,
          portions: parseInt(portions, 10),
          expiresAt: new Date(expiresAt).toISOString(),
          pickupAddress,
          imageUrl: imageUrl,
        };

        await apiClient.post('/food/donate', donationData);
        
        setSuccess('Donation posted successfully! Redirecting...');
        setIsUploading(false);
        setTimeout(() => {
          navigate('/browse');
        }, 2000);

      } catch (err) {
        console.error(err);
        setError('Failed to post donation. Are you logged in?');
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="donate-page-container">
        <div className="donate-form-card">
          <h2>Share Your Surplus</h2>
          <p>Thank you for making a difference. Please fill out the details below.</p>
          
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Food Item Name</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Artisan Sourdough Bread" required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., 5 loaves, baked this morning." rows={4} required />
            </div>

            {/* --- THIS IS THE FIX --- */}
            {/* Updated the options to match the filter dropdown */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option>Fresh Produce</option>
                <option>Baked</option>
                <option>Prepared</option>
                <option>Desi Indian</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Pantry</option>
                <option>Dairy</option>
                <option>Canned Goods</option>
              </select>
            </div>
            {/* --- END FIX --- */}

            <div className="form-group">
              <label htmlFor="portions">Number of Portions</label>
              <input type="number" id="portions" value={portions} onChange={(e) => setPortions(e.target.value)} placeholder="e.g., 10" required />
            </div>

            <div className="form-group">
              <label htmlFor="expiresAt">Expires At</label>
              <input type="datetime-local" id="expiresAt" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} required />
            </div>
            
            <div className="form-group">
              <label htmlFor="pickupAddress">Pickup Address</label>
              <input type="text" id="pickupAddress" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} placeholder="e.g., 123 Main St, Community Center" required />
            </div>

            <div className="form-group">
              <label htmlFor="file-upload">Upload Photo</label>
              <input 
                type="file" 
                id="file-upload"
                className="file-input"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleFileChange}
                required 
              />
              {file && <p>Selected: {file.name}</p>}
            </div>

            <button type="submit" className="btn-submit-donation" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Post Donation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateFoodPage;
