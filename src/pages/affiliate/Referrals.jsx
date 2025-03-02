import React from 'react';
import { Copy, CheckCircle, XCircle, Clock, Users, TrendingUp, UserPlus } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';

const Referrals = () => {
  const referralCode = "REF123456";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    // You could add a toast notification here
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
          <p className="mt-2 text-gray-600">Invite businesses and earn commissions</p>
        </div>

        {/* Referral Code Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <code className="flex-1 px-4 py-3 rounded-lg font-mono text-white/90">
              {referralCode}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <p className="text-2xl font-bold text-green-600 mt-1">18</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <UserPlus className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                <p className="text-2xl font-bold text-yellow-600 mt-1">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Referrals</h2>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { business: 'Premium Auto Rental', date: '2024-03-15', status: 'Approved', commission: '750 MAD' },
                  { business: 'City Cars Service', date: '2024-03-10', status: 'Pending', commission: '500 MAD' },
                  { business: 'Luxury Fleet Co.', date: '2024-03-05', status: 'Rejected', commission: '0 MAD' },
                  { business: 'Express Rentals', date: '2024-03-01', status: 'Approved', commission: '600 MAD' },
                ].map((referral, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{referral.business}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {referral.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {referral.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                        {referral.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {referral.commission}
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

export default Referrals;
