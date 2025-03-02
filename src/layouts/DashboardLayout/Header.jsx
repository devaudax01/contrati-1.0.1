import React from 'react';
import { Menu, LogOut } from 'lucide-react';

export const Header = ({ setIsSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {user.role} Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="lg:hidden">
            <button
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 