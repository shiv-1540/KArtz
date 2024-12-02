import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    try {
      return storedAuthData ? JSON.parse(storedAuthData) : { token: null, userId: null };
    } catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
      localStorage.removeItem('authData'); // Clear invalid data
      return { token: null, userId: null };
    }
  });

  // Save authData to localStorage whenever it changes
  useEffect(() => {
    if (authData.token && authData.userId) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  // Login function to store token and userId
  const login = (token, userId) => {
    setAuthData({ token, userId });
    console.log("Logging in with token:", token); // Debugging log
  };

  // Logout function to clear token and userId
  const logout = () => {
    console.log("Logging out...");
    setAuthData({ token: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;