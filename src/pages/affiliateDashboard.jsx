import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './affiliate/Dashboard';
import Referrals from './affiliate/Referrals';
import Earnings from './affiliate/Earnings';
import AffiliateCar from './affiliate/AffiliateCar';
import Profile from './affiliate/Profile';
import Settings from './affiliate/Settings';

export const AffiliateDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="referrals" element={<Referrals />} />
      <Route path="earnings" element={<Earnings />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="affiliateCar" element={<AffiliateCar />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AffiliateDashboard;