import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get the current user from context

  if (!user) {
    // If no user is logged in, redirect them to the login page
    return <Navigate to="/login" replace />; 
  }

  // If the user is logged in, show the actual page they requested
  return <Outlet />; 
};

export default ProtectedRoute;
