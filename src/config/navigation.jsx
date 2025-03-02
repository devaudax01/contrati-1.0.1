import { 
  Home,
  Car,
  Users,
  FileText,
  Settings,
  Calendar,
  BookOpen,
  BarChart
} from 'lucide-react';

export const ownerNavigation = [
  {
    name: 'Dashboard',
    href: '/owner/dashboard',
    icon: Home
  },
  {
    name: 'Bookings',
    href: '/owner/bookings',
    icon: BookOpen
  },
  {
    name: 'Vehicles',
    href: '/owner/vehicles',
    icon: Car
  },
  {
    name: 'Customers',
    href: '/owner/customers',
    icon: Users
  },
  {
    name: 'Reports',
    href: '/owner/reports',
    icon: BarChart
  },
  {
    name: 'Settings',
    href: '/owner/settings',
    icon: Settings
  }
];

// ... other navigation configurations remain the same 