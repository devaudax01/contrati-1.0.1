import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Car,
  FileText,
  Settings,
  Wallet,
  Building2,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/owner/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Customers',
      href: '/owner/customers',
      icon: Users,
    },
    {
      name: 'Vehicles',
      href: '/owner/vehicles',
      icon: Car,
    },
    {
      name: 'Bookings',
      href: '/owner/bookings',
      icon: FileText,
    },
    {
      name: 'Business Profile',
      href: '/owner/business-profile',
      icon: Building2,
    },
    {
      name: 'Finances',
      href: '/owner/finances',
      icon: Wallet,
    },
    {
      name: 'Settings',
      href: '/owner/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-shrink-0 items-center px-4 py-3">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold mx-2
                        ${location.pathname === item.href
                          ? 'bg-gray-50 text-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${
                          location.pathname === item.href
                            ? 'text-blue-600'
                            : 'text-gray-400 group-hover:text-blue-600'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;