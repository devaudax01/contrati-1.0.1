import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  DollarSign, 
  Calendar,
  CreditCard,
  Search,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Eye,
  Download,
  RefreshCcw,
  Ban,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function Payments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [payments, setPayments] = useState([
    {
      id: 1,
      customerName: "John Smith",
      amount: 1200.00,
      date: "2024-03-15",
      status: "completed",
      paymentMethod: "Credit Card",
      description: "Vehicle Rental - SUV",
      invoiceNumber: "INV-2024-001",
      planDetails: {
        name: "Premium Plan",
        duration: "1 Year",
        features: ["Unlimited Rentals", "24/7 Support", "Free Maintenance"]
      }
    },
    {
      id: 2,
      customerName: "Sarah Johnson",
      amount: 850.50,
      date: "2024-03-14",
      status: "pending",
      paymentMethod: "Bank Transfer",
      description: "Vehicle Rental - Sedan",
      invoiceNumber: "INV-2024-002",
      planDetails: {
        name: "Standard Plan",
        duration: "6 Months",
        features: ["Limited Rentals", "Support during business hours", "Basic Maintenance"]
      }
    },
    {
      id: 3,
      customerName: "Mike Brown",
      amount: 1500.00,
      date: "2024-03-13",
      status: "failed",
      paymentMethod: "Credit Card",
      description: "Vehicle Rental - Luxury",
      invoiceNumber: "INV-2024-003",
      planDetails: {
        name: "Deluxe Plan",
        duration: "12 Months",
        features: ["Unlimited Rentals", "24/7 Support", "Premium Maintenance"]
      }
    }
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-700">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-yellow-50 text-yellow-700">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-red-50 text-red-700">
            <XCircle className="w-4 h-4" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total Revenue",
      value: "$3,550.50",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Pending Payments",
      value: "2",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "This Month",
      value: "$2,450.00",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const ActionMenu = ({ payment, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = (action) => {
      setIsOpen(false);
      onAction(action, payment);
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-1">
                <button
                  onClick={() => handleAction('viewPlan')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Eye className="h-4 w-4 mr-3 text-gray-500" />
                  View Plan Details
                </button>
                <button
                  onClick={() => handleAction('download')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Download className="h-4 w-4 mr-3 text-gray-500" />
                  Download Invoice
                </button>
                {payment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleAction('approvePlan')}
                      className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
                    >
                      <CheckCircle className="h-4 w-4 mr-3 text-green-500" />
                      Approve Plan
                    </button>
                    <button
                      onClick={() => handleAction('rejectPlan')}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    >
                      <Ban className="h-4 w-4 mr-3 text-red-500" />
                      Reject Plan
                    </button>
                  </>
                )}
                {payment.status === 'failed' && (
                  <button
                    onClick={() => handleAction('retryPlan')}
                    className="flex items-center w-full px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                  >
                    <RefreshCcw className="h-4 w-4 mr-3 text-blue-500" />
                    Retry Plan
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const generateInvoicePDF = (payment) => {
    try {
      const doc = new jsPDF();
      
      // Add company logo or header
      doc.setFontSize(24);
      doc.setTextColor(63, 81, 181); // Set a professional blue color
      doc.text('RENTAL SAAS', 105, 20, { align: 'center' });
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Add invoice info with better formatting
      doc.setFontSize(14);
      doc.text('INVOICE', 20, 40);
      doc.setFontSize(12);
      doc.text(`Number: ${payment.invoiceNumber}`, 20, 50);
      doc.text(`Date: ${payment.date}`, 20, 60);
      
      // Add customer info in a box
      doc.setDrawColor(63, 81, 181);
      doc.setFillColor(240, 242, 255);
      doc.rect(20, 70, 80, 25, 'F');
      doc.text('Bill To:', 25, 80);
      doc.text(payment.customerName, 25, 90);
      
      // Add plan info
      doc.setFontSize(14);
      doc.text('Plan Information', 20, 110);
      doc.setFontSize(12);
      doc.text(`${payment.planDetails.name} - ${payment.planDetails.duration}`, 20, 120);
      
      // Add features table with better styling
      const features = payment.planDetails.features.map(feature => [feature]);
      doc.autoTable({
        startY: 130,
        head: [['Included Features']],
        body: features,
        theme: 'grid',
        headStyles: { 
          fillColor: [63, 81, 181],
          fontSize: 12,
          halign: 'center'
        },
        styles: {
          fontSize: 11,
          cellPadding: 5
        }
      });
      
      // Add payment details with better styling
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Description', 'Amount']],
        body: [
          ['Subscription Fee', `$${payment.amount.toFixed(2)}`],
          ['Total', `$${payment.amount.toFixed(2)}`]
        ],
        theme: 'grid',
        headStyles: { 
          fillColor: [63, 81, 181],
          fontSize: 12,
          halign: 'center'
        },
        styles: {
          fontSize: 11,
          cellPadding: 5
        },
        columnStyles: {
          1: { halign: 'right' }
        }
      });
      
      // Add payment info with status color
      const paymentY = doc.lastAutoTable.finalY + 20;
      doc.text(`Payment Method: ${payment.paymentMethod}`, 20, paymentY);
      
      // Set status color based on payment status
      const statusColors = {
        completed: [39, 174, 96],
        pending: [241, 196, 15],
        failed: [231, 76, 60]
      };
      doc.setTextColor(...(statusColors[payment.status] || [0, 0, 0]));
      doc.text(`Status: ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}`, 20, paymentY + 10);
      
      // Reset text color for footer
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('Thank you for your business!', 105, 280, { align: 'center' });

      // Save the PDF
      doc.save(`invoice-${payment.invoiceNumber}.pdf`);
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false;
    }
  };

  const handlePaymentAction = (action, payment) => {
    switch (action) {
      case 'viewPlan':
        setSelectedPlan(payment);
        setShowPlanModal(true);
        break;
      case 'download':
        const success = generateInvoicePDF(payment);
        if (success) {
          toast.success(`Invoice ${payment.invoiceNumber} downloaded successfully`);
        } else {
          toast.error('Failed to generate invoice. Please try again.');
        }
        break;
      case 'approvePlan':
        setPayments(prev => 
          prev.map(p => 
            p.id === payment.id 
              ? { ...p, status: 'completed' }
              : p
          )
        );
        toast.success(`Plan subscription approved for ${payment.customerName}`);
        break;
      case 'rejectPlan':
        setPayments(prev => 
          prev.map(p => 
            p.id === payment.id 
              ? { ...p, status: 'failed' }
              : p
          )
        );
        toast.error(`Plan subscription rejected for ${payment.customerName}`);
        break;
      case 'retryPlan':
        toast.loading(`Retrying plan payment for ${payment.customerName}`);
        setTimeout(() => {
          setPayments(prev => 
            prev.map(p => 
              p.id === payment.id 
                ? { ...p, status: 'completed' }
                : p
            )
          );
          toast.success(`Plan payment processed successfully`);
        }, 2000);
        break;
      default:
        break;
    }
  };

  const PlanDetailsModal = ({ plan, onClose }) => {
    if (!plan) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Plan Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{plan.planDetails.name}</h4>
              <p className="text-sm text-gray-500">{plan.planDetails.duration}</p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Features:</h5>
              <ul className="space-y-2">
                {plan.planDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Amount:</span>
                <span className="text-lg font-medium text-gray-900">
                  ${plan.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">Status:</span>
                {getStatusBadge(plan.status)}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">Payment Method:</span>
                <span className="text-sm text-gray-900">{plan.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">Invoice Number:</span>
                <span className="text-sm text-gray-900">{plan.invoiceNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
              <p className="text-gray-500 mt-1">Manage and track all payments</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by customer or invoice number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{payment.invoiceNumber}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">${payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionMenu 
                        payment={payment} 
                        onAction={handlePaymentAction}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPlanModal && (
        <PlanDetailsModal
          plan={selectedPlan}
          onClose={() => {
            setShowPlanModal(false);
            setSelectedPlan(null);
          }}
        />
      )}
    </DashboardLayout>
  );
} 