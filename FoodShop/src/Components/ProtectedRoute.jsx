import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const storedUserId = localStorage.getItem('userId');

  if (!token || !storedUserId) {
    // If no token or user ID is present, redirect to the login page
    return <Navigate to="/login" />;
  }

  try {
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      throw new Error('Token has expired');
    }

    if (decodedToken.userId !== storedUserId) {
      throw new Error('User ID does not match');
    }

    if (requiredRole && decodedToken.role !== requiredRole) {
    
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error('Validation error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return <Navigate to="/error" />;
  }
};

export default ProtectedRoute;
