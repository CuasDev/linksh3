import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Set the token in the API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/register', userData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/login', credentials);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};