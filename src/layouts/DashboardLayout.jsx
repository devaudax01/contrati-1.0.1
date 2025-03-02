import { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { adminNavigation, employeeNavigation, ownerNavigation, userNavigation, affiliateNavigation, getFilteredNavigation } from '../config/navigation';
import { 
  Menu, 
  LogOut, 
  User, 
  Bell, 
  Settings, 
  ChevronDown, 
  Search,
  Home,
  HelpCircle
} from 'lucide-react';
import { Sidebar } from './DashboardLayout/Sidebar';
import { cn } from '../utils/cn';

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle click outside of menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const getNavigation = () => {
    if (!user) return [];
    
    let navigation;
    switch (user.role) {
      case 'admin':
        navigation = adminNavigation;
        break;
      case 'owner':
        navigation = ownerNavigation;
        break;
      case 'employee':
        navigation = employeeNavigation;
        break;
      case 'user':
        navigation = userNavigation;
        break;
      case 'affiliate':
        navigation = affiliateNavigation;
        break;
      default:
        console.warn('Unknown user role:', user.role);
        return [];
    }

    // Get the user's plan from the user object
    const userPlan = user.plan || 'full'; // Default to 'enterprise' if no plan is set
    
    // Filter navigation based on user's plan and role
    return getFilteredNavigation(navigation, userPlan, user.role);
  };

  const navigation = getNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`;
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, index + 1).join('/'),
      current: index === paths.length - 1
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-600/75 backdrop-blur-sm transition-opacity lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 z-50 w-72 bg-white transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar 
            navigation={navigation}
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}
            user={user}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-72">
          {/* Header/Topbar */}
          <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 lg:left-72 z-30">
            <div className="h-full px-4 lg:px-8 flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Breadcrumbs */}
                <nav className="hidden md:flex items-center space-x-2">
                  <Link to="/" className="text-gray-400 hover:text-gray-500">
                    <Home className="h-4 w-4" />
                  </Link>
                  {getBreadcrumbs().map((item, index) => (
                    <div key={item.href} className="flex items-center">
                      <span className="text-gray-400 mx-2">/</span>
                      <Link
                        to={item.href}
                        className={cn(
                          "text-sm",
                          item.current
                            ? "text-gray-800 font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                </div>

                {/* Help */}
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <HelpCircle className="h-5 w-5" />
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 relative"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Pending Tasks</p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">Vehicle Inspection Due</p>
                          <p className="text-xs text-gray-500">Due in 2 hours</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">Customer Follow-up</p>
                          <p className="text-xs text-gray-500">Due today</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">Update Documentation</p>
                          <p className="text-xs text-gray-500">Due tomorrow</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link
                          to="/employee/tasks"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View All Tasks
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {getInitials()}
                      </span>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 text-gray-500 transition-transform",
                      isUserMenuOpen ? "rotate-180" : ""
                    )} />
                  </button>

                  {/* Dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstname && user?.lastname 
                            ? `${user.firstname} ${user.lastname}`
                            : user?.email || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-16 h-[calc(100vh-4rem)] overflow-auto">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {typeof children === 'function' 
                ? children({ isSidebarOpen, setIsSidebarOpen })
                : children
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};