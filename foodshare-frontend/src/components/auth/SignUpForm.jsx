import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signupUser } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await signupUser(firstName, lastName, email, password);
      login(data.token); // Log them in right away
      navigate('/browse'); // Redirect to browse page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create account. Email may already be in use.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input
        label="First Name"
        id="firstName"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Input
        label="Last Name"
        id="lastName"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password (min 6 characters)"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <Button type="submit" style={{ width: '100%' }}>
        Get Started
      </Button>
    </form>
  );
};

export default SignUpForm;
