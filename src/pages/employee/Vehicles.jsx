import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Search,
  Car,
  Calendar,
  Fuel,
  Tag,
  CheckCircle,
  CircleDot
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      model: 'Toyota Camry',
      year: '2023',
      licensePlate: 'ABC-123',
      status: 'available',
      fuelType: 'Gasoline',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      mileage: '15,000 km',
      type: 'Sedan'
    },
    {
      id: 2,
      model: 'Honda CR-V',
      year: '2022',
      licensePlate: 'XYZ-789',
      status: 'maintenance',
      fuelType: 'Hybrid',
      lastMaintenance: '2024-02-20',
      nextMaintenance: '2024-03-20',
      mileage: '25,000 km',
      type: 'SUV'
    },
  ]);

  const statusOptions = [
    { 
      value: 'available', 
      label: 'Available', 
      color: 'text-green-700 bg-green-50 border-green-200',
      hoverColor: 'hover:bg-green-100',
      icon: <CircleDot className="h-4 w-4 text-green-500" />
    },
    { 
      value: 'rented', 
      label: 'Rented', 
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      icon: <CircleDot className="h-4 w-4 text-blue-500" />
    },
    { 
      value: 'maintenance', 
      label: 'Maintenance', 
      color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      hoverColor: 'hover:bg-yellow-100',
      icon: <CircleDot className="h-4 w-4 text-yellow-500" />
    },
    { 
      value: 'reserved', 
      label: 'Reserved', 
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      hoverColor: 'hover:bg-purple-100',
      icon: <CircleDot className="h-4 w-4 text-purple-500" />
    }
  ];

  const handleStatusChange = (vehicleId, newStatus) => {
    setVehicles(vehicles.map(vehicle => {
      if (vehicle.id === vehicleId) {
        return { ...vehicle, status: newStatus };
      }
      return vehicle;
    }));
    
    const statusLabel = statusOptions.find(option => option.value === newStatus)?.label;
    toast.success(`Vehicle status updated to ${statusLabel}`);
  };

  const getStatusBadge = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : 'bg-gray-100 text-gray-700';
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Vehicle Fleet</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and monitor vehicle information
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {vehicle.year} • {vehicle.type}
                    </p>
                  </div>
                  <div className="relative group">
                    <select
                      value={vehicle.status}
                      onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                      className={`appearance-none cursor-pointer pl-7 pr-8 py-1.5 rounded-lg text-sm font-medium 
                        border-2 transition-all duration-200 outline-none
                        ${getStatusBadge(vehicle.status)}
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      {statusOptions.map(option => (
                        <option 
                          key={option.value} 
                          value={option.value}
                          className={`bg-white ${option.color.split(' ')[0]}`}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {/* Status Icon Overlay */}
                    <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                      {statusOptions.find(opt => opt.value === vehicle.status)?.icon}
                    </div>
                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg className="h-4 w-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="h-4 w-4 mr-2 text-gray-400" />
                    {vehicle.licensePlate}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Fuel className="h-4 w-4 mr-2 text-gray-400" />
                    {vehicle.fuelType}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Maintenance</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {vehicle.lastMaintenance}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Next Service</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {vehicle.nextMaintenance}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="h-4 w-4 mr-2 text-gray-400" />
                      Mileage: {vehicle.mileage}
                    </div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${getStatusBadge(vehicle.status)}`}>
                      {statusOptions.find(opt => opt.value === vehicle.status)?.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
        }}
      />
    </DashboardLayout>
  );
};

export default Vehicles; 