import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Users,
  Link as LinkIcon,
  Copy,
  CheckCircle,
  Clock,
  Car,
  Settings as SettingsIcon,
  ChevronRight,
  Wallet
} from 'lucide-react';

export default function affiliateDashboard() {
  const [copied, setCopied] = useState(false);

  // Mock data
  const stats = {
    totalEarnings: "1,250",
    activeReferrals: "8",
    pendingReferrals: "3",
    referralLink: "https://carental.com/ref/AF123",
    referralCode: "AF123"
  };

  const recentReferrals = [
    {
      id: 1,
      name: "John Smith",
      date: "2024-03-20",
      status: "active",
      commission: "150"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      date: "2024-03-19",
      status: "pending",
      commission: "100"
    },
    {
      id: 3,
      name: "Mike Johnson",
      date: "2024-03-18",
      status: "active",
      commission: "150"
    }
  ];

  const quickLinks = [
    {
      title: "Car Referrals",
      description: "Manage your car listings and referrals",
      icon: Car,
      path: "/affiliate/car",
      color: "bg-blue-500"
    },
    {
      title: "Earnings",
      description: "Track your earnings and payouts",
      icon: Wallet,
      path: "/affiliate/earnings",
      color: "bg-green-500"
    },
    {
      title: "Settings",
      description: "Update your account preferences",
      icon: SettingsIcon,
      path: "/affiliate/settings",
      color: "bg-purple-500"
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header with gradient background */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
          <p className="mt-2 text-blue-100">Track your referrals and earnings</p>
          <div className="mt-4 flex gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-400/20 text-sm">
              Affiliate ID: #AF283
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-400/20 text-sm">
              Active Partner
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Car Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeReferrals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingReferrals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${link.color} rounded-xl shadow-lg`}>
                    <link.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{link.title}</h3>
                    <p className="text-sm text-gray-500">{link.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Referral Link Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center">
                <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  readOnly
                  value={stats.referralLink}
                  className="bg-transparent border-none w-full focus:ring-0"
                />
              </div>
              <button
                onClick={() => handleCopy(stats.referralLink)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-3">
                <span className="text-gray-500 mr-2">Referral Code:</span>
                <span className="font-medium">{stats.referralCode}</span>
              </div>
              <button
                onClick={() => handleCopy(stats.referralCode)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Car Referrals */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Car Referrals</h2>
            <Link
              to="/affiliate/car"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {referral.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          referral.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {referral.status === 'active' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${referral.commission}
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