import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { 
  Home,
  ShoppingBag,
  CreditCard,
  Users,
  Settings as SettingsIcon,
  Bell,
  Car,
  Calendar,
  FileText,
  MessageSquare
} from 'lucide-react';
import { getEmployeeRentals, getEmployeeStats } from '../mockApi/employee';
import { StatCard } from '../components/dashboard/StatCard';
import { Chart } from '../components/dashboard/Chart';
import { Calendar as CalendarComponent } from '../components/dashboard/Calendar';

// Import components
import Dashboard from './User/Dashboard';
import MyRentals from './User/MyRentals';
import BookCar from './User/BookCar';
import Payments from './User/Payments';
import Contracts from './User/Contracts';
import Messages from './User/Messages';
import Settings from './User/Settings';

export const UserDashboard = () => {
  const navigation = [
    { name: 'Dashboard', path: '/user/dashboard', icon: Home },
    { name: 'My Rentals', path: '/user/rentals', icon: Car },
    { name: 'Book a Car', path: '/user/book', icon: Calendar },
    { name: 'Contracts', path: '/user/contracts', icon: FileText },
    { name: 'Payments', path: '/user/payments', icon: CreditCard },
    { name: 'Messages', path: '/user/messages', icon: MessageSquare },
    { name: 'Settings', path: '/user/settings', icon: Settings }
  ];

  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="rentals" element={<MyRentals />} />
      <Route path="book" element={<BookCar />} />
      <Route path="contracts" element={<Contracts />} />
      <Route path="payments" element={<Payments />} />
      <Route path="messages" element={<Messages />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

const UserHome = () => {
  const [rentals, setRentals] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const [rentalsResponse, statsResponse] = await Promise.all([
          getEmployeeRentals(),
          getEmployeeStats()
        ]);

        if (rentalsResponse.success) {
          setRentals(rentalsResponse.data);
        }
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      } catch (error) {
        setError('Failed to load dashboard data');
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Rentals',
        data: stats?.monthly_rentals || [],
        borderColor: 'rgb(99, 102, 241)',
        fill: false,
      }
    ]
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="mt-2 text-gray-600">Here's an overview of your account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-xl font-semibold">{stats?.currentPlan || "Premium Plan"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Payment</p>
                <p className="text-xl font-semibold">{new Date(stats?.nextPayment).toLocaleDateString() || "2024-04-15"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Referrals</p>
                <p className="text-xl font-semibold">{stats?.activeReferrals || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <CreditCard className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Savings</p>
                <p className="text-xl font-semibold">{stats?.totalSavings || "$0"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Rentals"
            value={stats?.totalRentals.toString() || "0"}
            subtitle="This month"
          />
          <StatCard
            title="Revenue Generated"
            value={`${stats?.monthlyRevenue || 0} €`}
            subtitle="This month"
          />
          <StatCard
            title="Active Rentals"
            value={stats?.activeRentals.toString() || "0"}
            subtitle="Currently ongoing"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Rental Performance</h3>
              <Chart data={chartData} />
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Schedule</h3>
              <CalendarComponent />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Recent Rentals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rentals.map((rental) => (
                  <tr key={rental.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rental.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(rental.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(rental.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${rental.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          rental.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rental.price} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Placeholder components for other routes
const UserPlans = () => (
  <DashboardLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Plans</h1>
    </div>
  </DashboardLayout>
);

const UserPayments = () => (
  <DashboardLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Payments</h1>
    </div>
  </DashboardLayout>
);

const UserReferrals = () => (
  <DashboardLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Referrals</h1>
    </div>
  </DashboardLayout>
);

const UserNotifications = () => (
  <DashboardLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold">Notifications</h1>
    </div>
  </DashboardLayout>
);

const UserSettings = () => (
  <DashboardLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>
  </DashboardLayout>
); 