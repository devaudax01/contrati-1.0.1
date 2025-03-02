import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Car, 
  Calendar, 
  Clock,
  MapPin, 
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function MyRentals() {
  const [activeTab, setActiveTab] = useState('active');

  // Mock data - replace with actual API calls
  const rentals = {
    active: [
      {
        id: 1,
        car: "Tesla Model 3",
        startDate: "2024-03-15",
        endDate: "2024-03-20",
        location: "Paris Downtown",
        status: "active",
        price: 450,
        image: "/cars/tesla-model-3.jpg"
      }
    ],
    upcoming: [
      {
        id: 2,
        car: "BMW X5",
        startDate: "2024-04-01",
        endDate: "2024-04-05",
        location: "Airport Terminal 2",
        status: "confirmed",
        price: 600,
        image: "/cars/bmw-x5.jpg"
      }
    ],
    past: [
      {
        id: 3,
        car: "Mercedes C-Class",
        startDate: "2024-02-10",
        endDate: "2024-02-15",
        location: "City Center",
        status: "completed",
        price: 500,
        image: "/cars/mercedes-c.jpg"
      }
    ]
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800"
    };

    const StatusIcon = status === 'active' ? CheckCircle : 
                      status === 'confirmed' ? Clock : 
                      status === 'completed' ? CheckCircle : AlertCircle;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        <StatusIcon className="w-4 h-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>
          <p className="mt-2 text-gray-600">View and manage your vehicle rentals</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['active', 'upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Rental Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rentals[activeTab].map((rental) => (
            <div key={rental.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Car Image */}
              <div className="h-48 w-full bg-gray-200">
                <img
                  src={rental.image}
                  alt={rental.car}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Car+Image';
                  }}
                />
              </div>

              {/* Rental Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{rental.car}</h3>
                  {getStatusBadge(rental.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{rental.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>€{rental.price}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100">
                    View Details
                  </button>
                  {rental.status === 'active' && (
                    <button className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-100">
                      Report Issue
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {rentals[activeTab].length === 0 && (
          <div className="text-center py-12">
            <Car className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No rentals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'active' ? "You don't have any active rentals" :
               activeTab === 'upcoming' ? "No upcoming rentals scheduled" :
               "No past rental history"}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 