import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean; // Add an isAdmin state
  logIn: (token: string, isAdmin: boolean) => void; // Update logIn to accept isAdmin
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State to hold admin status

  useEffect(() => {
    // Check for token and admin status in localStorage when the app loads
    const token = localStorage.getItem('access_token');
    const adminStatus = localStorage.getItem('is_admin') === 'true'; // Assuming 'is_admin' is stored as a string
    if (token) {
      setIsLoggedIn(true); // Automatically log in if token exists
      setIsAdmin(adminStatus); // Set admin status based on localStorage
    }
  }, []);

  const logIn = (token: string, isAdmin: boolean) => {
    localStorage.setItem('access_token', token); // Save token to localStorage
    localStorage.setItem('is_admin', isAdmin.toString()); // Save admin status to localStorage
    setIsLoggedIn(true);
    setIsAdmin(isAdmin); // Update admin status in context
  };

  const logOut = () => {
    localStorage.removeItem('access_token'); // Remove token from localStorage
    localStorage.removeItem('is_admin'); // Remove admin status from localStorage
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin status
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
