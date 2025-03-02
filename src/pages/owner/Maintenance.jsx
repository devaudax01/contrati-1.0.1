import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import {
  CalendarIcon,
  WrenchIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  SlidersHorizontalIcon,
  CarIcon,
  ShieldCheckIcon,
  SearchIcon,
  DropletIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  X,
  SettingsIcon
} from 'lucide-react';

export default function Maintenance() {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [maintenanceRecords] = useState([
    {
      id: 1,
      vehicleId: "VH001",
      vehicleName: "Toyota Camry 2022",
      type: "Routine",
      status: "completed",
      date: "2024-03-15",
      description: "Oil change and filter replacement",
      cost: 150.00,
      technician: "John Smith"
    },
    {
      id: 2,
      vehicleId: "VH002",
      vehicleName: "Honda CR-V 2023",
      type: "Repair",
      status: "pending",
      date: "2024-03-20",
      description: "Brake pad replacement",
      cost: 300.00,
      technician: "Mike Johnson"
    },
    {
      id: 3,
      vehicleId: "VH003",
      vehicleName: "Ford F-150 2021",
      type: "Emergency",
      status: "in-progress",
      description: "Transmission inspection",
      date: "2024-03-18",
      cost: 500.00,
      technician: "Sarah Wilson"
    },
  ]);

  const [isNewVignetteModalOpen, setIsNewVignetteModalOpen] = useState(false);
  const [newVignetteForm, setNewVignetteForm] = useState({
    vehicleId: '',
    date: '',
    amount: '',
    year: new Date().getFullYear(),
    reminderDays: '15' // default reminder days
  });

  const [isNewAssuranceModalOpen, setIsNewAssuranceModalOpen] = useState(false);
  const [newAssuranceForm, setNewAssuranceForm] = useState({
    vehicleId: '',
    startDate: '',
    endDate: '',
    amount: '',
    company: '',
    reminderDays: '15' // default reminder days
  });

  const [isNewVisiteTechniqueModalOpen, setIsNewVisiteTechniqueModalOpen] = useState(false);

  const [isNewVidangeModalOpen, setIsNewVidangeModalOpen] = useState(false);

  const [isNewOtherMaintenanceModalOpen, setIsNewOtherMaintenanceModalOpen] = useState(false);

  const tabs = [
    { id: 'maintenance', name: 'Maintenance Overview', icon: WrenchIcon },
    { id: 'vignette', name: 'Vignette', icon: CarIcon },
    { id: 'assurance', name: 'Assurance', icon: ShieldCheckIcon },
    { id: 'visite', name: 'Visite Technique', icon: SearchIcon },
    { id: 'vidange', name: 'Vidange', icon: DropletIcon },
    { id: 'other', name: 'Other Maintenance', icon: SettingsIcon },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      "in-progress": "bg-blue-100 text-blue-700"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleNewVignetteSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('New Vignette Data:', newVignetteForm);
    setIsNewVignetteModalOpen(false);
    // Reset form
    setNewVignetteForm({
      vehicleId: '',
      date: '',
      amount: '',
      year: new Date().getFullYear(),
      reminderDays: '15'
    });
  };

  const handleNewAssuranceSubmit = (e) => {
    e.preventDefault();
    console.log('New Assurance Data:', newAssuranceForm);
    setIsNewAssuranceModalOpen(false);
    setNewAssuranceForm({
      vehicleId: '',
      startDate: '',
      endDate: '',
      amount: '',
      company: '',
      reminderDays: '15'
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-1 px-4 py-4 text-sm font-medium text-center
                      ${activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon className="h-4 w-4" />
                      {tab.name}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'maintenance' && (
          <>
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Maintenance Overview</h1>
                  <p className="text-gray-500 mt-1">Dashboard for all vehicle maintenance categories</p>
                </div>
              </div>
            </div>

            {/* Total Charges Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Charges (This Month)</h3>
                  <p className="text-2xl font-semibold text-blue-600 mt-1">15,450 MAD</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Charges (This Year)</h3>
                  <p className="text-2xl font-semibold text-purple-600 mt-1">85,720 MAD</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
                  <p className="text-2xl font-semibold text-red-600 mt-1">2,500 MAD</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              {/* Vignette Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Vignettes</h3>
                  <CarIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Active</span>
                    <span className="text-sm font-medium text-green-600">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Expiring Soon</span>
                    <span className="text-sm font-medium text-yellow-600">3</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">12,000 MAD</span>
                  </div>
                </div>
              </div>

              {/* Assurance Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Assurance</h3>
                  <ShieldCheckIcon className="h-6 w-6 text-purple-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valid</span>
                    <span className="text-sm font-medium text-green-600">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">To Renew</span>
                    <span className="text-sm font-medium text-red-600">2</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">35,000 MAD</span>
                  </div>
                </div>
              </div>

              {/* Visite Technique Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Visite Technique</h3>
                  <SearchIcon className="h-6 w-6 text-orange-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valid</span>
                    <span className="text-sm font-medium text-green-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Due Soon</span>
                    <span className="text-sm font-medium text-yellow-600">4</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">4,800 MAD</span>
                  </div>
                </div>
              </div>

              {/* Vidange Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Vidange</h3>
                  <DropletIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Recent</span>
                    <span className="text-sm font-medium text-green-600">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Due Soon</span>
                    <span className="text-sm font-medium text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">6,400 MAD</span>
                  </div>
                </div>
              </div>

              {/* Other Maintenance Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Other</h3>
                  <WrenchIcon className="h-6 w-6 text-cyan-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="text-sm font-medium text-green-600">25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Scheduled</span>
                    <span className="text-sm font-medium text-blue-600">3</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">33,920 MAD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Update the Maintenance Costs by Category section to include Vidange */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Costs by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    { category: 'Vignettes', amount: 12000, color: 'bg-blue-500' },
                    { category: 'Assurance', amount: 35000, color: 'bg-purple-500' },
                    { category: 'Visite Technique', amount: 4800, color: 'bg-orange-500' },
                    { category: 'Vidange', amount: 6400, color: 'bg-green-500' },
                    { category: 'Other Maintenance', amount: 33920, color: 'bg-cyan-500' }
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">{item.category}</span>
                        <span className="text-sm font-medium text-gray-900">{item.amount.toLocaleString()} MAD</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full`} 
                          style={{ width: `${(item.amount / 92120 * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">92,120 MAD</p>
                    <p className="text-sm text-gray-500">Total Annual Maintenance Cost</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Maintenance Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      type: 'vidange',
                      vehicle: 'Toyota Camry',
                      date: '2024-03-15',
                      description: 'Oil change completed',
                      icon: DropletIcon,
                      iconColor: 'text-cyan-500'
                    },
                    {
                      type: 'vignette',
                      vehicle: 'Honda CR-V',
                      date: '2024-03-14',
                      description: 'Vignette renewed',
                      icon: CarIcon,
                      iconColor: 'text-blue-500'
                    },
                    {
                      type: 'visite',
                      vehicle: 'Ford F-150',
                      date: '2024-03-12',
                      description: 'Technical inspection passed',
                      icon: SearchIcon,
                      iconColor: 'text-orange-500'
                    },
                    {
                      type: 'assurance',
                      vehicle: 'BMW X5',
                      date: '2024-03-10',
                      description: 'Insurance renewed',
                      icon: ShieldCheckIcon,
                      iconColor: 'text-purple-500'
                    }
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${activity.iconColor} bg-opacity-10`}>
                          <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{activity.vehicle}</h3>
                            <span className="text-xs text-gray-500">{activity.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Maintenance */}
            <div className="mt-6 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Maintenance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      type: 'visite',
                      vehicle: 'Mercedes E-Class',
                      dueDate: '2024-03-25',
                      description: 'Technical inspection due',
                      status: 'upcoming',
                      icon: SearchIcon,
                      iconColor: 'text-orange-500'
                    },
                    {
                      type: 'vidange',
                      vehicle: 'Audi A4',
                      dueDate: '2024-03-28',
                      description: 'Oil change scheduled',
                      status: 'scheduled',
                      icon: DropletIcon,
                      iconColor: 'text-cyan-500'
                    },
                    {
                      type: 'assurance',
                      vehicle: 'Range Rover',
                      dueDate: '2024-04-01',
                      description: 'Insurance renewal',
                      status: 'upcoming',
                      icon: ShieldCheckIcon,
                      iconColor: 'text-purple-500'
                    }
                  ].map((maintenance, index) => {
                    const Icon = maintenance.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${maintenance.iconColor} bg-opacity-10`}>
                          <Icon className={`h-5 w-5 ${maintenance.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{maintenance.vehicle}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              maintenance.status === 'scheduled' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {maintenance.dueDate}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{maintenance.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'vignette' && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Vignette Management</h2>
                <p className="text-gray-500 mt-1">Track and manage vehicle vignettes</p>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => setIsNewVignetteModalOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
                New Vignette
              </button>
            </div>

            {/* Vignette History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicules</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Année</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      id: 1,
                      vehicle: "Toyota Camry",
                      vehicleId: "VH001",
                      date: "2024-03-15",
                      amount: 800.00,
                      year: "2024",
                      status: "active"
                    },
                    {
                      id: 2,
                      vehicle: "Honda CR-V",
                      vehicleId: "VH002",
                      date: "2024-02-20",
                      amount: 800.00,
                      year: "2024",
                      status: "expired"
                    },
                    {
                      id: 3,
                      vehicle: "Ford F-150",
                      vehicleId: "VH003",
                      date: "2024-01-10",
                      amount: 800.00,
                      year: "2024",
                      status: "expiring_soon"
                    },
                  ].map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.vehicle}</p>
                          <p className="text-xs text-gray-500">{record.vehicleId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.amount.toFixed(2)} MAD</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.year}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : record.status === 'expired'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status === 'expiring_soon' ? 'Expiring Soon' : 
                            record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {/* Add your view handler */}}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => {/* Add your edit handler */}}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {/* Add your delete handler */}}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'assurance' && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Assurance Management</h2>
                <p className="text-gray-500 mt-1">Track and manage vehicle insurance</p>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => setIsNewAssuranceModalOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
                New Assurance
              </button>
            </div>

            {/* Insurance History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicules</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Début</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Fin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compagnie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      id: 1,
                      vehicle: "Toyota Camry",
                      vehicleId: "VH001",
                      startDate: "2024-01-01",
                      endDate: "2024-12-31",
                      amount: 3500.00,
                      year: "2024",
                      company: "Saham Assurance",
                      status: "active"
                    },
                    {
                      id: 2,
                      vehicle: "Honda CR-V",
                      vehicleId: "VH002",
                      startDate: "2024-02-01",
                      endDate: "2025-01-31",
                      amount: 4200.00,
                      year: "2024",
                      company: "Wafa Assurance",
                      status: "active"
                    },
                    {
                      id: 3,
                      vehicle: "Ford F-150",
                      vehicleId: "VH003",
                      startDate: "2024-03-01",
                      endDate: "2024-03-15",
                      amount: 3800.00,
                      year: "2024",
                      company: "RMA Assurance",
                      status: "expiring_soon"
                    },
                  ].map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.vehicle}</p>
                          <p className="text-xs text-gray-500">{record.vehicleId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.startDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.endDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.amount.toFixed(2)} MAD</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.company}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : record.status === 'expired'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status === 'expiring_soon' ? 'Expiring Soon' : 
                            record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {/* Add your view handler */}}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => {/* Add your edit handler */}}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {/* Add your delete handler */}}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* New Assurance Modal */}
            {isNewAssuranceModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                  <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Assurance</h3>
                    <button
                      onClick={() => setIsNewAssuranceModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleNewAssuranceSubmit} className="p-6">
                    <div className="space-y-4">
                      {/* Vehicle Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Véhicule
                        </label>
                        <select
                          required
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newAssuranceForm.vehicleId}
                          onChange={(e) => setNewAssuranceForm({
                            ...newAssuranceForm,
                            vehicleId: e.target.value
                          })}
                        >
                          <option value="">Select a vehicle</option>
                          <option value="VH001">Toyota Camry (VH001)</option>
                          <option value="VH002">Honda CR-V (VH002)</option>
                          <option value="VH003">Ford F-150 (VH003)</option>
                        </select>
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Début
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newAssuranceForm.startDate}
                          onChange={(e) => setNewAssuranceForm({
                            ...newAssuranceForm,
                            startDate: e.target.value
                          })}
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Fin
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newAssuranceForm.endDate}
                          onChange={(e) => setNewAssuranceForm({
                            ...newAssuranceForm,
                            endDate: e.target.value
                          })}
                        />
                      </div>

                      {/* Amount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Montant (MAD)
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newAssuranceForm.amount}
                          onChange={(e) => setNewAssuranceForm({
                            ...newAssuranceForm,
                            amount: e.target.value
                          })}
                        />
                      </div>

                      {/* Insurance Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Compagnie d'Assurance
                        </label>
                        <select
                          required
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newAssuranceForm.company}
                          onChange={(e) => setNewAssuranceForm({
                            ...newAssuranceForm,
                            company: e.target.value
                          })}
                        >
                          <option value="">Select a company</option>
                          <option value="Saham Assurance">Saham Assurance</option>
                          <option value="Wafa Assurance">Wafa Assurance</option>
                          <option value="RMA Assurance">RMA Assurance</option>
                          <option value="Atlanta">Atlanta</option>
                          <option value="Allianz">Allianz</option>
                        </select>
                      </div>

                      {/* Reminder Days */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reminder Before Expiration
                        </label>
                        <select
                          required
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newAssuranceForm.reminderDays}
                          onChange={(e) => setNewAssuranceForm({
                            ...newAssuranceForm,
                            reminderDays: e.target.value
                          })}
                        >
                          <option value="10">10 days before</option>
                          <option value="15">15 days before</option>
                          <option value="30">30 days before</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={() => setIsNewAssuranceModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Save Assurance
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'visite' && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Visite Technique Management</h2>
                <p className="text-gray-500 mt-1">Track and manage vehicle technical inspections</p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => setIsNewVisiteTechniqueModalOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
                New Visite Technique
              </button>
            </div>

            {/* Visite Technique History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicules</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Visite</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Expiration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Centre Visite</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Résultat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coût</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      id: 1,
                      vehicle: "Toyota Camry",
                      vehicleId: "VH001",
                      visitDate: "2024-03-15",
                      expirationDate: "2025-03-15",
                      center: "AutoControl Center",
                      result: "Passed",
                      cost: 400.00,
                      status: "valid"
                    },
                    {
                      id: 2,
                      vehicle: "Honda CR-V",
                      vehicleId: "VH002",
                      visitDate: "2024-02-20",
                      expirationDate: "2024-04-20",
                      center: "TechnoControl",
                      result: "Passed with remarks",
                      cost: 400.00,
                      status: "expiring_soon"
                    },
                    {
                      id: 3,
                      vehicle: "Ford F-150",
                      vehicleId: "VH003",
                      visitDate: "2023-12-10",
                      expirationDate: "2024-02-10",
                      center: "CarCheck Pro",
                      result: "Failed",
                      cost: 400.00,
                      status: "expired"
                    },
                  ].map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.vehicle}</p>
                          <p className="text-xs text-gray-500">{record.vehicleId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.visitDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.expirationDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.center}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.result === 'Passed' 
                            ? 'bg-green-100 text-green-700'
                            : record.result === 'Failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.cost.toFixed(2)} MAD</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'valid' 
                            ? 'bg-green-100 text-green-700'
                            : record.status === 'expired'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status === 'valid' ? 'Valid' :
                           record.status === 'expired' ? 'Expired' : 
                           'Expiring Soon'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {/* Add your view handler */}}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => {/* Add your edit handler */}}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {/* Add your delete handler */}}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'vidange' && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Vidange Management</h2>
                <p className="text-gray-500 mt-1">Track and manage oil changes</p>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => setIsNewVidangeModalOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
                New Vidange
              </button>
            </div>

            {/* Vidange History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicules</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Vidange</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kilométrage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type Huile</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prochain Vidange</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coût</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      id: 1,
                      vehicle: "Toyota Camry",
                      vehicleId: "VH001",
                      date: "2024-03-15",
                      mileage: "50,000",
                      oilType: "5W-30 Synthetic",
                      nextService: "55,000",
                      cost: 500.00,
                      status: "recent"
                    },
                    {
                      id: 2,
                      vehicle: "Honda CR-V",
                      vehicleId: "VH002",
                      date: "2024-02-20",
                      mileage: "75,000",
                      oilType: "0W-20 Synthetic",
                      nextService: "80,000",
                      cost: 450.00,
                      status: "due_soon"
                    },
                    {
                      id: 3,
                      vehicle: "Ford F-150",
                      vehicleId: "VH003",
                      date: "2024-01-10",
                      mileage: "100,000",
                      oilType: "5W-40 Synthetic",
                      nextService: "105,000",
                      cost: 600.00,
                      status: "overdue"
                    },
                  ].map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.vehicle}</p>
                          <p className="text-xs text-gray-500">{record.vehicleId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.mileage} km</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.oilType}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.nextService} km</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.cost.toFixed(2)} MAD</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'recent' 
                            ? 'bg-green-100 text-green-700'
                            : record.status === 'overdue'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status === 'recent' ? 'Recent' :
                           record.status === 'overdue' ? 'Overdue' : 
                           'Due Soon'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {/* Add your view handler */}}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => {/* Add your edit handler */}}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {/* Add your delete handler */}}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'other' && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Other Maintenance</h2>
                <p className="text-gray-500 mt-1">Track tires and other vehicle maintenance</p>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => setIsNewOtherMaintenanceModalOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
                New Maintenance
              </button>
            </div>

            {/* Other Maintenance History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicules</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mécanicien/Société</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coût</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      id: 1,
                      vehicle: "Toyota Camry",
                      vehicleId: "VH001",
                      type: "Pneus",
                      date: "2024-03-15",
                      description: "4 new Michelin tires installed",
                      mechanic: "Auto Pneus Plus",
                      cost: 4000.00,
                      status: "completed"
                    },
                    {
                      id: 2,
                      vehicle: "Honda CR-V",
                      vehicleId: "VH002",
                      type: "Freins",
                      date: "2024-03-10",
                      description: "Brake pads replacement",
                      mechanic: "Garage Mohammed",
                      cost: 800.00,
                      status: "completed"
                    },
                    {
                      id: 3,
                      vehicle: "Ford F-150",
                      vehicleId: "VH003",
                      type: "Batterie",
                      date: "2024-03-05",
                      description: "New battery installation",
                      mechanic: "ElectroAuto Services",
                      cost: 1200.00,
                      status: "completed"
                    },
                  ].map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.vehicle}</p>
                          <p className="text-xs text-gray-500">{record.vehicleId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.mechanic}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.cost.toFixed(2)} MAD</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'completed' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {/* Add your view handler */}}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => {/* Add your edit handler */}}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {/* Add your delete handler */}}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isNewVignetteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Vignette</h3>
              <button
                onClick={() => setIsNewVignetteModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleNewVignetteSubmit} className="p-6">
              <div className="space-y-4">
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Véhicule
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newVignetteForm.vehicleId}
                    onChange={(e) => setNewVignetteForm({
                      ...newVignetteForm,
                      vehicleId: e.target.value
                    })}
                  >
                    <option value="">Select a vehicle</option>
                    <option value="VH001">Toyota Camry (VH001)</option>
                    <option value="VH002">Honda CR-V (VH002)</option>
                    <option value="VH003">Ford F-150 (VH003)</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newVignetteForm.date}
                    onChange={(e) => setNewVignetteForm({
                      ...newVignetteForm,
                      date: e.target.value
                    })}
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant (MAD)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newVignetteForm.amount}
                    onChange={(e) => setNewVignetteForm({
                      ...newVignetteForm,
                      amount: e.target.value
                    })}
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année
                  </label>
                  <input
                    type="number"
                    required
                    min={new Date().getFullYear()}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newVignetteForm.year}
                    onChange={(e) => setNewVignetteForm({
                      ...newVignetteForm,
                      year: e.target.value
                    })}
                  />
                </div>

                {/* Reminder Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Before Expiration
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newVignetteForm.reminderDays}
                    onChange={(e) => setNewVignetteForm({
                      ...newVignetteForm,
                      reminderDays: e.target.value
                    })}
                  >
                    <option value="10">10 days before</option>
                    <option value="15">15 days before</option>
                    <option value="30">30 days before</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsNewVignetteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Vignette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isNewVisiteTechniqueModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Visite Technique</h3>
              <button
                onClick={() => setIsNewVisiteTechniqueModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsNewVisiteTechniqueModalOpen(false);
            }} className="p-6">
              <div className="space-y-4">
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Véhicule
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a vehicle</option>
                    <option value="VH001">Toyota Camry (VH001)</option>
                    <option value="VH002">Honda CR-V (VH002)</option>
                    <option value="VH003">Ford F-150 (VH003)</option>
                  </select>
                </div>

                {/* Visit Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Visite
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Expiration
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Control Center */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Centre Visite
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter control center name"
                  />
                </div>

                {/* Result */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Résultat
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select result</option>
                    <option value="passed">Passed</option>
                    <option value="passed_remarks">Passed with remarks</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coût (MAD)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cost"
                  />
                </div>

                {/* Reminder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Before Expiration
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="10">10 days before</option>
                    <option value="15">15 days before</option>
                    <option value="30">30 days before</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsNewVisiteTechniqueModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Visite Technique
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isNewVidangeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Vidange</h3>
              <button
                onClick={() => setIsNewVidangeModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsNewVidangeModalOpen(false);
            }} className="p-6">
              <div className="space-y-4">
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Véhicule
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a vehicle</option>
                    <option value="VH001">Toyota Camry (VH001)</option>
                    <option value="VH002">Honda CR-V (VH002)</option>
                    <option value="VH003">Ford F-150 (VH003)</option>
                  </select>
                </div>

                {/* Service Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Vidange
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Current Mileage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kilométrage Actuel
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current mileage"
                  />
                </div>

                {/* Oil Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type Huile
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select oil type</option>
                    <option value="5w30">5W-30 Synthetic</option>
                    <option value="0w20">0W-20 Synthetic</option>
                    <option value="5w40">5W-40 Synthetic</option>
                    <option value="10w40">10W-40 Synthetic Blend</option>
                  </select>
                </div>

                {/* Filters Changed - Multiple Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filtres Changés
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Filtre à huile</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Filtre à air</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Filtre à carburant</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Filtre d'habitacle</span>
                    </label>
                  </div>
                </div>

                {/* Next Service Mileage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prochain Vidange (km)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter next service mileage"
                  />
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coût (MAD)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cost"
                  />
                </div>

                {/* Description/Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description / Notes
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Add any additional notes or observations..."
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsNewVidangeModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Vidange
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isNewOtherMaintenanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Maintenance</h3>
              <button
                onClick={() => setIsNewOtherMaintenanceModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsNewOtherMaintenanceModalOpen(false);
            }} className="p-6">
              <div className="space-y-4">
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Véhicule
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a vehicle</option>
                    <option value="VH001">Toyota Camry (VH001)</option>
                    <option value="VH002">Honda CR-V (VH002)</option>
                    <option value="VH003">Ford F-150 (VH003)</option>
                  </select>
                </div>

                {/* Maintenance Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de Maintenance
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="pneus">Pneus</option>
                    <option value="freins">Freins</option>
                    <option value="batterie">Batterie</option>
                    <option value="suspension">Suspension</option>
                    <option value="climatisation">Climatisation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mechanic/Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mécanicien/Société
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mechanic or company name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Describe the maintenance performed..."
                  ></textarea>
                </div>

                {/* Parts Changed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pièces Changées
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="List any parts that were replaced..."
                  ></textarea>
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coût (MAD)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cost"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsNewOtherMaintenanceModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Maintenance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 