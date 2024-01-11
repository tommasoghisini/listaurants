import React, { useContext, useEffect } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

// children is the component that will be rendered if the user is authenticated
const ProtectedRoute = ({ children }) => {
  // Get the authentication state from the context
  const isAuthenticated = useContext(AuthContext);
  // Get the navigate function from the router
  const navigate = useNavigate();

  // If the user is not authenticated, redirect to the home page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    // dependency array allows to re-run the effect when the
    // isAuthenticated state changes or the navigate function changes
  }, [isAuthenticated, navigate]);


  // If the user is not authenticated, don't render anything
  if (!isAuthenticated) {
    return null;
  }

  // If the user is authenticated, render the children prop
  return children;
};

export default ProtectedRoute;