import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(email, password);
      login(data.token); // Save token to AuthContext
      navigate('/browse'); // Redirect to browse page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" style={{ width: '100%' }}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
