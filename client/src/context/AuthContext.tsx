import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    console.log('AuthContext: Loading auth state from localStorage');
    console.log('Token:', storedToken ? 'exists' : 'null');
    console.log('User:', storedUser);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      console.log('AuthContext: User authenticated');
    } else {
      console.log('AuthContext: No auth data found');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const { token: newToken, user: newUser } = response;

      // Clear any existing data first
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Set new data
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      
      console.log('AuthContext: Login successful, state updated');
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.signup({ name, email, password });
      const { token: newToken, user: newUser } = response;

      // Clear any existing data first
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Set new data
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      
      console.log('AuthContext: Signup successful, state updated');
    } catch (error) {
      console.error('AuthContext: Signup failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
