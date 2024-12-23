// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast'; // Import toast for popup notifications

const ProtectedRoute = ({ children }) => {
    const { authData } = useContext(AuthContext);
    console.log("From Protection: ", authData);
    
    // Retrieve the isLoggedIn value from localStorage and convert it to a boolean
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log("From Protection isLoggedIn: ", isLoggedIn);

    // Check if the user is not logged in
    if ( !isLoggedIn) {
        // Show a popup notification
       // toast.error("You must be logged in to access this page.");
        // Redirect to login page
        return <Navigate to="/login" />;
    }

    return children; // If logged in, render the children components
};

export default ProtectedRoute;