import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Car, Calendar, Users, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { mockBookings, mockVehicles, mockDashboardStats } from '../../utils/mockData';
import { TodayTasks } from '../../components/dashboard/TodayTasks';

export const EmployeeDashboard = () => {
  // Get today's bookings
  const todayBookings = mockBookings.filter(booking => {
    const today = new Date().toISOString().split('T')[0];
    return booking.startDate.includes(today);
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Active Rentals"
            value={mockDashboardStats.activeRentals}
            icon={<Car className="h-6 w-6" />}
            trend="+5% from last week"
          />
          <StatsCard 
            title="Today's Bookings"
            value={todayBookings.length}
            icon={<Calendar className="h-6 w-6" />}
            trend="2 pending returns"
          />
          <StatsCard 
            title="Available Vehicles"
            value={mockDashboardStats.vehicleStats.available}
            icon={<CheckCircle className="h-6 w-6" />}
            trend="3 due for maintenance"
          />
          <StatsCard 
            title="Customer Satisfaction"
            value="4.8/5"
            icon={<Users className="h-6 w-6" />}
            trend="+0.3 from last month"
          />
        </div>

        {/* Recent Activities and Tasks */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {mockDashboardStats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'booking' && <Calendar className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'return' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {activity.type === 'maintenance' && <Clock className="h-5 w-5 text-yellow-500" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
            <div className="space-y-4">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">
                        Booking #{booking.id} - {booking.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.startDate).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Vehicle Status Overview</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockVehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    vehicle.status === 'available' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Location: {vehicle.location}</p>
                  <p>Mileage: {vehicle.mileage.toLocaleString()} km</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Other dashboard widgets */}
          </div>
          <div>
            <TodayTasks />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        {icon}
      </div>
    </div>
    {trend && (
      <p className="text-xs text-gray-500 mt-2">{trend}</p>
    )}
  </div>
);

export default EmployeeDashboard; 