import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Upload } from 'lucide-react';
import emptyDocImage from '../assets/img/empty.jpg';

export default function CustomerModal({
  customer,
  onClose,
  isEditing,
  isCreating,
  onSave,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [idType, setIdType] = useState('identity'); // 'identity' or 'passport'
  const [documents, setDocuments] = useState({
    idFront: null,
    idBack: null,
    licenseFront: null,
    licenseBack: null
  });

  if (!customer) return null;

  const customerTypes = ["Individual", "Corporate"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedCustomer = {
      ...customer,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      type: formData.get('type'),
      status: formData.get('status'),
      address: formData.get('address'),
      birthDate: formData.get('birthDate'),
      driverLicense: formData.get('driverLicense'),
      licenseIssueDate: formData.get('licenseIssueDate'),
      nationality: formData.get('nationality'),
    };
    onSave(updatedCustomer);
  };

  const handleFileChange = (documentType, file) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const renderBasicInformation = () => (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            defaultValue={customer.name || ''}
            readOnly={!isEditing}
            required
            className={`w-full rounded-lg border ${
              isEditing 
                ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'border-gray-200 bg-gray-50'
            } px-3 py-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Type
          </label>
          {isEditing ? (
            <select
              name="type"
              defaultValue={customer.type}
              required
              className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            >
              {customerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={customer.type || ''}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderIdentityDocuments = () => (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Identity Documents</h4>
      <div className="grid grid-cols-2 gap-4">
        {/* Front of ID/Passport */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {customer.idType === 'identity' ? 'ID Card Front' : 'Passport'}
            </span>
            {!isEditing && (
              <a
                href={customer.documents?.idFront}
                download
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            )}
          </div>
          {isEditing ? (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">Upload front side</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange('idFront', e.target.files[0])}
                />
              </label>
            </div>
          ) : (
            <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
              {customer.documents?.idFront ? (
                <img
                  src={customer.documents.idFront}
                  alt="ID Front"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No image available
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back of ID (only for identity card) */}
        {customer.idType === 'identity' && (
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">ID Card Back</span>
              <a
                href={customer.documents?.idBack}
                download
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </div>
            <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
              {customer.documents?.idBack ? (
                <img
                  src={customer.documents.idBack}
                  alt="ID Back"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No image available
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDriverLicense = () => (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Driver's License</h4>
      <div className="grid grid-cols-2 gap-4">
        {/* Front of License */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">License Front</span>
            <a
              href={customer.documents?.licenseFront}
              download
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
          <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
            {customer.documents?.licenseFront ? (
              <img
                src={customer.documents.licenseFront}
                alt="License Front"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Back of License */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">License Back</span>
            <a
              href={customer.documents?.licenseBack}
              download
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
          <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
            {customer.documents?.licenseBack ? (
              <img
                src={customer.documents.licenseBack}
                alt="License Back"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No image available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactInformation = () => (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            defaultValue={customer.email || ''}
            readOnly={!isEditing}
            required
            className={`w-full rounded-lg border ${
              isEditing 
                ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'border-gray-200 bg-gray-50'
            } px-3 py-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            defaultValue={customer.phone || ''}
            readOnly={!isEditing}
            required
            className={`w-full rounded-lg border ${
              isEditing 
                ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'border-gray-200 bg-gray-50'
            } px-3 py-2`}
          />
        </div>
      </div>
    </div>
  );

  const renderAdditionalInformation = () => (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Additional Information</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            defaultValue={customer.address || ''}
            readOnly={!isEditing}
            required
            rows={3}
            className={`w-full rounded-lg border ${
              isEditing 
                ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'border-gray-200 bg-gray-50'
            } px-3 py-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth*
          </label>
          <input
            name="birthDate"
            type="date"
            defaultValue={customer.birthDate || ''}
            readOnly={!isEditing}
            required
            className={`w-full rounded-lg border ${
              isEditing 
                ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'border-gray-200 bg-gray-50'
            } px-3 py-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          <input
            name="nationality"
            type="text"
            defaultValue={customer.nationality || ''}
            readOnly={!isEditing}
            required
            className={`w-full rounded-lg border ${
              isEditing 
                ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                : 'border-gray-200 bg-gray-50'
            } px-3 py-2`}
          />
        </div>
      </div>
    </div>
  );

  const renderAccountStatus = () => (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Account Status</h4>
      <div className="flex items-center">
        {isEditing ? (
          <select
            name="status"
            defaultValue={customer.status}
            className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
            <option value="blocked">Blocked</option>
          </select>
        ) : (
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
            customer.status === 'active' 
              ? 'bg-green-100 text-green-800'
              : customer.status === 'blocked'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
          </span>
        )}
      </div>
    </div>
  );

  const renderRentalHistory = () => (
    !isCreating && (
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Rental History</h4>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vehicle</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customer.rentalHistory && customer.rentalHistory.length > 0 ? (
                customer.rentalHistory.map((rental) => (
                  <tr key={rental.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                      {rental.vehicleModel}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {rental.startDate}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {rental.endDate}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        rental.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : rental.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {rental.totalAmount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-3 py-4 text-sm text-gray-500 text-center">
                    No rental history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {isCreating ? 'Add Customer' : 'Edit Customer'}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {isCreating
                    ? 'Add a new customer to your system'
                    : 'Edit customer information'}
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                onClick={() => onSave(customer)}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 