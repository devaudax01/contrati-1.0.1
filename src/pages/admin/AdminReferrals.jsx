import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Users,
  Gift,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Percent
} from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminReferrals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [referrals] = useState([
    {
      id: 1,
      referrer: {
        name: "John Smith",
        email: "john@example.com",
        plan: "Premium Plan",
        planPrice: "$99/month"
      },
      referred: {
        name: "Mike Wilson",
        email: "mike@example.com",
        plan: "Standard Plan",
        planPrice: "$49/month"
      },
      date: "2024-03-15",
      status: "completed",
      discountApplied: true,
      referrerDiscount: "$4.90",
      referredDiscount: "$4.90"
    },
    {
      id: 2,
      referrer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        plan: "Premium Plan",
        planPrice: "$99/month"
      },
      referred: {
        name: "Emma Davis",
        email: "emma@example.com",
        plan: "Basic Plan",
        planPrice: "$29/month"
      },
      date: "2024-03-14",
      status: "pending",
      discountApplied: false
    },
    {
      id: 3,
      referrer: {
        name: "David Brown",
        email: "david@example.com",
        plan: "Standard Plan",
        planPrice: "$49/month"
      },
      referred: {
        name: "Alex Thompson",
        email: "alex@example.com",
        plan: "Premium Plan",
        planPrice: "$99/month"
      },
      date: "2024-03-13",
      status: "rejected",
      discountApplied: false
    },
    {
      id: 4,
      referrer: {
        name: "Lisa Anderson",
        email: "lisa@example.com",
        plan: "Premium Plan",
        planPrice: "$99/month"
      },
      referred: {
        name: "Tom Harris",
        email: "tom@example.com",
        plan: "Premium Plan",
        planPrice: "$99/month"
      },
      date: "2024-03-12",
      status: "completed",
      discountApplied: true,
      referrerDiscount: "$9.90",
      referredDiscount: "$9.90"
    },
    {
      id: 5,
      referrer: {
        name: "Michael Chen",
        email: "michael@example.com",
        plan: "Standard Plan"
      },
      referred: {
        name: "Jessica Wong",
        email: "jessica@example.com",
        plan: "Basic Plan"
      },
      date: "2024-03-11",
      status: "pending",
      discountApplied: false
    },
    {
      id: 6,
      referrer: {
        name: "Emily White",
        email: "emily@example.com",
        plan: "Basic Plan"
      },
      referred: {
        name: "Chris Martin",
        email: "chris@example.com",
        plan: "Standard Plan"
      },
      date: "2024-03-10",
      status: "completed",
      discountApplied: true,
      referrerDiscount: "$30",
      referredDiscount: "$30"
    },
    {
      id: 7,
      referrer: {
        name: "Robert Taylor",
        email: "robert@example.com",
        plan: "Premium Plan"
      },
      referred: {
        name: "Sophie Clark",
        email: "sophie@example.com",
        plan: "Premium Plan"
      },
      date: "2024-03-09",
      status: "rejected",
      discountApplied: false
    },
    {
      id: 8,
      referrer: {
        name: "Amanda Lee",
        email: "amanda@example.com",
        plan: "Standard Plan"
      },
      referred: {
        name: "Daniel Kim",
        email: "daniel@example.com",
        plan: "Premium Plan"
      },
      date: "2024-03-08",
      status: "pending",
      discountApplied: false
    },
    {
      id: 9,
      referrer: {
        name: "James Wilson",
        email: "james@example.com",
        plan: "Premium Plan"
      },
      referred: {
        name: "Rachel Green",
        email: "rachel@example.com",
        plan: "Standard Plan"
      },
      date: "2024-03-07",
      status: "completed",
      discountApplied: true,
      referrerDiscount: "$50",
      referredDiscount: "$50"
    },
    {
      id: 10,
      referrer: {
        name: "Maria Garcia",
        email: "maria@example.com",
        plan: "Basic Plan"
      },
      referred: {
        name: "Kevin Martinez",
        email: "kevin@example.com",
        plan: "Basic Plan"
      },
      date: "2024-03-06",
      status: "pending",
      discountApplied: false
    },
    {
      id: 11,
      referrer: {
        name: "William Brown",
        email: "william@example.com",
        plan: "Premium Plan"
      },
      referred: {
        name: "Oliver Smith",
        email: "oliver@example.com",
        plan: "Premium Plan"
      },
      date: "2024-03-05",
      status: "completed",
      discountApplied: true,
      referrerDiscount: "$75",
      referredDiscount: "$75"
    },
    {
      id: 12,
      referrer: {
        name: "Isabella Rodriguez",
        email: "isabella@example.com",
        plan: "Standard Plan"
      },
      referred: {
        name: "Lucas Thompson",
        email: "lucas@example.com",
        plan: "Standard Plan"
      },
      date: "2024-03-04",
      status: "rejected",
      discountApplied: false
    }
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-700">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-yellow-50 text-yellow-700">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-red-50 text-red-700">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const calculateDiscount = (planPrice) => {
    const price = parseFloat(planPrice.replace('$', ''));
    return (price * 0.1).toFixed(2);
  };

  const handleApproveReferral = (id) => {
    const updatedReferrals = referrals.map(referral => {
      if (referral.id === id) {
        const discountAmount = calculateDiscount(referral.referred.planPrice);
        return {
          ...referral,
          status: 'completed',
          discountApplied: true,
          referrerDiscount: `$${discountAmount}`,
          referredDiscount: `$${discountAmount}`
        };
      }
      return referral;
    });
    
    setReferrals(updatedReferrals);
    toast.success('Referral approved successfully - 10% discount applied to both parties');
  };

  const handleRejectReferral = (id) => {
    // Logic to reject referral
    toast.error('Referral rejected');
  };

  const handleExportData = () => {
    // Logic to export referral data
    toast.success('Exporting referral data...');
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = 
      referral.referrer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.referred.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.referrer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.referred.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || referral.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage referrals - Both parties receive 10% off the referred person's plan
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Referrals</p>
                <p className="text-2xl font-semibold">150</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-semibold">89</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Rewards</p>
                <p className="text-2xl font-semibold">$4,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referred</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referred Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rewards (10% off)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{referral.referrer.name}</div>
                        <div className="text-sm text-gray-500">{referral.referrer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{referral.referred.name}</div>
                        <div className="text-sm text-gray-500">{referral.referred.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{referral.date}</td>
                    <td className="px-6 py-4">{getStatusBadge(referral.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">{referral.referred.plan}</div>
                        <div className="text-gray-500">{referral.referred.planPrice}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {referral.status === 'completed' ? (
                        <div className="text-sm">
                          <div className="text-green-600">
                            Referrer: {referral.referrerDiscount}
                          </div>
                          <div className="text-blue-600">
                            Referred: {referral.referredDiscount}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Pending 10% discount
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {referral.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveReferral(referral.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectReferral(referral.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
} 