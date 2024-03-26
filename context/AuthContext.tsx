import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check for token in localStorage when the app loads
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true); // Automatically log in if token exists
    }
  }, []);

  const logIn = (token: string) => {
    localStorage.setItem('access_token', token); // Save token to localStorage
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('access_token'); // Remove token from localStorage
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
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
