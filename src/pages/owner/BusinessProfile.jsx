import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Building2, Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';

export default function BusinessProfile() {
  const [businessData] = useState({
    name: "AutoRent Services",
    email: "contact@autorent.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, City, State 12345",
    website: "www.autorent.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    description: "Leading vehicle rental service provider with a commitment to quality and customer satisfaction.",
    yearEstablished: "2020",
    registrationNumber: "BRN123456789"
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Business Profile</h1>
              <p className="text-gray-500 mt-1">Manage your business information</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Info Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Business Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{businessData.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{businessData.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{businessData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{businessData.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-medium">{businessData.website}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Business Hours</p>
                    <p className="font-medium">{businessData.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Year Established</p>
                  <p className="font-medium">{businessData.yearEstablished}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">{businessData.registrationNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {businessData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 