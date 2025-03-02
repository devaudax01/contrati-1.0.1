import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  FileTextIcon, 
  UploadCloudIcon, 
  FolderIcon, 
  SearchIcon,
  DownloadIcon,
  TrashIcon,
  FileIcon
} from 'lucide-react';

export default function Documents() {
  const [documents] = useState([
    {
      id: 1,
      name: "Vehicle Insurance Policy.pdf",
      type: "PDF",
      size: "2.4 MB",
      category: "Insurance",
      uploadedAt: "2024-03-15",
      status: "active"
    },
    {
      id: 2,
      name: "Maintenance Records 2024.xlsx",
      type: "Excel",
      size: "1.8 MB",
      category: "Maintenance",
      uploadedAt: "2024-03-10",
      status: "active"
    },
    {
      id: 3,
      name: "Employee Contracts.pdf",
      type: "PDF",
      size: "3.2 MB",
      category: "HR",
      uploadedAt: "2024-03-05",
      status: "archived"
    }
  ]);

  const categories = [
    { name: 'All Documents', count: 12, icon: FileTextIcon },
    { name: 'Insurance', count: 4, icon: FileIcon },
    { name: 'Maintenance', count: 3, icon: FileIcon },
    { name: 'HR', count: 5, icon: FileIcon },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
              <p className="text-gray-500 mt-1">Manage your business documents</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <UploadCloudIcon className="h-4 w-4" />
              Upload Document
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4 text-gray-400" />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-gray-400">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="relative">
                <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FileTextIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{doc.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadedAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <DownloadIcon className="h-4 w-4 text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 