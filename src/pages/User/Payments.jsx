import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import {
  CreditCard,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';

export default function Payments() {
  const [activeTab, setActiveTab] = useState('history');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Mock data - replace with actual API calls
  const paymentHistory = [
    {
      id: 1,
      date: '2024-03-15',
      amount: 89.00,
      status: 'completed',
      description: 'Tesla Model 3 Rental',
      invoice: '#INV-2024-001'
    },
    {
      id: 2,
      date: '2024-03-01',
      amount: 75.00,
      status: 'completed',
      description: 'BMW 3 Series Rental',
      invoice: '#INV-2024-002'
    },
    {
      id: 3,
      date: '2024-02-15',
      amount: 95.00,
      status: 'failed',
      description: 'Mercedes GLC Rental',
      invoice: '#INV-2024-003'
    }
  ];

  const savedCards = [
    {
      id: 1,
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      last4: '8888',
      brand: 'Mastercard',
      expiryDate: '08/24',
      isDefault: false
    }
  ];

  const handleAddCard = (e) => {
    e.preventDefault();
    // Implement card addition logic
    console.log('Adding new card:', newCard);
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const handleDeleteCard = (cardId) => {
    // Implement card deletion logic
    console.log('Deleting card:', cardId);
  };

  const handleSetDefaultCard = (cardId) => {
    // Implement set default card logic
    console.log('Setting default card:', cardId);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Failed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="mt-2 text-gray-600">Manage your payment methods and view transaction history</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Payment History
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`${
                activeTab === 'methods'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Payment Methods
            </button>
          </nav>
        </div>

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      €{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="inline-flex items-center text-blue-600 hover:text-blue-500">
                        <Download className="w-4 h-4 mr-1" />
                        {payment.invoice}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setShowAddCard(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            {/* Saved Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className="relative bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <CreditCard className="h-8 w-8 text-gray-400" />
                      <p className="mt-4 text-lg font-medium text-gray-900">
                        •••• {card.last4}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Expires {card.expiryDate}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefaultCard(card.id)}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-500"
                    >
                      Set as default
                    </button>
                  )}
                  {card.isDefault && (
                    <span className="mt-4 inline-block px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Add Card Modal */}
            {showAddCard && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Add Payment Method
                  </h3>
                  <form onSubmit={handleAddCard}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={newCard.cardNumber}
                          onChange={(e) =>
                            setNewCard({ ...newCard, cardNumber: e.target.value })
                          }
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Card Holder Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={newCard.cardHolder}
                          onChange={(e) =>
                            setNewCard({ ...newCard, cardHolder: e.target.value })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newCard.expiryDate}
                            onChange={(e) =>
                              setNewCard({ ...newCard, expiryDate: e.target.value })
                            }
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newCard.cvv}
                            onChange={(e) =>
                              setNewCard({ ...newCard, cvv: e.target.value })
                            }
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddCard(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Card
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 