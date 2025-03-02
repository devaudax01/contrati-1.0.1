import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import { AdminDashboard } from './pages/AdminDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { UserDashboard } from './pages/UserDashboard';
import './index.css';
import { LandingPage } from './pages/LandingPage';
import AffiliateDashboard from './pages/affiliateDashboard';

function App() {
  // This would normally come from your auth context/state
  const userRole = 'owner'; // Example: 'admin', 'owner', 'employee', or 'user'

  return (
    <Router future={{ 
      v7_relativeSplatPath: true,
      v7_startTransition: true 
    }}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/owner/*" element={<OwnerDashboard />} />
        <Route path="/employee/*" element={<EmployeeDashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/affiliate/*" element={<AffiliateDashboard />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 