import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import {
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  ChevronDown,
  Printer,
  Check
} from 'lucide-react';

export default function Contracts() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API calls
  const contracts = [
    {
      id: 1,
      contractNumber: 'CNT-2024-001',
      carModel: 'Tesla Model 3',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      status: 'active',
      totalAmount: 445.00,
      documents: [
        { name: 'Rental Agreement', type: 'pdf' },
        { name: 'Insurance Document', type: 'pdf' },
      ]
    },
    {
      id: 2,
      contractNumber: 'CNT-2024-002',
      carModel: 'BMW 3 Series',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      status: 'completed',
      totalAmount: 375.00,
      documents: [
        { name: 'Rental Agreement', type: 'pdf' },
        { name: 'Damage Report', type: 'pdf' },
      ]
    },
    {
      id: 3,
      contractNumber: 'CNT-2024-003',
      carModel: 'Mercedes GLC',
      startDate: '2024-04-01',
      endDate: '2024-04-07',
      status: 'pending',
      totalAmount: 665.00,
      documents: [
        { name: 'Rental Agreement', type: 'pdf' },
      ]
    }
  ];

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.carModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || contract.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Active
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
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

  const handleDownload = (contractId, documentName) => {
    // Implement document download logic
    console.log('Downloading document:', documentName, 'for contract:', contractId);
  };

  const handleViewDetails = (contractId) => {
    // Implement view contract details logic
    console.log('Viewing contract details:', contractId);
  };

  const handlePreview = (contractId) => {
    // Implement preview logic
    console.log('Previewing contract:', contractId);
  };

  const handleAccept = (contractId) => {
    // Implement accept logic
    console.log('Accepting contract:', contractId);
  };

  const handlePrint = (contractId) => {
    // Implement print logic
    console.log('Printing contract:', contractId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Rental Contracts</h1>
          <p className="mt-2 text-gray-600">View and manage your rental contracts</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Contracts
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'active'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'pending'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'completed'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contract.contractNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contract.carModel}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(contract.startDate).toLocaleDateString()} - 
                        {new Date(contract.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(contract.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      €{contract.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block text-left">
                        <div className="group">
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Documents
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </button>
                          <div className="hidden group-hover:block absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                              {contract.documents.map((doc, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleDownload(contract.id, doc.name)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  {doc.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePreview(contract.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </button>
                        {contract.status === 'pending' && (
                          <button
                            onClick={() => handleAccept(contract.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Accept
                          </button>
                        )}
                        <button
                          onClick={() => handlePrint(contract.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No contracts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No contracts match your current filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 