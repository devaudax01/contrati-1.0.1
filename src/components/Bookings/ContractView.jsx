import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { File, Download, Clock, Car, User, X, Calendar, Phone, Mail, MapPin, Plus, ChevronDown, Building, UserCircle, ArrowRight, ArrowLeft, RefreshCw, Eye, Share2, Printer } from 'lucide-react';
import CustomerFormModal from '../../components/CustomerModal';
import { useNavigate } from 'react-router-dom';
import { previewPDF, downloadPDF } from './ContractPDF';

// Add these mock data arrays at the top of your component
const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+212 666-123456',
    address: '123 Main St, Agadir',
    birthDate: '1990-01-01',
    licenseNumber: 'DL123456',
    licenseDate: '2020-01-01',
    passportNumber: 'PP123456',
    passportDate: '2019-01-01',
    idNumber: 'ID123456',
    idValidUntil: '2025-01-01'
  },
  // Add more mock customers as needed
];

const mockVehicles = [
  {
    id: 1,
    name: 'Renault Clio',
    brand: 'Renault',
    plate: '123-A-456',
    color: 'White',
    year: '2022'
  },
  // Add more mock vehicles as needed
];

// Add mock bookings data if none is provided
const mockBookings = [
  {
    id: 1,
    contractNumber: 'CNT-2024-001',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    deliveryLocation: 'Agadir Airport',
    vehicle: {
      name: 'Renault Clio',
      plate: '123-A-456'
    },
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  {
    id: 2,
    contractNumber: 'CNT-2024-002',
    startDate: '2024-03-21',
    endDate: '2024-03-23',
    deliveryLocation: 'Agadir Marina',
    vehicle: {
      name: 'Dacia Duster',
      plate: '789-B-012'
    },
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  }
];

export function ContractView({ bookings = mockBookings }) {
  const navigate = useNavigate();
  const [showNewContract, setShowNewContract] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showSecondCustomerDropdown, setShowSecondCustomerDropdown] = useState(false);
  const [hasSecondRenter, setHasSecondRenter] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSecondCustomer, setSelectedSecondCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [customerType, setCustomerType] = useState('particular'); // 'particular' or 'corporate'
  const [formData, setFormData] = useState({
    contractNumber: 'CNT-2024-001',
    startDate: '2024-03-20',
    startTime: '09:00',
    endDate: '2024-03-22',
    endTime: '09:00',
    deliveryLocation: 'Agadir Airport',
    pickupLocation: 'Agadir Marina',
    franchiseAmount: '5000',
    rate: '10',
    securityDeposit: '10000',
    paymentMethod: 'card',
    notes: 'Customer requested GPS navigation'
  });
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 000-0000', address: '123 Main St', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 111-1111', address: '456 Oak Ave', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 (555) 222-2222', address: '789 Pine Rd', status: 'active' },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [franchiseOption, setFranchiseOption] = useState('no'); // 'yes' or 'no'
  const [paymentMethods] = useState([
    { id: 'cash', name: 'Cash' },
    { id: 'card', name: 'Credit Card' },
    { id: 'bank', name: 'Bank Transfer' },
    { id: 'check', name: 'Check' }
  ]);

  // Sample vehicles data
  const vehicles = [
    { id: 1, name: 'Toyota Camry', plate: 'ABC-123' },
    { id: 2, name: 'Honda Civic', plate: 'XYZ-789' },
    { id: 3, name: 'Tesla Model 3', plate: 'EV-456' },
  ];

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Rental Details" }
  ];

  const [isReviewing, setIsReviewing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);

  // Add this state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add these states at the top of your component
  const [selectedContract, setSelectedContract] = useState(null);
  const [showProlongation, setShowProlongation] = useState(false);

  // Add useEffect to set initial mock data
  useEffect(() => {
    setSelectedCustomer(mockCustomers[0]);
    setSelectedVehicle(mockVehicles[0]);
  }, []);

  const handleCustomerTypeChange = (type) => {
    setCustomerType(type);
    if (type === 'corporate') {
      setFormData(prev => ({ ...prev, endDate: '' }));
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDropdown(false);
  };

  const handleAddNewCustomer = () => {
    navigate('/owner/customers?action=add');
  };

  const handleSaveNewCustomer = (customerData) => {
    const newCustomer = {
      ...customerData,
      id: Date.now(),
      status: 'active'
    };
    setCustomers(prev => [...prev, newCustomer]);
    setSelectedCustomer(newCustomer);
    setShowCustomerForm(false);
  };

  const handleCloseCustomerForm = () => {
    setShowCustomerForm(false);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleDropdown(false);
  };

  const handleSecondCustomerSelect = (customer) => {
    setSelectedSecondCustomer(customer);
    setShowSecondCustomerDropdown(false);
  };

  const handleCalendarSync = async () => {
    try {
      setIsSyncing(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock calendar event creation
      const event = {
        title: `Car Rental - ${selectedVehicle?.name || mockVehicles[0].name}`,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        location: formData.deliveryLocation,
        description: `Rental contract for ${selectedCustomer?.name || mockCustomers[0].name}
          \nVehicle: ${selectedVehicle?.plate || mockVehicles[0].plate}
          \nPickup: ${formData.deliveryLocation}
          \nReturn: ${formData.pickupLocation}`
      };

      console.log('Calendar Event Created:', event);
      setCalendarConnected(true);
      
      // Show success message
      alert('Calendar synced successfully!');
    } catch (error) {
      console.error('Calendar sync failed:', error);
      alert('Failed to sync calendar. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Add the form submission handler
  const handleCreateContract = async (e) => {
    e.preventDefault();
    
    if (!selectedCustomer || !selectedVehicle) {
      alert('Please select both customer and vehicle');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Creating contract with data:', {
        customer: selectedCustomer,
        vehicle: selectedVehicle,
        formData,
        franchise: {
          enabled: franchiseOption === 'yes',
          amount: formData.franchiseAmount,
          rate: formData.rate
        }
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically make an API call to save the contract
      // await createContract({ ... });

      alert('Contract created successfully!');
      setShowNewContract(false);
      setCurrentStep(1);
      // Reset form data
      setFormData({
        contractNumber: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        deliveryLocation: '',
        pickupLocation: '',
        franchiseAmount: '',
        rate: '',
        securityDeposit: '',
        paymentMethod: '',
        notes: ''
      });
      setSelectedCustomer(null);
      setSelectedVehicle(null);
      setFranchiseOption('no');
      setCalendarConnected(false);

    } catch (error) {
      console.error('Failed to create contract:', error);
      alert('Failed to create contract. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Separate handlers for preview and download
  const handlePreviewClick = async (contract) => {
    try {
      setIsGeneratingPDF(true);
      await previewPDF(contract);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      alert('Error generating PDF preview. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadClick = async (contract) => {
    try {
      setIsGeneratingPDF(true);
      await downloadPDF(contract);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Add share function
  const handleShareContract = async (contract) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Car Rental Contract - ${contract.contractNumber}`,
          text: `Contract details for ${contract.vehicle?.name} - ${contract.customer?.name}`,
          url: window.location.href // You can replace this with a specific contract URL
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `${contract.contractNumber} - ${contract.vehicle?.name}`;
        await navigator.clipboard.writeText(shareText);
        alert('Contract link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing contract:', error);
    }
  };

  // Update the button to show loading state
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Customer Type */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Customer Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleCustomerTypeChange('particular')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    customerType === 'particular'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Particular</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCustomerTypeChange('corporate')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    customerType === 'corporate'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Building className="h-5 w-5" />
                  <span>Corporate</span>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Customer Information</h3>
              
              {/* Primary Customer Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-left flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">
                        {selectedCustomer ? selectedCustomer.name : 'Select customer'}
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {showCustomerDropdown && (
                    <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search customers..."
                          className="w-full border border-gray-200 rounded-lg text-sm px-3 py-2"
                        />
                      </div>
                      <ul className="max-h-60 overflow-auto py-2">
                        {customers.map((customer) => (
                          <li key={customer.id}>
                            <button
                              type="button"
                              onClick={() => handleCustomerSelect(customer)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                            >
                              <User className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                <p className="text-xs text-gray-500">{customer.email}</p>
                              </div>
                            </button>
                          </li>
                        ))}
                        <li className="border-t mt-2 pt-2">
                          <button
                            type="button"
                            onClick={handleAddNewCustomer}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-blue-600"
                          >
                            <Plus className="h-5 w-5" />
                            <span className="font-medium">Add New Customer</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Second Customer Checkbox and Dropdown */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasSecondRenter"
                    checked={hasSecondRenter}
                    onChange={(e) => {
                      setHasSecondRenter(e.target.checked);
                      if (!e.target.checked) {
                        setSelectedSecondCustomer(null);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="hasSecondRenter" className="text-sm text-gray-700">
                    Add Second Renter
                  </label>
                </div>

                {hasSecondRenter && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Second Customer *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowSecondCustomerDropdown(!showSecondCustomerDropdown)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-left flex items-center justify-between"
                      >
                        <span className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900">
                            {selectedSecondCustomer ? selectedSecondCustomer.name : 'Select second customer'}
                          </span>
                        </span>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </button>

                      {showSecondCustomerDropdown && (
                        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                          <div className="p-2">
                            <input
                              type="text"
                              placeholder="Search customers..."
                              className="w-full border border-gray-200 rounded-lg text-sm px-3 py-2"
                            />
                          </div>
                          <ul className="max-h-60 overflow-auto py-2">
                            {customers.map((customer) => (
                              <li key={customer.id}>
                                <button
                                  type="button"
                                  onClick={() => handleSecondCustomerSelect(customer)}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                                >
                                  <User className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                    <p className="text-xs text-gray-500">{customer.email}</p>
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Dropdown */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Vehicle Information</h3>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-left flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">
                        {selectedVehicle ? `${selectedVehicle.name} (${selectedVehicle.plate})` : 'Select vehicle'}
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {showVehicleDropdown && (
                    <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search vehicles..."
                          className="w-full border border-gray-200 rounded-lg text-sm px-3 py-2"
                        />
                      </div>
                      <ul className="max-h-60 overflow-auto py-2">
                        {vehicles.map((vehicle) => (
                          <li key={vehicle.id}>
                            <button
                              type="button"
                              onClick={() => handleVehicleSelect(vehicle)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                            >
                              <Car className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{vehicle.name}</p>
                                <p className="text-xs text-gray-500">{vehicle.plate}</p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Contract Details */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Contract Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contract Number
                </label>
                <input
                  type="text"
                  value={formData.contractNumber}
                  onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
                  className="mt-1 w-full border-gray-200 rounded-lg"
                  placeholder="Enter contract number"
                />
              </div>

              {/* Rental Period */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Rental Period</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date *
                    </label>
                    <div className="mt-1 relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="pl-10 w-full border-gray-200 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time *
                    </label>
                    <div className="mt-1 relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="pl-10 w-full border-gray-200 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>

                {customerType === 'particular' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Return Date *
                    </label>
                    <div className="mt-1 relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="pl-10 w-full border-gray-200 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Location Details */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Location Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Location *
                    </label>
                    <div className="mt-1 relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        className="pl-10 w-full border-gray-200 rounded-lg"
                        required
                        placeholder="Enter delivery location"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pickup Location *
                    </label>
                    <div className="mt-1 relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        className="pl-10 w-full border-gray-200 rounded-lg"
                        required
                        placeholder="Enter pickup location"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Franchise Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Franchise</h3>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="franchise"
                      value="yes"
                      checked={franchiseOption === 'yes'}
                      onChange={(e) => setFranchiseOption(e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="franchise"
                      value="no"
                      checked={franchiseOption === 'no'}
                      onChange={(e) => setFranchiseOption(e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>

                {franchiseOption === 'yes' && (
                  <div className="space-y-4 mt-4">
                    {/* Franchise Amount (Dhs) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Franchise Amount (AED) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">AED</span>
                        <input
                          type="number"
                          value={formData.franchiseAmount}
                          onChange={(e) => setFormData({ ...formData, franchiseAmount: e.target.value })}
                          className="pl-12 w-full border-gray-200 rounded-lg"
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                    </div>

                    {/* Rate (%) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rate (%) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.rate}
                          onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                          className="pr-8 w-full border-gray-200 rounded-lg"
                          placeholder="Enter rate"
                          required
                          min="0"
                          max="100"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    {/* Security Deposit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Security Deposit (AED) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">AED</span>
                        <input
                          type="number"
                          value={formData.securityDeposit}
                          onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                          className="pl-12 w-full border-gray-200 rounded-lg"
                          placeholder="Enter deposit amount"
                          required
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method *
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-full border-gray-200 rounded-lg"
                        required
                      >
                        <option value="">Select payment method</option>
                        {paymentMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Additional Notes</h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full border-gray-200 rounded-lg resize-none"
                  placeholder="Enter any additional notes or special requirements..."
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Rental Contracts</h2>
          <button
            onClick={() => {
              setShowNewContract(true);
              setCurrentStep(1);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <File className="h-4 w-4" />
            <span>New Contract</span>
          </button>
        </div>

        {/* Contracts List */}
        <div className="divide-y divide-gray-200">
          {bookings?.map((contract) => (
            <div key={contract?.id || Math.random()} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Car className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {contract?.vehicle?.name || 'Unknown Vehicle'} - {contract?.vehicle?.plate || 'No Plate'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {contract?.customer?.name || 'Unknown Customer'} • Contract #{contract?.contractNumber || 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Preview Button */}
                  <button
                    onClick={() => handlePreviewClick(contract)}
                    disabled={isGeneratingPDF}
                    className="p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center tooltip-container disabled:opacity-50"
                  >
                    {isGeneratingPDF ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="tooltip">Preview Contract</span>
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownloadClick(contract)}
                    disabled={isGeneratingPDF}
                    className="p-2 text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center tooltip-container disabled:opacity-50"
                  >
                    {isGeneratingPDF ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    <span className="tooltip">Download PDF</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShareContract(contract)}
                    className="p-2 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg flex items-center tooltip-container"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="tooltip">Share Contract</span>
                  </button>

                  {/* Extend Button */}
                  <button
                    onClick={() => {
                      setSelectedContract(contract);
                      setShowProlongation(true);
                    }}
                    className="p-2 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 rounded-lg flex items-center tooltip-container"
                  >
                    <Clock className="h-4 w-4" />
                    <span className="tooltip">Extend Contract</span>
                  </button>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {contract?.startDate ? new Date(contract.startDate).toLocaleDateString() : 'No start date'} - 
                  {contract?.endDate ? new Date(contract.endDate).toLocaleDateString() : 'No end date'}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {contract?.deliveryLocation || 'No location specified'}
                </div>
              </div>
            </div>
          ))}

          {(!bookings || bookings.length === 0) && (
            <div className="p-4 text-center text-gray-500">
              No contracts found
            </div>
          )}
        </div>
      </div>

      {/* Contract Creation Modal */}
      {showNewContract && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-0 sm:p-4">
              <div className="relative w-full sm:w-full sm:max-w-3xl bg-white sm:rounded-lg shadow-xl flex flex-col" style={{ height: '600px' }}>
                {/* Modal Header */}
                <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white sm:rounded-t-lg">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {currentStep === 1 ? "Basic Information" : "Rental Details"}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleCalendarSync}
                      disabled={isSyncing}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                        calendarConnected 
                          ? 'text-green-700 bg-green-50 hover:bg-green-100' 
                          : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                      }`}
                    >
                      {isSyncing ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Calendar className="h-4 w-4 mr-2" />
                      )}
                      {calendarConnected ? 'Calendar Connected' : 'Sync Calendar'}
                    </button>
                    <button
                      onClick={() => {
                        setShowNewContract(false);
                        setCurrentStep(1);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex-shrink-0 px-4 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    {steps.map((step) => (
                      <div key={step.number} className="flex items-center">
                        <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 
                          ${currentStep >= step.number 
                            ? 'border-blue-600 bg-blue-600 text-white' 
                            : 'border-gray-300 text-gray-300'}`}
                        >
                          {step.number}
                        </div>
                        <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${
                          currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </span>
                        {step.number !== steps.length && (
                          <div className="w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 bg-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Content - Scrollable Area */}
                <div className="flex-1 overflow-y-auto px-4 py-5">
                  <form onSubmit={handleCreateContract} className="space-y-4 sm:space-y-6">
                    {renderStepContent()}
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="flex-shrink-0 px-4 py-3 bg-gray-50 flex justify-between border-t border-gray-200 sm:rounded-b-lg">
                  {!isReviewing && currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                  )}
                  
                  <div className="ml-auto flex space-x-3">
                    {isReviewing && (
                      <button
                        type="button"
                        onClick={() => setIsReviewing(false)}
                        className="flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                        <span>Edit Details</span>
                      </button>
                    )}
                    
                    {currentStep === steps.length && !isReviewing ? (
                      <button
                        type="button"
                        onClick={() => setIsReviewing(true)}
                        className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-1 sm:mr-2" />
                        <span>Review Contract</span>
                      </button>
                    ) : currentStep < steps.length ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">Next Step</span>
                        <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
                      </button>
                    ) : isReviewing && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <File className="h-4 w-4 mr-2" />
                            <span>Create Contract</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Form Modal */}
      {showCustomerForm && (
        <CustomerFormModal
          isOpen={showCustomerForm}
          onClose={handleCloseCustomerForm}
          onSave={handleSaveNewCustomer}
          customer={null}
          isEditing={false}
        />
      )}

      {/* Contract Preview Layout */}
      {isReviewing && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white sm:rounded-t-lg">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              Contract Preview
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                <Download className="h-4 w-4 mr-1" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setIsReviewing(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-200">
              {/* Contract Header */}
              <div className="border-b border-gray-900 p-4">
                <div className="text-center font-bold border-b border-gray-900 pb-2 mb-2">
                  CONTRAT DE LOCATION DE VEHICULE (511)
                </div>
                <div className="flex">
                  <div className="w-24 h-24 border-r border-gray-900 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      CC
                    </div>
                  </div>
                  <div className="flex-1 pl-4 text-sm">
                    <p className="font-bold">Rental Car - Carco car</p>
                    <p>Adresse: Agadir</p>
                    <p>Tél: +212 6 67 99 91 72 | Email: contact@carcocar.com | Site web: www.carcocar.com</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Section */}
              <div className="border-b border-gray-900">
                <div className="font-bold px-4 py-2 border-b border-gray-900">VEHICULE</div>
                <div className="grid grid-cols-2 text-sm">
                  <div className="border-r border-gray-900">
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Marque:</span>
                      <span>{selectedVehicle?.brand}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Etat technique:</span>
                      <span></span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Lieu de livraison:</span>
                      <span>{formData.deliveryLocation}</span>
                    </div>
                    <div className="px-4 py-2 flex">
                      <span className="w-32">Date et heure de départ:</span>
                      <span>{formData.startDate} {formData.startTime}</span>
                    </div>
                  </div>
                  <div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Immatriculation:</span>
                      <span>{selectedVehicle?.plate}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">N° fiche contrôle:</span>
                      <span></span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Lieu de reprise:</span>
                      <span>{formData.pickupLocation}</span>
                    </div>
                    <div className="px-4 py-2 flex">
                      <span className="w-32">Date et heure de retour:</span>
                      <span>{formData.endDate} {formData.endTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locataire Section */}
              <div className="border-b border-gray-900">
                <div className="font-bold px-4 py-2 border-b border-gray-900">LOCATAIRE</div>
                <div className="grid grid-cols-2 text-sm">
                  <div className="border-r border-gray-900">
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Nom:</span>
                      <span>{selectedCustomer?.lastName}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Né le:</span>
                      <span>{selectedCustomer?.birthDate}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Permis conduite N°:</span>
                      <span>{selectedCustomer?.licenseNumber}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Passeport N°:</span>
                      <span>{selectedCustomer?.passportNumber}</span>
                    </div>
                    <div className="px-4 py-2 flex">
                      <span className="w-32">CIN N°:</span>
                      <span>{selectedCustomer?.idNumber}</span>
                    </div>
                  </div>
                  <div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Prénom:</span>
                      <span>{selectedCustomer?.firstName}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Adresse:</span>
                      <span>{selectedCustomer?.address}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Délivré le:</span>
                      <span>{selectedCustomer?.licenseDate}</span>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-900 flex">
                      <span className="w-32">Délivré le:</span>
                      <span>{selectedCustomer?.passportDate}</span>
                    </div>
                    <div className="px-4 py-2 flex">
                      <span className="w-32">Valable jusqu'au:</span>
                      <span>{selectedCustomer?.idValidUntil}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Franchise Section */}
              <div className="p-4 border-b border-gray-900">
                <div className="flex justify-between items-start">
                  <div className="text-sm space-y-2">
                    <p>LE LOCATAIRE:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Je déclare avoir connaissance de cause que si le dits contrat viole des droits protégés, tous engagés serait à ma charge.</li>
                      <li>Je déclare avoir connaissance des dates et conditions de retour du véhicule et réparer dépassés au verso de ce contrat ainsi que la facturation.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm mb-2">
                      <span>ASSURANCE:</span>
                      <span className="ml-4">
                        Franchise:
                        <input type="checkbox" checked={franchiseOption === 'yes'} className="ml-2" /> Avec
                        <input type="checkbox" checked={franchiseOption === 'no'} className="ml-2" /> Sans
                      </span>
                    </div>
                    {franchiseOption === 'yes' && (
                      <div className="border border-gray-900">
                        <div className="font-bold px-2 py-1 border-b border-gray-900">FRANCHISE:</div>
                        <div className="grid grid-cols-2 text-sm">
                          <div className="px-2 py-1 border-r border-gray-900">
                            <span>Dhs: {formData.franchiseAmount}</span>
                          </div>
                          <div className="px-2 py-1">
                            <span>Taux %: {formData.rate}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-3 text-sm">
                <div className="p-4 border-r border-gray-900">
                  <p className="mb-20">Locataire (1er conducteur)</p>
                  <p className="text-xs italic">Signature précédée de la mention "lu et approuvé"</p>
                </div>
                <div className="p-4 border-r border-gray-900">
                  <p className="mb-20">Locataire (2ème conducteur)</p>
                  <p className="text-xs italic">Signature précédée de la mention "lu et approuvé"</p>
                </div>
                <div className="p-4">
                  <p className="mb-20">Agent (signature et cachet)</p>
                  <div className="w-20 h-20 mx-auto">
                    {/* Add your company stamp/signature image here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prolongation Modal */}
      {showProlongation && selectedContract && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Extend Rental Period
                  </h3>
                  <button
                    onClick={() => setShowProlongation(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current End Date
                    </label>
                    <input
                      type="text"
                      value={new Date(selectedContract.endDate).toLocaleDateString()}
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New End Date *
                    </label>
                    <input
                      type="date"
                      min={selectedContract.endDate}
                      required
                      className="w-full border-gray-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Extension
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border-gray-200 rounded-lg"
                      placeholder="Enter reason for extension..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowProlongation(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Confirm Extension
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add these styles to your CSS */}
      <style jsx>{`
        .tooltip-container {
          position: relative;
        }

        .tooltip {
          visibility: hidden;
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #1f2937;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 10;
        }

        .tooltip-container:hover .tooltip {
          visibility: visible;
        }
      `}</style>
    </>
  );
} 