import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './employee/Dashboard';
import Vehicles from './employee/Vehicles';
import Bookings from './employee/Bookings';
import Customers from './employee/Customers';
import Profile from './employee/Profile';
import Settings from './employee/Settings';
import Documents from './employee/Documents';
import Tasks from './employee/Tasks';
import Messages from './employee/Messages';


export const EmployeeDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="customers" element={<Customers />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="documents" element={<Documents />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="messages" element={<Messages />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default EmployeeDashboard; 