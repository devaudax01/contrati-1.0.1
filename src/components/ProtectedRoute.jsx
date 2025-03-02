import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but wrong role, redirect to appropriate dashboard
  if (!allowedRoles.includes(user.role)) {
    const roleRedirects = {
      admin: '/admin/dashboard',
      employee: '/employee/dashboard',
      owner: '/owner/dashboard'
    };
    return <Navigate to={roleRedirects[user.role] || '/'} replace />;
  }

  return children;
}; 