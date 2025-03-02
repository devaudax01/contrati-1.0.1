import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log('User role:', user.role);
      const from = location.state?.from?.pathname || `/${user.role}/dashboard`;
      console.log('Redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      // Navigation is handled by the useEffect above
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'Failed to login');
    }
  };

  // Mock login data for testing
  const handleTestLogin = async (role) => {
    const testAccounts = {
      admin: 'admin@test.com',
      owner: 'owner@test.com',
      employee: 'employee@test.com',
      user: 'user@test.com',
      affiliate: 'affiliate@test.com'
    };

    setEmail(testAccounts[role]);
    setPassword('password');
    
    try {
      await login({ 
        email: testAccounts[role], 
        password: 'password' 
      });
      toast.success('Successfully logged in');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 border-gray-700 rounded bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400 font-medium">
              Forgot password?
            </Link>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        {/* Quick login buttons for testing */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm font-medium mb-3">Quick Login (Testing):</p>
          <div className="space-y-2">
            <button
              onClick={() => handleTestLogin('admin')}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleTestLogin('owner')}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              Login as Owner
            </button>
            <button
              onClick={() => handleTestLogin('employee')}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              Login as Employee
            </button>
            <button
              onClick={() => handleTestLogin('user')}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              Login as User
            </button>
            <button
              onClick={() => handleTestLogin('affiliate')}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              Login as Affiliate
            </button>
          </div>
          <p className="text-xs italic mt-2 text-gray-500 text-center">
            (Any password will work for testing)
          </p>
        </div>
      </div>
    </div>
  );
} 