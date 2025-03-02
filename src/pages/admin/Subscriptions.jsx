import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { EditableCard } from '../../components/EditableCard';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const mockSubscriptions = [
          {
            id: 1,
            businessName: 'Auto Rental Pro',
            plan: 'Premium',
            status: 'active',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            created_at: '2024-01-01',
            amount: '€499.99',
            billingCycle: 'Monthly',
            details: {
              'Billing Contact': 'John Doe',
              'Email': 'john@autorentalpro.com',
              'Payment Method': 'Credit Card',
              'Last Payment': '2024-03-01',
              'Next Payment': '2024-04-01',
              'Auto Renewal': 'Yes'
            }
          },
          {
            id: 2,
            businessName: 'City Cars',
            plan: 'Standard',
            status: 'pending',
            startDate: '2024-03-15',
            endDate: '2025-03-14',
            created_at: '2024-03-15',
            amount: '€299.99',
            billingCycle: 'Annual',
            details: {
              'Billing Contact': 'Jane Smith',
              'Email': 'jane@citycars.com',
              'Payment Method': 'Bank Transfer',
              'Last Payment': 'Pending',
              'Next Payment': '2024-03-15',
              'Auto Renewal': 'No'
            }
          }
        ];
        setSubscriptions(mockSubscriptions);
      } catch (err) {
        console.error('Failed to fetch subscriptions:', err);
        toast.error('Failed to load subscriptions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleEdit = (subscription) => {
    setEditingId(subscription.id);
  };

  const handleSave = async (subscriptionId, updatedData) => {
    try {
      // TODO: Implement API call
      console.log('Saving subscription:', subscriptionId, updatedData);
      setEditingId(null);
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error('Failed to save changes');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Subscriptions</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage all business subscriptions and their billing details.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add subscription
            </button>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          {subscriptions.map((subscription) => (
            <EditableCard
              key={subscription.id}
              title={subscription.businessName}
              subtitle={`${subscription.plan} Plan - ${subscription.amount}/${subscription.billingCycle}`}
              reference={`#${subscription.id}`}
              status={subscription.status}
              date={subscription.created_at}
              details={subscription.details}
              tags={[subscription.plan, subscription.billingCycle]}
              isEditing={editingId === subscription.id}
              onSave={(updatedData) => handleSave(subscription.id, updatedData)}
              onCancelEdit={() => setEditingId(null)}
              actions={
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(subscription);
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-indigo-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement delete
                      toast.error('Delete not implemented');
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Subscription Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="col-span-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Next Payment Due</p>
                        <p className="text-yellow-700">{subscription.details['Next Payment']}</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-500">Start Date</p>
                      <p className="font-medium text-gray-900">{subscription.startDate}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-500">End Date</p>
                      <p className="font-medium text-gray-900">{subscription.endDate}</p>
                    </div>
                    {Object.entries(subscription.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </EditableCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}; 