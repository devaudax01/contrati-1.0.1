import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Car, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Receipt,
  DollarSign
} from 'lucide-react';

export default function Dashboard() {
  // Mock data for demonstration
  const rentalHistory = [
    {
      id: 1,
      contractNumber: "CTR-2024-001",
      vehicle: "Toyota Camry",
      startDate: "2024-03-20",
      endDate: "2024-03-25",
      amount: 450,
      status: "completed"
    },
    {
      id: 2,
      contractNumber: "CTR-2024-002",
      vehicle: "Honda CR-V",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      amount: 550,
      status: "active"
    }
  ];

  const stats = [
    {
      title: "Total Contracts",
      value: "5",
      icon: Receipt,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Vehicles Rented",
      value: "3",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Spent",
      value: "€2,450",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-700">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-blue-50 text-blue-700">
            <Clock className="w-4 h-4" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-gray-50 text-gray-700">
            <AlertCircle className="w-4 h-4" />
            {status}
          </span>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your rental activity and history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rental History Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Rental History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rentalHistory.map((rental) => (
                  <tr key={rental.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rental.contractNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rental.vehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rental.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rental.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €{rental.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(rental.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rentalHistory.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <AlertCircle className="w-6 h-6 mx-auto mb-2" />
              <p>No rental history available</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}