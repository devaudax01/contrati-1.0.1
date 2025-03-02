import { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, token, setAuth, logout, updateUser } = useAuthStore();

  // You can add additional logic here, like token refresh
  useEffect(() => {
    // Check token validity, refresh if needed
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, setAuth, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 