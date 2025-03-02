/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Users, UserPlus, Search, Filter, MoreVertical, 
  Mail, Phone, MapPin, Edit, Trash, Download,
  Archive, CheckCircle, XCircle, Calendar, Car,
  ChevronDown, ChevronRight, FileText, Eye, Plus, X, Camera, Image, FileX
} from 'lucide-react';
import CustomerModal from '../../components/CustomerModal.jsx';
import ActionMenu from '../../components/ActionMenu';
import { toast } from 'react-hot-toast';
import emptyDocImage from '../../assets/img/empty.jpg'
import { DocumentViewer } from '../../components/DocumentViewer';
import ThreeDotsButton from '../../components/ThreeDotsButton';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXmark,
  faUser,
  faFileLines,
  faImage,
  faFileCircleXmark
} from '@fortawesome/free-solid-svg-icons';

// Move statusOptions outside components
const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-100 text-red-800' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
];

const DocumentPreview = ({ document, label }) => {
  return (
    <div className="text-sm">
      <span className="text-gray-500">{label}:</span>
      <span className="ml-1 text-gray-900">
        {document ? 'Available' : 'Not available'}
      </span>
    </div>
  );
};

const CustomerFormModal = ({ customer, onClose, onSave, isEditing }) => {
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState('passport');
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    dateOfBirth: customer?.dateOfBirth || '',
    
    // Step 2: License & ID
    driverLicenseNumber: customer?.driverLicenseNumber || '',
    driverLicenseDate: customer?.driverLicenseDate || '',
    passportNumber: customer?.passportNumber || '',
    idCardNumber: customer?.idCardNumber || '',
    idCardExpiryDate: customer?.idCardExpiryDate || '',
    status: customer?.status || 'active',
    documents: {
      licenseFront: null,
      licenseBack: null,
      idDocumentFront: null,
      idDocumentBack: null
    }
  });

  // Add useEffect for escape key handling
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Add click handler for backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSave(formData);
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Camera className="h-8 w-8 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">
          Status
        </label>
        <div className="flex gap-3">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, status: option.value })}
              className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                formData.status === option.value
                  ? `${option.color} border-transparent`
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="example@email.com"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Day
          </label>
          <select
            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).getDate() : ''}
            onChange={(e) => {
              const currentDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date();
              currentDate.setDate(parseInt(e.target.value));
              setFormData({ ...formData, dateOfBirth: currentDate.toISOString().split('T')[0] });
            }}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Day</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Month
          </label>
          <select
            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).getMonth() : ''}
            onChange={(e) => {
              const currentDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date();
              currentDate.setMonth(parseInt(e.target.value));
              setFormData({ ...formData, dateOfBirth: currentDate.toISOString().split('T')[0] });
            }}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Month</option>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ].map((month, i) => (
              <option key={i} value={i}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Year
          </label>
          <select
            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).getFullYear() : ''}
            onChange={(e) => {
              const currentDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date();
              currentDate.setFullYear(parseInt(e.target.value));
              setFormData({ ...formData, dateOfBirth: currentDate.toISOString().split('T')[0] });
            }}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Year</option>
            {[...Array(100)].map((_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {/* License Information */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          License Number *
        </label>
        <input
          type="text"
          value={formData.driverLicenseNumber}
          onChange={(e) => setFormData({ ...formData, driverLicenseNumber: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter license number"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Driver's License Issue Date *
        </label>
        <input
          type="date"
          value={formData.driverLicenseDate}
          onChange={(e) => setFormData({ ...formData, driverLicenseDate: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* ID Type Selection */}
      <div className="border-t border-gray-200 pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose Identification Type
        </label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setIdType('passport')}
            className={`flex-1 py-2.5 px-4 rounded-lg border ${
              idType === 'passport'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Passport
          </button>
          <button
            type="button"
            onClick={() => setIdType('cin')}
            className={`flex-1 py-2.5 px-4 rounded-lg border ${
              idType === 'cin'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            CIN
          </button>
        </div>
      </div>

      {/* Conditional Fields Based on ID Type */}
      {idType === 'passport' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Passport Number *
            </label>
            <input
              type="text"
              value={formData.passportNumber}
              onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={idType === 'passport'}
              placeholder="Enter passport number"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Passport Expiry Date *
            </label>
            <input
              type="date"
              value={formData.passportExpiryDate}
              onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={idType === 'passport'}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ID Card Number (CIN) *
            </label>
            <input
              type="text"
              value={formData.idCardNumber}
              onChange={(e) => setFormData({ ...formData, idCardNumber: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={idType === 'cin'}
              placeholder="Enter ID card number"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ID Card Expiry Date *
            </label>
            <input
              type="date"
              value={formData.idCardExpiryDate}
              onChange={(e) => setFormData({ ...formData, idCardExpiryDate: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={idType === 'cin'}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Required Documents</h3>
        <p className="text-sm text-gray-500 mb-4">
          Please upload clear photos or scans of the following documents
        </p>
      </div>

      {/* Driver's License */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Driver's License (Front) *
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full h-32 flex flex-col items-center justify-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm">Click to upload front side</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, licenseFront: file }
                    }));
                  }
                }}
                required
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Driver's License (Back) *
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full h-32 flex flex-col items-center justify-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm">Click to upload back side</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, licenseBack: file }
                    }));
                  }
                }}
                required
              />
            </label>
          </div>
        </div>
      </div>

      {/* Conditional ID Document Upload */}
      {idType === 'passport' ? (
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Passport *
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full h-32 flex flex-col items-center justify-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm">Click to upload passport</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      documents: { 
                        ...prev.documents, 
                        idDocumentFront: file,
                        idDocumentBack: null // Clear back side when switching to passport
                      }
                    }));
                  }
                }}
                required
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              CIN (Front) *
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full h-32 flex flex-col items-center justify-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm">Click to upload front side</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData(prev => ({
                        ...prev,
                        documents: { ...prev.documents, idDocumentFront: file }
                      }));
                    }
                  }}
                  required
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              CIN (Back) *
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full h-32 flex flex-col items-center justify-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm">Click to upload back side</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData(prev => ({
                        ...prev,
                        documents: { ...prev.documents, idDocumentBack: file }
                      }));
                    }
                  }}
                  required
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleBackdropClick} // Add click handler here
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {step === 1 ? 'Account Details' : 
             step === 2 ? 'Identity Documents' : 
             'Upload Documents'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {step === 1 ? renderStep1() : 
           step === 2 ? renderStep2() : 
           renderStep3()}

          {/* Navigation */}
          <div className="pt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                step === 1 ? 'w-full' : 'ml-auto'
              }`}
            >
              {step < 3 ? 'Next' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PreviewModal = ({ customer, onClose }) => {
  // Add useEffect for escape key handling
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Add click handler for backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Helper function to handle image source
  const getImageSource = (document) => {
    if (!document) return null;
    
    // If it's already a URL string, return it directly
    if (typeof document === 'string') return document;
    
    // If it's a Blob/File object, create object URL
    if (document instanceof Blob) return URL.createObjectURL(document);
    
    return null;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick} // Add click handler here
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Customer Details
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusOptions.find(opt => opt.value === customer.status)?.color
              }`}>
                {statusOptions.find(opt => opt.value === customer.status)?.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Customer information and documents</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Account Details Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 rounded-full p-2">
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Account Details
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="text-sm font-medium text-gray-900">{customer.name}</p>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm font-medium text-gray-900">{customer.email}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(customer.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Identity Documents Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 rounded-full p-2">
                <FontAwesomeIcon icon={faFileLines} className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Identity Documents
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">License Number</label>
                <p className="text-sm font-medium text-gray-900">{customer.driverLicenseNumber}</p>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">License Issue Date</label>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(customer.driverLicenseDate).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  {customer.passportNumber ? 'Passport Number' : 'CIN Number'}
                </label>
                <p className="text-sm font-medium text-gray-900">
                  {customer.passportNumber || customer.idCardNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 rounded-full p-2">
                <FontAwesomeIcon icon={faImage} className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Documents
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <label className="block text-sm text-gray-600 mb-1">License (Front)</label>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  {customer.documents?.licenseFront ? (
                    <img 
                      src={getImageSource(customer.documents.licenseFront)}
                      alt="License Front"
                      className="max-h-full rounded-lg object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-image-url'; // You can add a placeholder image
                      }}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No image</span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">License (Back)</label>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  {customer.documents?.licenseBack ? (
                    <img 
                      src={getImageSource(customer.documents.licenseBack)}
                      alt="License Back"
                      className="max-h-full rounded-lg object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-image-url'; // You can add a placeholder image
                      }}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No image</span>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  {customer.passportNumber ? 'Passport' : 'CIN'}
                </label>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  {customer.documents?.idDocumentFront ? (
                    <img 
                      src={getImageSource(customer.documents.idDocumentFront)}
                      alt="ID Document"
                      className="max-h-full rounded-lg object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-image-url'; // You can add a placeholder image
                      }}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No image</span>
                  )}
                </div>
              </div>
              {!customer.passportNumber && customer.documents?.idDocumentBack && (
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">CIN (Back)</label>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <img 
                      src={getImageSource(customer.documents.idDocumentBack)}
                      alt="CIN Back"
                      className="max-h-full rounded-lg object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-image-url'; // You can add a placeholder image
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234 567 8900",
      type: "Individual",
      status: "active",
      rentalHistory: [
        {
          id: 1,
          vehicleModel: "Toyota Camry",
          startDate: "2024-02-15",
          endDate: "2024-02-20",
          status: "completed",
          totalAmount: "$350.00"
        }
      ],
      actions: [
        { type: "New rental booked", date: "2024-03-15" },
        { type: "Account created", date: "2024-03-01" },
      ],
      idType: 'identity',
      documents: {
        idFront: null,
        idBack: null,
        licenseFront: null,
        licenseBack: null
      }
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 234 567 8901",
      type: "Corporate",
      status: "active",
      rentalHistory: [],
      actions: [
        { type: "Account verified", date: "2024-03-10" },
      ]
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [actionMenuCustomer, setActionMenuCustomer] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [modalCustomer, setModalCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // New filters
  const [dateFilter, setDateFilter] = useState('all'); // all, lastWeek, lastMonth, lastYear
  const [rentalFilter, setRentalFilter] = useState('all'); // all, ongoing, completed

  const [expandedRows, setExpandedRows] = useState(new Set());

  const [viewerDoc, setViewerDoc] = useState(null);

  const documentGroups = [
    {
      title: "Driver's License",
      items: [
        { key: 'licenseFront', label: 'Front Side' },
        { key: 'licenseBack', label: 'Back Side' }
      ]
    },
    {
      title: 'Identity Documents',
      items: [
        { key: 'idCard', label: 'ID Card' },
        { key: 'proofOfAddress', label: 'Proof of Address' }
      ]
    }
  ];

  const CustomerPreviewModal = ({ customer, onClose }) => {
    if (!customer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Customer Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-4">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : customer.status === 'blocked'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Address</h3>
              <p className="text-sm text-gray-900">{customer.address}</p>
            </div>

            {/* Rental Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Rental Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Rentals</p>
                  <p className="text-sm text-gray-900">{customer.totalRentals}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ongoing Rental</p>
                  <p className="text-sm text-gray-900">{customer.ongoingRental ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">License Number</p>
                  <p className="text-sm text-gray-900">{customer.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-sm text-gray-900">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Documents</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {documentGroups.map(group => (
                  <div key={group.title}>
                    <p className="text-sm font-medium text-gray-500 mb-2">{group.title}</p>
                    <div className="space-y-2">
                      {group.items.map(item => (
                        <DocumentPreview
                          key={item.key}
                          document={customer.documents?.[item.key]}
                          label={item.label}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CustomerActionMenu = ({ position, onClose, onEdit, onDelete, onPreview, customer }) => {
    const menuRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
      <div
        ref={menuRef}
        className="absolute z-10 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
        style={{ top: position.top, left: position.left }}
      >
        <button
          onClick={() => {
            onClose();
            onPreview(customer);
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="h-4 w-4 mr-3" />
          Preview
        </button>
        <button
          onClick={() => {
            onClose();
            onEdit(customer);
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Edit className="h-4 w-4 mr-3" />
          Edit
        </button>
        <button
          onClick={() => {
            onClose();
            onDelete(customer.id);
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash className="h-4 w-4 mr-3" />
          Delete
        </button>
      </div>
    );
  };

  const toggleRow = (customerId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(customerId)) {
      newExpandedRows.delete(customerId);
    } else {
      newExpandedRows.add(customerId);
    }
    setExpandedRows(newExpandedRows);
  };

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock data with 10 customers
      const mockData = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 234-567-8901',
          status: 'active',
          address: '123 Main St, New York, NY',
          dateOfBirth: '1990-01-15',
          createdAt: '2024-01-15T10:00:00Z',
          licenseNumber: 'DL123456',
          totalRentals: 5,
          ongoingRental: true,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1 234-567-8902',
          status: 'active',
          address: '456 Oak Ave, Los Angeles, CA',
          dateOfBirth: '1988-03-20',
          createdAt: '2024-02-01T15:30:00Z',
          licenseNumber: 'DL789012',
          totalRentals: 3,
          ongoingRental: false,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: null,
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 3,
          name: 'Michael Johnson',
          email: 'michael.j@example.com',
          phone: '+1 234-567-8903',
          status: 'disabled',
          address: '789 Pine St, Chicago, IL',
          dateOfBirth: '1992-07-10',
          createdAt: '2024-01-20T09:15:00Z',
          licenseNumber: 'DL345678',
          totalRentals: 1,
          ongoingRental: false,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: null,
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: null
          }
        },
        {
          id: 4,
          name: 'Emily Brown',
          email: 'emily.b@example.com',
          phone: '+1 234-567-8904',
          status: 'archived',
          address: '321 Maple Dr, Houston, TX',
          dateOfBirth: '1985-11-30',
          createdAt: '2023-12-10T14:20:00Z',
          licenseNumber: 'DL901234',
          totalRentals: 8,
          ongoingRental: false,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 5,
          name: 'David Wilson',
          email: 'david.w@example.com',
          phone: '+1 234-567-8905',
          status: 'active',
          address: '654 Elm St, Miami, FL',
          dateOfBirth: '1995-04-25',
          createdAt: '2024-02-05T11:45:00Z',
          licenseNumber: 'DL567890',
          totalRentals: 2,
          ongoingRental: true,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: null,
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 6,
          name: 'Sarah Davis',
          email: 'sarah.d@example.com',
          phone: '+1 234-567-8906',
          status: 'active',
          address: '987 Cedar Ln, Seattle, WA',
          dateOfBirth: '1993-09-12',
          createdAt: '2024-01-25T16:50:00Z',
          licenseNumber: 'DL234567',
          totalRentals: 4,
          ongoingRental: false,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 7,
          name: 'Robert Taylor',
          email: 'robert.t@example.com',
          phone: '+1 234-567-8907',
          status: 'disabled',
          address: '147 Birch Rd, Denver, CO',
          dateOfBirth: '1987-06-18',
          createdAt: '2024-01-05T13:25:00Z',
          licenseNumber: 'DL678901',
          totalRentals: 6,
          ongoingRental: false,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: null,
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 8,
          name: 'Lisa Anderson',
          email: 'lisa.a@example.com',
          phone: '+1 234-567-8908',
          status: 'active',
          address: '258 Spruce Ave, Boston, MA',
          dateOfBirth: '1991-12-05',
          createdAt: '2024-02-10T08:40:00Z',
          licenseNumber: 'DL890123',
          totalRentals: 1,
          ongoingRental: true,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: null
          }
        },
        {
          id: 9,
          name: 'James Martinez',
          email: 'james.m@example.com',
          phone: '+1 234-567-8909',
          status: 'archived',
          address: '369 Willow St, Phoenix, AZ',
          dateOfBirth: '1989-08-22',
          createdAt: '2023-11-30T17:10:00Z',
          licenseNumber: 'DL456789',
          totalRentals: 7,
          ongoingRental: false,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        },
        {
          id: 10,
          name: 'Amanda White',
          email: 'amanda.w@example.com',
          phone: '+1 234-567-8910',
          status: 'active',
          address: '741 Aspen Ct, San Francisco, CA',
          dateOfBirth: '1994-02-28',
          createdAt: '2024-01-30T12:05:00Z',
          licenseNumber: 'DL012345',
          totalRentals: 3,
          ongoingRental: true,
          documents: {
            licenseFront: 'https://example.com/license-front.jpg',
            licenseBack: 'https://example.com/license-back.jpg',
            idCard: 'https://example.com/id-card.jpg',
            proofOfAddress: 'https://example.com/proof.jpg'
          }
        }
      ];
      
      setCustomers(mockData);
    } catch (err) {
      setError('Failed to fetch customers');
      console.error('Error fetching customers:', err);
      toast.error('Failed to fetch customers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerSubmit = async (customerData) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // const url = selectedCustomer 
      //   ? `/api/customers/${selectedCustomer.id}`
      //   : '/api/customers';
      // const method = selectedCustomer ? 'PUT' : 'POST';
      // const response = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(customerData)
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Mock update
      if (selectedCustomer) {
        setCustomers(prev => prev.map(c => 
          c.id === selectedCustomer.id ? { ...c, ...customerData } : c
        ));
      } else {
        setCustomers(prev => [...prev, { ...customerData, id: Date.now() }]);
      }

      toast.success(selectedCustomer ? 'Customer updated' : 'Customer created');
      setShowCustomerModal(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Error saving customer:', err);
      toast.error('Failed to save customer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerAction = async (customerId, action) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/customers/${customerId}/${action}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Mock update
      setCustomers(prev => prev.map(c => {
        if (c.id === customerId) {
          switch (action) {
            case 'archive':
              return { ...c, status: 'archived' };
            case 'enable':
              return { ...c, status: 'active' };
            case 'disable':
              return { ...c, status: 'disabled' };
            default:
              return c;
          }
        }
        return c;
      }));

      toast.success(`Customer ${action}d successfully`);
    } catch (err) {
      console.error(`Error ${action}ing customer:`, err);
      toast.error(`Failed to ${action} customer`);
    } finally {
      setIsLoading(false);
      setActionMenuCustomer(null);
    }
  };

  // Filter helpers
  const isWithinDateRange = (date, range) => {
    const createdDate = new Date(date);
    const now = new Date();
    const diff = now - createdDate;
    const daysDiff = diff / (1000 * 60 * 60 * 24);

    switch (range) {
      case 'lastWeek':
        return daysDiff <= 7;
      case 'lastMonth':
        return daysDiff <= 30;
      case 'lastYear':
        return daysDiff <= 365;
      default:
        return true;
    }
  };

  // Updated filter logic
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    
    const matchesDate = dateFilter === 'all' || 
      isWithinDateRange(customer.createdAt, dateFilter);
    
    const matchesRental = rentalFilter === 'all' || 
      (rentalFilter === 'ongoing' ? customer.ongoingRental : !customer.ongoingRental);

    return matchesSearch && matchesStatus && matchesDate && matchesRental;
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleThreeDotsClick = (e, customer) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCustomer(customer);
    setShowMenu(true);
    // Position the menu near the click, but slightly offset
    setMenuPosition({
      top: e.clientY,
      left: e.clientX - 100 // Offset to the left so menu doesn't go off-screen
    });
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowFormModal(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowFormModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setIsEditing(false);
    setIsCreating(false);
    setSelectedCustomer(null);
  };

  const handleSaveCustomer = (customerData) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(prev => prev.map(c => 
        c.id === editingCustomer.id ? { ...c, ...customerData } : c
      ));
    } else {
      // Add new customer
      setCustomers(prev => [...prev, { ...customerData, id: Date.now() }]);
    }
    setModalCustomer(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      // await deleteCustomer(customerId);
      
      // Mock deletion
      setCustomers(prev => prev.filter(c => c.id !== customerId));
      toast.success('Customer deleted successfully');
    } catch (err) {
      console.error('Error deleting customer:', err);
      toast.error('Failed to delete customer');
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  // Add useEffect to handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCustomer, setPreviewCustomer] = useState(null);

  const handlePreview = (customer) => {
    setPreviewCustomer(customer);
    setShowPreviewModal(true);
  };

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Add this to handle the URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'add') {
      handleAddCustomer();
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all customers in your system
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={handleAddCustomer}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {customer.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            customer.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : customer.status === 'blocked'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={(e) => handleThreeDotsClick(e, customer)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showMenu && selectedCustomer && (
          <CustomerActionMenu
            position={menuPosition}
            onClose={() => setShowMenu(false)}
            onEdit={() => {
              setShowMenu(false);
              handleEditCustomer(selectedCustomer);
            }}
            onDelete={handleDeleteCustomer}
            onPreview={handlePreview}
            customer={selectedCustomer}
          />
        )}

        {showFormModal && (
          <CustomerFormModal
            customer={editingCustomer}
            onClose={() => {
              setShowFormModal(false);
              setEditingCustomer(null);
            }}
            onSave={handleSaveCustomer}
            isEditing={!!editingCustomer}
          />
        )}

        {showPreviewModal && (
          <PreviewModal
            customer={previewCustomer}
            onClose={() => {
              setShowPreviewModal(false);
              setPreviewCustomer(null);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
} 