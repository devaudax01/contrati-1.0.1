import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuthStore } from '../../stores/authStore';
import { 
  UserCircleIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  BuildingIcon, 
  BadgeCheckIcon,
  CameraIcon,
  SaveIcon,
  EditIcon
} from 'lucide-react';

export const Profile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    department: user?.department || '',
    position: user?.position || '',
  });

  const inputClasses = `
    w-full p-3.5 border border-gray-200 rounded-lg 
    disabled:bg-gray-50 disabled:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 shadow-sm
    ${isEditing ? 'hover:border-blue-300 bg-white' : 'bg-gray-50'}
    placeholder:text-gray-400 text-gray-700
  `;

  const labelClasses = `
    text-sm font-medium text-gray-600 flex items-center gap-2
    transition-colors duration-200 uppercase tracking-wide
    ${isEditing ? 'text-blue-600' : ''}
  `;

  const getInitials = () => {
    const first = formData.firstname?.[0] || '';
    const last = formData.lastname?.[0] || '';
    return first && last ? `${first}${last}` : '?';
  };

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || null);

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Enhanced Header Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="px-8 pb-8 relative">
            <div className="flex items-center justify-between -mt-12">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  {avatarUrl ? (
                    <div className="h-28 w-28 rounded-full border-4 border-white shadow-xl overflow-hidden ring-4 ring-blue-50">
                      <img 
                        src={avatarUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-white shadow-xl ring-4 ring-blue-50">
                      <span className="text-4xl font-medium text-white">
                        {getInitials()}
                      </span>
                    </div>
                  )}
                  
                  {isEditing && (
                    <label className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                      />
                      <div className="flex flex-col items-center">
                        <CameraIcon className="h-8 w-8 text-white mb-1" />
                        <span className="text-white text-xs">Change Photo</span>
                      </div>
                    </label>
                  )}
                </div>
                <div className="pt-12">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {formData.firstname && formData.lastname 
                      ? `${formData.firstname} ${formData.lastname}`
                      : 'User Name'}
                  </h1>
                  <p className="text-gray-500 flex items-center gap-2">
                    <BadgeCheckIcon className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{formData.position || 'Position Not Set'}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`
                  px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium
                  transition-all duration-300 transform hover:scale-105
                  shadow-sm hover:shadow-md
                  ${isEditing 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }
                `}
              >
                {isEditing ? (
                  <>
                    <SaveIcon className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <EditIcon className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-8 pb-4 border-b flex items-center gap-2">
            <UserCircleIcon className="h-6 w-6 text-blue-500" />
            Personal Information
          </h2>
          
          <div className="space-y-8">
            {/* Section groups with visual separation */}
            <div className="space-y-8">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wide">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <UserCircleIcon className="h-4 w-4" />
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstname}
                      onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <UserCircleIcon className="h-4 w-4" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastname}
                      onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wide">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <MailIcon className="h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <PhoneIcon className="h-4 w-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wide">Work Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <BuildingIcon className="h-4 w-4" />
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                      placeholder="Enter your department"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <BadgeCheckIcon className="h-4 w-4" />
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                      placeholder="Enter your position"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wide">Location</h3>
                <div className="space-y-2">
                  <label className={labelClasses}>
                    <MapPinIcon className="h-4 w-4" />
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                    className={`${inputClasses} resize-none`}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 