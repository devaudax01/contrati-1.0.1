import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBusiness, getEmployees } from '../mockApi/owner';
import { useAuthStore } from '../stores/authStore';
import Dashboard from './owner/Dashboard';
import Customers from './owner/Customers';
import Vehicles from './owner/Vehicles';
import Bookings from './owner/Bookings';
import { Employees } from './owner/Employees';
import { OwnerReports as Reports } from './owner/Reports';
import Settings from './owner/Settings';
import Fleet from './owner/Fleet';
import BusinessProfile from './owner/BusinessProfile';
import Maintenance from './owner/Maintenance';
import Documents from './owner/Documents';
import ReferFriend from './owner/ReferFriend';

export const OwnerDashboard = () => {
  const [business, setBusiness] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [businessResponse, employeesResponse] = await Promise.all([
          getBusiness(),
          getEmployees()
        ]);

        if (businessResponse.success) {
          setBusiness(businessResponse.data);
        }
        if (employeesResponse.success) {
          setEmployees(employeesResponse.data);
        }
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'owner') {
      fetchDashboardData();
    }
  }, [user]);

  // Redirect if not authenticated or not an owner
  if (!user || user.role !== 'owner') {
    return <Navigate to="/login" replace />;
  }

  // Pass the fetched data as props to child components
  const dashboardProps = {
    business,
    employees,
    isLoading,
    error
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard {...dashboardProps} />} />
      <Route path="customers" element={<Customers />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="fleet" element={<Fleet />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="employees" element={<Employees employees={employees} />} />
      <Route path="reports" element={<Reports business={business} />} />
      <Route path="settings" element={<Settings business={business} />} />
      <Route path="businessProfile" element={<BusinessProfile business={business} />} />
      <Route path="fleet/maintenance" element={<Maintenance />} />
      <Route path="documents" element={<Documents />} />
      <Route path="referrals" element={<ReferFriend />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}; 