import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard({ business, employees, isLoading, error }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeVehicles: 0,
    customerSatisfaction: 0,
    pendingBookings: 0,
    completedBookings: 0
  });

  useEffect(() => {
    // Simulated stats with more detailed information
    setStats({
      totalRevenue: 125789.50,
      totalBookings: 234,
      activeVehicles: 15,
      customerSatisfaction: 4.8,
      pendingBookings: 12,
      completedBookings: 189
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleQuickAction = (path) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Simplified Header without Generate Report button */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, {business?.name || 'Owner'}
          </h2>
          <p className="text-gray-500 mt-2 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Monthly Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            trend="up"
            trendValue="8%"
            valueClassName="text-blue-600"
            icon="💰"
          />
          <DashboardCard
            title="Total Bookings"
            value={stats.totalBookings}
            trend="up"
            trendValue="12%"
            icon="📅"
            subtitle={`${stats.pendingBookings} pending`}
          />
          <DashboardCard
            title="Active Vehicles"
            value={stats.activeVehicles}
            trend="up"
            trendValue="5%"
            icon="🚗"
            subtitle="Fleet status"
          />
          <DashboardCard
            title="Customer Rating"
            value={`${stats.customerSatisfaction}/5`}
            trend="up"
            trendValue="0.3"
            icon="⭐"
            subtitle="Based on 150 reviews"
          />
        </div>

        {/* Business Performance with Enhanced UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <span className="mr-2">👥</span> Business Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Employees</span>
                <span className="font-semibold">{employees?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Business Name</span>
                <span className="font-semibold">{business?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold">{business?.location || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Contact</span>
                <span className="font-semibold">{business?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions with Enhanced UI */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <span className="mr-2">⚡</span> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleQuickAction('/owner/vehicles')}
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🚗</span>
                <span className="text-blue-600 font-medium">Add Vehicle</span>
              </button>
              <button 
                onClick={() => handleQuickAction('/owner/bookings')}
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>📅</span>
                <span className="text-green-600 font-medium">New Booking</span>
              </button>
              <button 
                onClick={() => handleQuickAction('/owner/employees')}
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>👥</span>
                <span className="text-purple-600 font-medium">Add Employee</span>
              </button>
              <button 
                onClick={() => handleQuickAction('/owner/reports')}
                className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>📊</span>
                <span className="text-orange-600 font-medium">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 