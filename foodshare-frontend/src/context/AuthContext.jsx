import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for a token in localStorage when app loads
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        // Check if token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({ email: decodedToken.sub, token });
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      setUser({ email: decodedToken.sub, token });
    } catch (error) {
      console.error('Failed to decode token on login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
