import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='d-flex justify-content-center align-items-center '>
      <h1>Error: Unauthorized Access</h1>
      <p>Your session has expired or your token is invalid. Please log in again.</p>
      <button onClick={handleGoToLogin}>Go to Login Page</button>
    </div>
  );
};

export default Error;
