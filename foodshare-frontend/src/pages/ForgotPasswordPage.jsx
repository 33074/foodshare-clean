import React, { useState } from 'react';
import apiClient from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Styles
const formContainerStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '2rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
};

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // --- THIS IS THE FIX ---
      // Removed the extra '1' from the URL
      const response = await apiClient.post('/auth/forgot-password', { email });
      // --- END FIX ---
      setMessage(response.data.message || 'Password reset email sent.');
    } catch (err) {
      console.error("Forgot password error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={formContainerStyle}>
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
