import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { EditableCard } from '../../components/EditableCard';
import { Pencil, Trash2, Plus, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const mockInvoices = [
          {
            id: 'INV-2024-001',
            businessName: 'Auto Rental Pro',
            amount: '€1,499.99',
            status: 'paid',
            created_at: '2024-03-01',
            dueDate: '2024-03-15',
            paidDate: '2024-03-10',
            details: {
              'Invoice Number': 'INV-2024-001',
              'Payment Method': 'Credit Card',
              'Transaction ID': 'TXN-123456',
              'Billing Contact': 'John Doe',
              'Email': 'john@autorentalpro.com',
              'VAT Number': 'VAT123456789'
            },
            items: [
              { description: 'Premium Subscription - March 2024', amount: '€499.99' },
              { description: 'Additional User Licenses (2)', amount: '€1,000.00' }
            ]
          },
          {
            id: 'INV-2024-002',
            businessName: 'City Cars',
            amount: '€299.99',
            status: 'unpaid',
            created_at: '2024-03-05',
            dueDate: '2024-03-20',
            details: {
              'Invoice Number': 'INV-2024-002',
              'Payment Method': 'Bank Transfer',
              'Billing Contact': 'Jane Smith',
              'Email': 'jane@citycars.com',
              'VAT Number': 'VAT987654321'
            },
            items: [
              { description: 'Standard Subscription - March 2024', amount: '€299.99' }
            ]
          }
        ];
        setInvoices(mockInvoices);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
        toast.error('Failed to load invoices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleEdit = (invoice) => {
    setEditingId(invoice.id);
  };

  const handleSave = async (invoiceId, updatedData) => {
    try {
      // TODO: Implement API call
      console.log('Saving invoice:', invoiceId, updatedData);
      setEditingId(null);
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error('Failed to save changes');
    }
  };

  const handleDownload = (invoice) => {
    // TODO: Implement download functionality
    toast.success('Downloading invoice...');
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
            <h1 className="text-xl font-semibold text-gray-900">Invoices</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and track all business invoices.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create invoice
            </button>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          {invoices.map((invoice) => (
            <EditableCard
              key={invoice.id}
              title={`${invoice.businessName} - ${invoice.amount}`}
              subtitle={`Due Date: ${invoice.dueDate}`}
              reference={invoice.id}
              status={invoice.status}
              date={invoice.created_at}
              details={invoice.details}
              tags={[invoice.status === 'paid' ? `Paid on ${invoice.paidDate}` : `Due on ${invoice.dueDate}`]}
              isEditing={editingId === invoice.id}
              onSave={(updatedData) => handleSave(invoice.id, updatedData)}
              onCancelEdit={() => setEditingId(null)}
              actions={
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(invoice);
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(invoice);
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-indigo-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/invoices/${invoice.id}`, '_blank');
                    }}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Invoice Items</h4>
                  <div className="bg-gray-50 rounded-lg border border-gray-200">
                    <div className="divide-y divide-gray-200">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="p-3 flex justify-between items-center">
                          <span className="text-sm text-gray-600">{item.description}</span>
                          <span className="text-sm font-medium text-gray-900">{item.amount}</span>
                        </div>
                      ))}
                      <div className="p-3 flex justify-between items-center bg-gray-100">
                        <span className="text-sm font-medium text-gray-900">Total</span>
                        <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
                      </div>
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