import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Styles (same as login)
const formContainerStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '2rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
};

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get token from URL query parameter on load
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('Invalid password reset link.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
        setError('Invalid or missing reset token.');
        return;
    }

    setLoading(true);

    try {
      // Call the new backend endpoint
      const response = await apiClient.post('/auth/reset-password', { 
        token, 
        newPassword 
      });
      setMessage(response.data.message || 'Password has been reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 secs
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.response?.data?.error || 'Failed to reset password. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={formContainerStyle}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <Input
            label="New Password"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading || !token || message}
          />
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading || !token || message}
          />
          <Button type="submit" style={{ width: '100%' }} disabled={loading || !token || message}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
