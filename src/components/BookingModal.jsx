import { useState, useEffect, useMemo } from 'react';
import { X, Loader2, ArrowLeft, ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { bookingFormConfig, validateField, initialBookingState } from '../utils/formConfig';
import { format } from 'date-fns';
import { useBookingStore } from '../stores/bookingStore';

// Modern Step Indicator
const StepIndicator = ({ steps, currentStep }) => (
  <div className="px-8 py-6">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center relative flex-1">
          {/* Connection Line */}
          {index < steps.length - 1 && (
            <div className="absolute left-1/2 right-0 top-4 h-[2px] -translate-y-1/2">
              <div className={`h-full transition-all duration-500 ease-out
                ${currentStep > index + 1 ? 'bg-blue-500' : 'bg-gray-200'}`} 
              />
            </div>
          )}
          
          {/* Step Circle */}
          <div className={`
            relative z-10 flex items-center justify-center w-8 h-8 rounded-full
            border-2 transition-all duration-300 transform
            ${currentStep === index + 1 ? 'scale-110' : 'scale-100'}
            ${currentStep > index 
              ? 'border-blue-500 bg-blue-500' 
              : currentStep === index + 1
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50'}
          `}>
            {currentStep > index ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              <span className={`text-sm font-medium
                ${currentStep === index + 1 ? 'text-blue-500' : 'text-gray-400'}
              `}>
                {index + 1}
              </span>
            )}
          </div>

          {/* Step Title */}
          <span className={`
            mt-3 text-sm font-medium transition-colors duration-300
            ${currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'}
          `}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Modern Form Field
const FormField = ({ field, value, onChange, error }) => {
  const Icon = field.icon;
  
  return (
    <div className="space-y-2 transition-all duration-300 ease-out transform translate-y-0 opacity-100">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
        )}
        
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
          className={`
            block w-full rounded-lg border shadow-sm
            px-4 py-2.5 transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-300'}
            focus:ring-2 focus:ring-opacity-50
          `}
        />

        {error && (
          <p className="absolute text-sm text-red-500 mt-1 transition-all duration-200 ease-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

// DateTimePicker Component
const DateTimePicker = ({ label, value, onChange, error, min }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <div className="grid grid-cols-2 gap-2">
      <input
        type="date"
        value={value?.split('T')[0] || ''}
        onChange={(e) => {
          const date = e.target.value;
          const time = value?.split('T')[1]?.slice(0, 5) || '00:00';
          onChange(`${date}T${time}`);
        }}
        min={min || format(new Date(), 'yyyy-MM-dd')}
        className={`
          block w-full rounded-lg border shadow-sm px-4 py-2.5
          ${error ? 'border-red-300' : 'border-gray-200'}
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        `}
      />
      <input
        type="time"
        value={value?.split('T')[1]?.slice(0, 5) || ''}
        onChange={(e) => {
          const date = value?.split('T')[0] || format(new Date(), 'yyyy-MM-dd');
          const time = e.target.value;
          onChange(`${date}T${time}`);
        }}
        className={`
          block w-full rounded-lg border shadow-sm px-4 py-2.5
          ${error ? 'border-red-300' : 'border-gray-200'}
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        `}
      />
    </div>
    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}
  </div>
);

// Form Section with DateTimePicker
const FormSection = ({ section, formData, onChange, errors }) => (
  <div className="space-y-8 transition-all duration-300 ease-out">
    <div>
      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
      {section.description && (
        <p className="mt-2 text-sm text-gray-500">{section.description}</p>
      )}
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {section.fields.map((field) => (
        field.type === 'datetime' ? (
          <DateTimePicker
            key={field.id}
            label={field.label}
            value={formData[field.id]}
            onChange={(value) => onChange(field.id, value)}
            error={errors[field.id]}
            min={field.id === 'endDate' ? formData.startDate : undefined}
          />
        ) : (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.id]}
            onChange={onChange}
            error={errors[field.id]}
          />
        )
      ))}
    </div>
  </div>
);

// Vehicle Preview Component
const VehiclePreview = ({ vehicle }) => {
  if (!vehicle) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-lg font-medium text-gray-900 mb-2">{vehicle.name}</h4>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Model: {vehicle.model}</p>
        <p>Year: {vehicle.year}</p>
        <p>Daily Rate: ${vehicle.dailyRate}</p>
      </div>
    </div>
  );
};

// Booking Summary Component
const BookingSummary = ({ formData, vehicle }) => {
  if (!vehicle || !formData.startDate || !formData.endDate) return null;

  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const totalCost = days * vehicle.dailyRate;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h4>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{days} days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Daily Rate:</span>
          <span className="font-medium">${vehicle.dailyRate}</span>
        </div>
        <div className="flex justify-between pt-3 border-t">
          <span className="text-gray-900 font-medium">Total Cost:</span>
          <span className="text-blue-600 font-semibold">${totalCost}</span>
        </div>
      </div>
    </div>
  );
};

// Customer Search Component
const CustomerSearch = ({ onCustomerFound, title = "Primary Driver" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [customerFormData, setCustomerFormData] = useState({});
  const [customerErrors, setCustomerErrors] = useState({});
  const { 
    customers,
    fetchCustomers,
    createCustomer, 
    isLoading 
  } = useBookingStore();

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleCustomerFieldChange = (id, value) => {
    setCustomerFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setCustomerErrors(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  const handleCreateCustomer = async () => {
    try {
      const newCustomer = await createCustomer(customerFormData);
      onCustomerFound(newCustomer);
      setShowCreateForm(false);
      toast.success('Customer created successfully!');
    } catch (error) {
      toast.error('Failed to create customer');
    }
  };

  // Escape special characters and convert * to .*
  const getSearchRegex = (term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special chars
                            .replace(/\\\*/g, '.*'); // Convert \* back to .* for wildcard
    try {
      return new RegExp(escapedTerm, 'i');
    } catch (e) {
      return new RegExp('', 'i'); // Return empty regex if invalid
    }
  };

  // Filter customers based on search term using regex
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const searchRegex = getSearchRegex(searchTerm);
    return customers.filter(customer => 
      searchRegex.test(customer.firstName) || 
      searchRegex.test(customer.lastName) || 
      searchRegex.test(customer.email) ||
      searchRegex.test(`${customer.firstName} ${customer.lastName}`)
    );
  }, [customers, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    // No need to make an API call, filtering is done locally
  };

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {!showCreateForm ? (
        <>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search customer by name or email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                + New Customer
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searchTerm && (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
                  <p className="text-gray-500 mt-2">Loading customers...</p>
                </div>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onCustomerFound(customer)}
                  >
                    <div>
                      <p className="font-medium">
                        {`${customer.firstName} ${customer.lastName}`}
                      </p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                    <button
                      className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomerFound(customer);
                      }}
                    >
                      Select
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No matching customers found</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <FormSection
            section={bookingFormConfig.sections[0]}
            formData={customerFormData}
            onChange={handleCustomerFieldChange}
            errors={customerErrors}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateCustomer}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Customer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this function before the BookingModal component
const calculateTotalCost = (formData, vehicle) => {
  if (!vehicle || !formData.startDate || !formData.endDate) return 0;
  
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  return days * vehicle.dailyRate;
};

// Main Modal Component
export const BookingModal = ({ show, onClose, vehicleId }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialBookingState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecondDriver, setShowSecondDriver] = useState(false);
  
  const { 
    selectedVehicle,
    setSelectedVehicle,
    createBooking,
    isLoading,
    customers,
    fetchCustomers,
    createCustomer
  } = useBookingStore();

  // Updated steps configuration
  const steps = [
    { id: 'primary-driver', title: 'Primary Driver' },
    { id: 'second-driver', title: 'Second Driver' },
    { id: 'booking-details', title: 'Booking Details' },
    { id: 'review', title: 'Review' }
  ];

  // Fetch vehicle details when modal opens
  useEffect(() => {
    if (show && vehicleId) {
      // Replace with your actual API call
      fetch(`/api/vehicles/${vehicleId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSelectedVehicle(data.vehicle);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle:', error);
          toast.error('Failed to load vehicle details');
        });
    }
  }, [show, vehicleId, setSelectedVehicle]);

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setCurrentStep(1);
      setFormData(initialBookingState);
      setErrors({});
    }
  }, [show]);

  const handleFieldChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = {};

    switch (currentStep) {
      case 1: // Primary Driver
        if (!formData.firstName?.trim()) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName?.trim()) {
          newErrors.lastName = 'Last name is required';
          isValid = false;
        }
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
          isValid = false;
        }
        if (!formData.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        }
        if (!formData.licenseNumber?.trim()) {
          newErrors.licenseNumber = 'License number is required';
          isValid = false;
        }
        break;

      case 2: // Second Driver (optional)
        if (showSecondDriver) {
          if (formData.secondDriver) {
            if (!formData.secondDriver.firstName?.trim()) {
              newErrors['secondDriver.firstName'] = 'First name is required';
              isValid = false;
            }
            if (!formData.secondDriver.lastName?.trim()) {
              newErrors['secondDriver.lastName'] = 'Last name is required';
              isValid = false;
            }
            if (!formData.secondDriver.licenseNumber?.trim()) {
              newErrors['secondDriver.licenseNumber'] = 'License number is required';
              isValid = false;
            }
          }
        }
        break;

      case 3: // Booking Details
        if (!formData.startDate) {
          newErrors.startDate = 'Start date is required';
          isValid = false;
        }
        if (!formData.endDate) {
          newErrors.endDate = 'End date is required';
          isValid = false;
        }
        if (formData.startDate && formData.endDate) {
          const start = new Date(formData.startDate);
          const end = new Date(formData.endDate);
          if (end <= start) {
            newErrors.endDate = 'End date must be after start date';
            isValid = false;
          }
        }
        break;

      case 4: // Review
        if (!formData.terms) {
          newErrors.terms = 'You must accept the terms and conditions';
          isValid = false;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleCustomerFound = (customer) => {
    setFormData(prev => ({
      ...prev,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      // Add other relevant customer fields
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let isValid = true;
    for (let step = 1; step <= steps.length; step++) {
      setCurrentStep(step);
      if (!validateCurrentStep()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      toast.error('Please check all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...formData,
        vehicleId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        totalCost: calculateTotalCost(formData, selectedVehicle)
      };

      await createBooking(bookingData);
      toast.success('Booking submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(error.message || 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <CustomerSearch 
              onCustomerFound={handleCustomerFound} 
              title="Primary Driver" 
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowSecondDriver(!showSecondDriver)}
                className="text-blue-500 hover:text-blue-600"
              >
                {showSecondDriver ? '- Remove Second Driver' : '+ Add Second Driver'}
              </button>
            </div>
            {showSecondDriver && (
              <CustomerSearch 
                onCustomerFound={(customer) => handleFieldChange('secondDriver', customer)}
                title="Second Driver"
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormSection
              section={bookingFormConfig.sections[1]} // Assuming this is the booking details section
              formData={formData}
              onChange={handleFieldChange}
              errors={errors}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                <BookingSummary formData={formData} vehicle={selectedVehicle} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Vehicle Details</h3>
                <VehiclePreview vehicle={selectedVehicle} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!show) return null;

  return (
    <div className={`
      fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm
      transition-opacity duration-300
      ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className="min-h-screen px-4 text-center">
        <div className={`
          inline-block w-full max-w-4xl my-8 text-left align-middle
          bg-white rounded-2xl shadow-xl transform transition-all duration-300
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">New Booking</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Step Indicator */}
          <StepIndicator steps={steps} currentStep={currentStep} />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="px-8 py-6">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between px-8 py-6 border-t">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`
                  px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium
                  transition-all duration-200
                  ${currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg 
                    hover:bg-blue-600 transition-colors flex items-center gap-2
                    font-medium shadow-lg shadow-blue-500/30"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg
                    hover:bg-blue-600 transition-colors flex items-center gap-2
                    font-medium shadow-lg shadow-blue-500/30
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};