import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - Clearing auth data');
      // Only redirect if we're not already on a public route
      const isPublicRoute = window.location.pathname === '/login' || window.location.pathname === '/signup';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (!isPublicRoute) {
        console.log('Redirecting to login...');
        // Use a small delay to ensure localStorage is cleared
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
