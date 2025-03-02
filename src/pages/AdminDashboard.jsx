import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './admin/Dashboard';
import { Businesses } from './admin/Businesses';
import { Users } from './admin/Users';
import { Plans } from './admin/Plans';
import { Subscriptions } from './admin/Subscriptions';
import { Notifications } from './admin/Notifications';
import { Settings } from './admin/Settings';
import { Payments } from './admin/Payments';
import { AdminReferrals } from './admin/AdminReferrals';
export const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="businesses" element={<Businesses />} />
      <Route path="users" element={<Users />} />
      <Route path="plans" element={<Plans />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="settings" element={<Settings />} />
      <Route path="payments" element={<Payments />} />
      <Route path="referrals" element={<AdminReferrals />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}; 