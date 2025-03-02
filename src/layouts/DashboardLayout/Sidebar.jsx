import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { cn } from '../../utils/cn';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { isNavItemActive } from '../../config/navigation';

export const Sidebar = ({ navigation, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({});
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  // Auto expand menu based on current path
  useEffect(() => {
    if (navigation) {
      const currentPath = location.pathname;
      navigation.forEach(item => {
        if (item.children && isNavItemActive(item, currentPath)) {
          setExpandedItems(prev => ({
            ...prev,
            [item.name]: true
          }));
        }
      });
    }
  }, [location.pathname, navigation]);

  const toggleSubNav = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const getInitials = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`;
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderNavItem = (item) => {
    // If item is disabled, add visual indication and prevent navigation
    const isDisabled = item.isActive === false;
    
    if (item.children) {
      return (
        <div key={item.name} className="mb-2">
          <button
            onClick={() => !isDisabled && toggleSubNav(item.name)}
            disabled={isDisabled}
            className={cn(
              "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
              isDisabled && "opacity-50 cursor-not-allowed",
              isNavItemActive(item, location.pathname)
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <div className="flex items-center">
              {item.icon && (
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                    isDisabled ? "text-gray-400" :
                    isNavItemActive(item, location.pathname)
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-blue-600"
                  )}
                />
              )}
              <span className={cn(isDisabled && "text-gray-400")}>
                {item.name}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                expandedItems[item.name] ? "rotate-180" : ""
              )}
            />
          </button>
          
          {expandedItems[item.name] && !isDisabled && (
            <div className="ml-8 mt-2 space-y-1 border-l-2 border-gray-200">
              {item.children.map((child) => renderNavItem(child))}
            </div>
          )}
        </div>
      );
    }

    // Regular menu item
    const LinkComponent = isDisabled ? 'div' : Link;
    return (
      <LinkComponent
        key={item.name}
        to={!isDisabled ? item.href : undefined}
        className={cn(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
          isDisabled && "opacity-50 cursor-not-allowed",
          location.pathname === item.href
            ? "bg-gray-200 text-gray-900"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        {item.icon && (
          <item.icon
            className={cn(
              "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
              isDisabled ? "text-gray-400" :
              location.pathname === item.href
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-blue-600"
            )}
          />
        )}
        <span className={cn(isDisabled && "text-gray-400")}>
          {item.name}
        </span>
      </LinkComponent>
    );
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 bg-white text-gray-600 transform transition-all duration-300 ease-in-out",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0 shadow-lg"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo section */}
        <div className="flex items-center justify-between h-16 px-6 bg-gray-50 border-b border-gray-200">
          <Logo className="h-8 w-auto" />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto bg-gray-50">
          {navigation?.map(item => renderNavItem(item))}
        </nav>

        {/* User section */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {getInitials()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstname && user?.lastname 
                    ? `${user.firstname} ${user.lastname}`
                    : user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Role'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 