// AuthContext.js
import React, { createContext,useContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();
// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    try {
      return storedAuthData ? JSON.parse(storedAuthData) : { token: null, userId: null, profileImage: null };
    } 
    catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
      localStorage.removeItem('authData'); // Clear invalid data
      return { token: null, userId: null, profileImage: null };
    }
  });

  // Save authData to localStorage whenever it changes
  useEffect(() => {
    if (authData.token && authData.userId) {
      localStorage.setItem('authData', JSON.stringify(authData));
    }
     else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  // Login function to store token, userId, and profileImage
  const login = (token, userId, profileImage) => {
    setAuthData({ token, userId, profileImage });
    console.log("Logging in with token:", token); // Debugging log
  };

  // Logout function to clear token, userId, and profileImage
  const logout = () => {
    console.log("Logging out...");
    setAuthData({ token: null, userId: null, profileImage: null });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;