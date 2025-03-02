import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Share2, 
  Copy, 
  Gift, 
  CheckCircle,
  Percent,
  CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReferFriend() {
  const [referralLink] = useState('https://rentalsaas.com/refer?code=USER123');
  const [referrals] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      status: "registered",
      date: "2024-03-15",
      planValue: "$500",
      earnedDiscount: "$50"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      status: "pending",
      date: "2024-03-14"
    }
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => toast.success('Referral link copied!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">10% Double Rewards Program</h1>
          <p className="mt-2 text-gray-600">Share RentalSaas and you both get 10% off!</p>
        </div>

        {/* Rewards Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Friend's Reward</h3>
                <p className="text-gray-600">Your friend gets <span className="font-semibold text-blue-600">10% off</span> their subscription plan</p>
                <p className="text-sm text-gray-500 mt-2">Instant discount on their first purchase</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Your Reward</h3>
                <p className="text-gray-600">You get <span className="font-semibold text-green-600">10% off</span> your next plan renewal</p>
                <p className="text-sm text-gray-500 mt-2">Discount applied automatically on renewal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-gray-700">Your Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-gray-600"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Referrals</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Discount</p>
                <p className="text-2xl font-semibold">10%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Friends Saved</p>
                <p className="text-2xl font-semibold">$300</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">Recent Referrals</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{referral.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{referral.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{referral.date}</td>
                    <td className="px-6 py-4">
                      {referral.status === 'registered' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          Registered
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-yellow-50 text-yellow-700">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {referral.earnedDiscount || '-'}
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