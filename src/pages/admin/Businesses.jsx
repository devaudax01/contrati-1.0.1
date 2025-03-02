import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Pencil, Trash2, Plus, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCustomers } from '../../mockApi/admin';
import { EditableCard } from '../../components/EditableCard';

export const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        const response = await getCustomers();
        if (response.success) {
          setBusinesses(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch businesses:', err);
        toast.error('Failed to load businesses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleEdit = (business) => {
    setEditingId(business.id);
  };

  const handleDelete = (business) => {
    // TODO: Implement delete functionality
    console.log('Delete business:', business);
  };

  const handleSaveChanges = async (businessId, updatedData) => {
    try {
      // TODO: Implement API call to save changes
      console.log('Saving changes for business:', businessId, updatedData);
      setEditingId(null); // Reset editing state after save
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error('Failed to save changes');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Businesses</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all businesses using the platform
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add business
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {businesses.map((business) => (
            <EditableCard
              key={business.id}
              title={business.businessName}
              subtitle={business.description || 'No description provided'}
              status={business.status}
              date={business.createdAt}
              reference={`#${business.id}`}
              assignee={business.ownerName}
              tags={[business.subscription, business.type]}
              details={{
                'Email': business.email,
                'Phone': business.phone,
                'Address': business.address,
                'Subscription Plan': business.subscription,
                'VAT Number': business.vatNumber || 'Not provided',
                'Business Type': business.type || 'Not specified'
              }}
              isEditing={editingId === business.id}
              onSave={(updatedData) => handleSaveChanges(business.id, updatedData)}
              onCancelEdit={() => setEditingId(null)}
              actions={
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(business);
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-indigo-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(business);
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Last login: {new Date().toLocaleDateString()}</p>
                    <p>• Updated subscription plan: {new Date().toLocaleDateString()}</p>
                    <p>• Added new vehicle: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-500">Total Vehicles</p>
                      <p className="text-lg font-semibold">24</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-500">Active Rentals</p>
                      <p className="text-lg font-semibold">12</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-500">Revenue</p>
                      <p className="text-lg font-semibold">€2,450</p>
                    </div>
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