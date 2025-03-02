import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Download, FileSpreadsheet, Check, Eye, Filter, Calendar, Table, ChevronDown } from 'lucide-react';

export const OwnerReports = () => {
  const [reportOptions, setReportOptions] = useState({
    includeCustomerInfo: true,
    includeFinancials: true,
    includeDocuments: true,
    includeTransactions: true,
    includeComments: false
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [dateRange, setDateRange] = useState('last30');

  const reportTypes = [
    {
      id: 'customers',
      name: 'Customer Report',
      description: 'Detailed customer information and status',
      icon: <Table className="h-6 w-6" />,
      options: [
        { id: 'includeCustomerInfo', label: 'Basic Information', default: true },
        { id: 'includeFinancials', label: 'Financial Details', default: true },
        { id: 'includeDocuments', label: 'Documents Status', default: true },
        { id: 'includeTransactions', label: 'Transaction History', default: true },
        { id: 'includeComments', label: 'Comments & Notes', default: false }
      ]
    },
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'Revenue and transaction analysis',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      options: [
        { id: 'includeRevenue', label: 'Revenue Overview', default: true },
        { id: 'includeExpenses', label: 'Expense Breakdown', default: true },
        { id: 'includeProjections', label: 'Future Projections', default: false }
      ]
    }
  ];

  const handlePreviewReport = async (reportType) => {
    try {
      // Simulated API call to get preview data
      const response = await fetch('/api/reports/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reportType,
          options: reportOptions,
          dateRange
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData(data);
        setSelectedReport(reportType);
      }
    } catch (error) {
      console.error('Error previewing report:', error);
    }
  };

  const handleDownloadReport = async (reportType) => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reportType,
          options: reportOptions,
          dateRange
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}-${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            Generate, preview, and download custom reports
          </p>
        </div>

        {/* Date Range Filter */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm text-gray-600 border-none focus:ring-0"
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="year">This year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {report.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {report.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>

                <div className="space-y-3 mb-6">
                  {report.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                          ${reportOptions[option.id]
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300 hover:border-blue-500'
                          }`}
                        onClick={() => setReportOptions(prev => ({
                          ...prev,
                          [option.id]: !prev[option.id]
                        }))}
                      >
                        {reportOptions[option.id] && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePreviewReport(report.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Preview Panel */}
              {selectedReport === report.id && previewData && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Preview
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-auto max-h-96">
                    <pre className="text-xs text-gray-600">
                      {JSON.stringify(previewData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            About Reports
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Preview before downloading</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Customize included information</span>
              </li>
            </ul>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Export in Excel format</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Filter by date range</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerReports; 