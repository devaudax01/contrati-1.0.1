import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Import and setup MSW only in development
if (process.env.NODE_ENV === 'development') {
  const { setupMocks } = require('../mocks/setup');
  setupMocks();
}

const api = axios.create({
  // Remove baseURL completely for development to let MSW handle all requests
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3001' : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api; 