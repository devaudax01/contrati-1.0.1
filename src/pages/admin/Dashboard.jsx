import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { InstanceCard } from '../../components/dashboard/InstanceCard';
import { RecommendationCard } from '../../components/dashboard/RecommendationCard';
import { ServiceBox } from '../../components/dashboard/ServiceBox';
import toast from 'react-hot-toast';
import { getAdminStats } from '../../mockApi/admin';
import {
  Car,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart,
  Building2,
  Share2,
  ArrowRight,
  Shield,
  FileCheck,
  UserCheck,
  Star,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAdminStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !stats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  const recentBusinesses = [
    {
      id: 1,
      businessName: "AutoElite Luxury Rentals",
      owner: "Robert Chen",
      location: "San Francisco, CA",
      status: "active",
      carsListed: 85,
      monthlyRevenue: "158,450",
      rating: 4.8,
      joinDate: "Jan 2024",
      fleetTypes: ["Luxury", "Executive"],
      popularModels: ["Tesla Model S", "BMW 7 Series", "Mercedes S-Class"],
      businessType: "Premium Fleet"
    },
    {
      id: 2,
      businessName: "EcoRide Solutions",
      owner: "Emma Thompson",
      location: "Portland, OR",
      status: "active",
      carsListed: 42,
      monthlyRevenue: "89,380",
      rating: 4.7,
      joinDate: "Feb 2024",
      fleetTypes: ["Electric", "Hybrid"],
      popularModels: ["Tesla Model 3", "Toyota Prius", "Chevrolet Bolt"],
      businessType: "Eco-Friendly Fleet"
    },
    {
      id: 3,
      businessName: "Urban Mobility Corp",
      owner: "David Park",
      location: "Chicago, IL",
      status: "pending",
      carsListed: 120,
      monthlyRevenue: "245,720",
      rating: 4.9,
      joinDate: "Mar 2024",
      fleetTypes: ["Economy", "Compact", "SUV"],
      popularModels: ["Toyota Corolla", "Honda CR-V", "Ford Escape"],
      businessType: "Full-Service Fleet"
    },
    {
      id: 4,
      businessName: "Executive Fleet Services",
      owner: "Sarah Martinez",
      location: "New York, NY",
      status: "active",
      carsListed: 156,
      monthlyRevenue: "392,890",
      rating: 4.8,
      joinDate: "Nov 2023",
      fleetTypes: ["Executive", "Luxury", "Sports"],
      popularModels: ["Porsche Cayenne", "Range Rover", "Audi A8"],
      businessType: "Corporate Fleet"
    },
    {
      id: 5,
      businessName: "Budget Wheels",
      owner: "Michael Chang",
      location: "Houston, TX",
      status: "active",
      carsListed: 95,
      monthlyRevenue: "135,670",
      rating: 4.5,
      joinDate: "Dec 2023",
      fleetTypes: ["Economy", "Compact"],
      popularModels: ["Hyundai Elantra", "Nissan Sentra", "Kia Forte"],
      businessType: "Economy Fleet"
    },
    {
      id: 6,
      businessName: "Adventure Rentals Co",
      owner: "Lisa Wilson",
      location: "Denver, CO",
      status: "pending",
      carsListed: 68,
      monthlyRevenue: "178,450",
      rating: 4.6,
      joinDate: "Mar 2024",
      fleetTypes: ["SUV", "Off-road", "4x4"],
      popularModels: ["Jeep Wrangler", "Toyota 4Runner", "Ford Bronco"],
      businessType: "Adventure Fleet"
    },
    {
      id: 7,
      businessName: "Family Auto Rentals",
      owner: "James Rodriguez",
      location: "Miami, FL",
      status: "active",
      carsListed: 73,
      monthlyRevenue: "167,890",
      rating: 4.7,
      joinDate: "Jan 2024",
      fleetTypes: ["Minivan", "SUV", "Economy"],
      popularModels: ["Honda Odyssey", "Toyota Sienna", "Chrysler Pacifica"],
      businessType: "Family Fleet"
    },
    {
      id: 8,
      businessName: "Corporate Motors LLC",
      owner: "Alexandra Kim",
      location: "Seattle, WA",
      status: "under_review",
      carsListed: 145,
      monthlyRevenue: "289,670",
      rating: 4.8,
      joinDate: "Feb 2024",
      fleetTypes: ["Executive", "Economy", "SUV"],
      popularModels: ["BMW 5 Series", "Toyota Camry", "Lexus RX"],
      businessType: "Mixed Fleet"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "info",
      message: "32 new business registrations pending verification",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "success",
      message: "Monthly revenue milestone: $845,670 achieved",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      type: "warning",
      message: "45 affiliate applications need review",
      timestamp: "1 hour ago"
    },
    {
      id: 4,
      type: "info",
      message: "15 businesses completed verification process",
      timestamp: "30 minutes ago"
    },
    {
      id: 5,
      type: "success",
      message: "Platform expansion: 3 new cities added",
      timestamp: "5 hours ago"
    }
  ];

  const mockStats = {
    totalBookings: "1,456",
    activeBusinesses: "248",
    pendingApprovals: "32",
    totalRevenue: "845,670",
    activeReferrals: "156",
    pendingReferrals: "45",
    totalAffiliates: "89",
    availableCars: "3,567",
    totalCustomers: "12,845",
    pendingRequests: "78",
    averageRating: "4.8",
    activeLocations: "45",
    monthlyGrowth: "15.2%",
    complianceRate: "98.5%",
    averageApprovalTime: "2.5 days",
    totalFleetSize: "3,567"
  };

  const pendingApprovals = [
    {
      id: 1,
      type: 'business',
      name: "Premium Auto Solutions",
      stage: "document_verification",
      submittedAt: "2024-03-15T09:30:00",
      documents: ["Business License", "Insurance", "Fleet Documentation"],
      status: "in_review",
      priority: "high",
      location: "Los Angeles, CA"
    },
    {
      id: 2,
      type: 'referral',
      name: "John Anderson",
      stage: "background_check",
      submittedAt: "2024-03-14T14:20:00",
      documents: ["ID Verification", "Referral History"],
      status: "pending",
      priority: "medium",
      referralCode: "REF789"
    },
    {
      id: 3,
      type: 'business',
      name: "City Rides Inc",
      stage: "final_review",
      submittedAt: "2024-03-15T11:45:00",
      documents: ["All Documents Verified"],
      status: "final_stage",
      priority: "high",
      location: "Miami, FL"
    },
    {
      id: 4,
      type: 'referral',
      name: "Sarah Martinez",
      stage: "initial_review",
      submittedAt: "2024-03-15T08:15:00",
      documents: ["Application Form"],
      status: "new",
      priority: "low",
      referralCode: "REF790"
    },
    {
      id: 5,
      type: 'business',
      name: "Express Fleet Services",
      stage: "compliance_check",
      submittedAt: "2024-03-14T16:50:00",
      documents: ["Business License", "Insurance"],
      status: "in_review",
      priority: "medium",
      location: "Chicago, IL"
    }
  ];

  const handleViewAllBusinesses = () => {
    navigate('/admin/businesses');
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your car rental business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Active Businesses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Businesses</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.activeBusinesses}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15.2% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Platform Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${stats.totalRevenue}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.pendingApprovals} pending approvals
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Active Referrals */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Referrals</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.activeReferrals}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.pendingReferrals} pending requests
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Share2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Total Fleet Size */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Total Fleet</span>
                  <Car className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.totalFleetSize}</p>
                <p className="text-xs text-gray-500 mt-1">Vehicles across platform</p>
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Avg Rating</span>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.averageRating}</p>
                <p className="text-xs text-gray-500 mt-1">Business satisfaction</p>
              </div>
            </div>

            {/* Active Locations */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Locations</span>
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.activeLocations}</p>
                <p className="text-xs text-gray-500 mt-1">Active cities</p>
              </div>
            </div>

            {/* Monthly Growth */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Growth</span>
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.monthlyGrowth}</p>
                <p className="text-xs text-gray-500 mt-1">Month over month</p>
              </div>
            </div>

            {/* Average Approval Time */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Approval Time</span>
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.averageApprovalTime}</p>
                <p className="text-xs text-gray-500 mt-1">Average processing</p>
              </div>
            </div>

            {/* Compliance Rate */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Compliance</span>
                  <Shield className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.complianceRate}</p>
                <p className="text-xs text-gray-500 mt-1">Platform standard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Businesses Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Businesses</h2>
                <button
                  onClick={handleViewAllBusinesses}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBusinesses.slice(0, 5).map((business) => (
                      <tr key={business.id} className="hover:bg-gray-50 cursor-pointer" 
                          onClick={() => navigate(`/admin/businesses/${business.id}`)}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{business.businessName}</div>
                              <div className="text-sm text-gray-500">{business.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {business.businessType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${business.status === 'active' ? 'bg-green-100 text-green-800' : 
                              business.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Referral Pending Approvals</h2>
                <button
                  onClick={() => navigate('/admin/referrals')}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View All Referrals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pendingApprovals
                    .filter(approval => approval.type === 'referral')
                    .map((approval) => (
                      <div
                        key={approval.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/admin/referrals/${approval.id}`)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-100">
                              <UserCheck className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">{approval.name}</h3>
                              <p className="text-xs text-gray-500">
                                Referral Code: {approval.referralCode}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            approval.priority === 'high' 
                              ? 'bg-red-100 text-red-800'
                              : approval.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {approval.priority.charAt(0).toUpperCase() + approval.priority.slice(1)} Priority
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(approval.submittedAt).toLocaleString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Shield className="h-4 w-4 mr-1" />
                              {approval.stage.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              approval.status === 'in_review'
                                ? 'bg-blue-100 text-blue-800'
                                : approval.status === 'final_stage'
                                ? 'bg-purple-100 text-purple-800'
                                : approval.status === 'new'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {approval.status.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {approval.documents.map((doc, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                                <FileCheck className="h-3 w-3 mr-1" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}; 