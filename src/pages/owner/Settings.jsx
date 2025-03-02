import { useState, useEffect } from 'react';
import { 
  Bell, Lock, User, Globe, Palette, Shield, CreditCard,
  LayoutDashboard, PieChart, BarChart3, LineChart, Table, Grid, List
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useSettingsStore } from '../../stores/settingsStore';
import toast from 'react-hot-toast';

export default function Settings() {
  const { 
    profile,
    notifications,
    security,
    dashboardLayout,
    dashboardPreferences,
    updateProfile,
    updateNotifications,
    updateSecurity,
    updateDashboardLayout,
    updateDashboardPreferences
  } = useSettingsStore();

  // Local state for form values
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    email: profile.email || '',
    phone: profile.phone || ''
  });

  // Update local state when store changes
  useEffect(() => {
    setFormData({
      fullName: profile.fullName || '',
      email: profile.email || '',
      phone: profile.phone || ''
    });
  }, [profile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key) => {
    updateNotifications({ [key]: !notifications[key] });
    toast.success(`${key} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`);
  };

  const handleLayoutChange = (type, value) => {
    updateDashboardLayout({ [type]: value });
    toast.success(`Dashboard ${type} updated to ${value}`);
  };

  const handlePreferenceToggle = (key) => {
    updateDashboardPreferences({ [key]: !dashboardPreferences[key] });
    toast.success(`${key.split(/(?=[A-Z])/).join(' ')} ${!dashboardPreferences[key] ? 'enabled' : 'disabled'}`);
  };

  const handleSecurityAction = (action) => {
    if (action === 'password') {
      toast.success('Password change functionality will be implemented soon');
    } else if (action === '2fa') {
      updateSecurity({ twoFactorEnabled: !security.twoFactorEnabled });
      toast.success(`Two-factor authentication ${!security.twoFactorEnabled ? 'enabled' : 'disabled'}`);
    }
  };

  const handleSaveChanges = () => {
    updateProfile(formData);
    toast.success('Settings saved successfully');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 -mx-8 px-8 pt-8 pb-16 -mt-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-indigo-100 mt-2">Manage your account preferences and settings</p>
        </div>

        <div className="relative -mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                  <p className="text-sm text-gray-500">Manage your personal information</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500">Manage your notifications</p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between group">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">{key} Notifications</p>
                      <p className="text-xs text-gray-500">Receive notifications via {key}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationToggle(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-500">Protect your account</p>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => handleSecurityAction('password')}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </button>
                <button
                  onClick={() => handleSecurityAction('2fa')}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {security.twoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Auth
                </button>
              </div>
            </div>

            {/* Dashboard Layout Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Dashboard Layout</h2>
                  <p className="text-sm text-gray-500">Customize your dashboard view</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'grid', icon: Grid },
                      { value: 'list', icon: List },
                      { value: 'compact', icon: Table }
                    ].map(({ value, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleLayoutChange('layout', value)}
                        className={`p-3 border rounded-lg flex flex-col items-center ${
                          dashboardLayout.layout === value 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-5 w-5 mb-1" />
                        <span className="text-xs capitalize">{value}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chart Style</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'modern', icon: LineChart },
                      { value: 'classic', icon: BarChart3 },
                      { value: 'minimal', icon: PieChart }
                    ].map(({ value, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleLayoutChange('chartStyle', value)}
                        className={`p-3 border rounded-lg flex flex-col items-center ${
                          dashboardLayout.chartStyle === value 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-5 w-5 mb-1" />
                        <span className="text-xs capitalize">{value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-pink-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Dashboard Content</h2>
                  <p className="text-sm text-gray-500">Choose what to display</p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(dashboardPreferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between group">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {key.split(/(?=[A-Z])/).join(' ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {`Show ${key.split(/(?=[A-Z])/).join(' ').toLowerCase()} on dashboard`}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handlePreferenceToggle(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSaveChanges}
              type="button"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}