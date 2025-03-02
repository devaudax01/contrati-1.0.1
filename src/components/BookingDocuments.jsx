import { Upload } from 'lucide-react';

export const BookingDocuments = ({ documents, onDocumentChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Required Documents</h3>
          <p className="text-sm text-gray-500 mt-1">Please upload clear photos of all required documents</p>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          4 files needed
        </div>
      </div>
      
      {/* Driver's License Group */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Driver's License</h4>
          <span className="text-xs font-medium text-red-600">Both sides required</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Front Side
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                required
                accept=".jpg,.jpeg,.png"
                onChange={(e) => onDocumentChange('licenseFront', e.target.files[0])}
                className="hidden"
                id="license-front-upload"
              />
              <label
                htmlFor="license-front-upload"
                className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2 border"
              >
                <Upload size={18} />
                Upload Front
              </label>
              {documents.licenseFront && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  Uploaded
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Back Side
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                required
                accept=".jpg,.jpeg,.png"
                onChange={(e) => onDocumentChange('licenseBack', e.target.files[0])}
                className="hidden"
                id="license-back-upload"
              />
              <label
                htmlFor="license-back-upload"
                className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2 border"
              >
                <Upload size={18} />
                Upload Back
              </label>
              {documents.licenseBack && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  Uploaded
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ID Card Section */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">ID Card</h4>
          <span className="text-xs font-medium text-red-600">Both sides required</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Front Side
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                required
                accept=".jpg,.jpeg,.png"
                onChange={(e) => onDocumentChange('idCardFront', e.target.files[0])}
                className="hidden"
                id="id-front-upload"
              />
              <label
                htmlFor="id-front-upload"
                className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2 border"
              >
                <Upload size={18} />
                Upload Front
              </label>
              {documents.idCardFront && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  Uploaded
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Back Side
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                required
                accept=".jpg,.jpeg,.png"
                onChange={(e) => onDocumentChange('idCardBack', e.target.files[0])}
                className="hidden"
                id="id-back-upload"
              />
              <label
                htmlFor="id-back-upload"
                className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2 border"
              >
                <Upload size={18} />
                Upload Back
              </label>
              {documents.idCardBack && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  Uploaded
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 