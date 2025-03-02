import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { navigation } from '../../config/navigation';

export const MobileSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  return (
    <div className={`relative z-50 lg:hidden ${isSidebarOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-900/80" onClick={() => setIsSidebarOpen(false)} />

      <div className="fixed inset-0 flex">
        <div className="relative mr-16 flex w-full max-w-xs flex-1">
          <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button type="button" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
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
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`
                              group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                              ${isActive 
                                ? 'bg-gray-50 text-indigo-600' 
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                              }
                            `}
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            <Icon 
                              className={`h-6 w-6 shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`} 
                              aria-hidden="true" 
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}; 