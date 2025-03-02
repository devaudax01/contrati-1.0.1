import {
  LayoutDashboard,
  Building2,
  Users,
  Car,
  CreditCard,
  Receipt,
  Bell,
  Settings,
  FileText,
  Calendar,
  MessageSquare,
  UserCog,
  Building,
  ShieldCheck,
  CircleDollarSign,
  FileSpreadsheet,
  UserPlus,
  UsersIcon,
  UserCheck,
  Wallet,
  ListTodo,
  FileTextIcon
} from 'lucide-react';

// Helper function to check if a feature is available in the user's plan
const isFeatureAvailable = (feature, userPlan, userRole) => {
  // If plan is 'full', give access to all features
  if (userPlan === 'full') {
    return true;
  }

  const planFeatures = {
    free: {
      admin: ['dashboard', 'businesses', 'plans'],
      owner: ['dashboard', 'customers', 'vehicles'],
      employee: ['dashboard', 'vehicles', 'bookings'],
      affiliate: ['dashboard', 'referrals'],
      user: ['dashboard', 'rentals', 'book']
    },
    basic: {
      admin: ['dashboard', 'businesses', 'plans', 'subscriptions', 'users'],
      owner: ['dashboard', 'customers', 'vehicles', 'bookings', 'documents'],
      employee: ['dashboard', 'vehicles', 'bookings', 'documents', 'messages'],
      affiliate: ['dashboard', 'referrals', 'earnings'],
      user: ['dashboard', 'rentals', 'book', 'payments', 'contracts']
    },
    premium: {
      admin: ['dashboard', 'businesses', 'plans', 'subscriptions', 'notifications', 'users', 'payments', 'referrals', 'settings'],
      owner: ['dashboard', 'customers', 'fleet_management', 'vehicles', 'maintenance', 'bookings', 'business', 'employees', 'finance', 'reports', 'documents', 'referrals', 'settings'],
      employee: ['dashboard', 'vehicles', 'bookings', 'documents', 'messages', 'profile', 'tasks', 'settings'],
      affiliate: ['dashboard', 'referrals', 'earnings', 'affiliate_cars', 'settings'],
      user: ['dashboard', 'rentals', 'book', 'payments', 'contracts', 'messages', 'settings']
    },
    enterprise: {
      admin: ['dashboard', 'businesses', 'plans', 'subscriptions', 'notifications', 'users', 'payments', 'referrals', 'settings', 'advanced_analytics'],
      owner: ['dashboard', 'customers', 'fleet_management', 'vehicles', 'maintenance', 'bookings', 'business', 'employees', 'finance', 'reports', 'documents', 'referrals', 'settings', 'advanced_analytics'],
      employee: ['dashboard', 'vehicles', 'bookings', 'documents', 'messages', 'profile', 'tasks', 'settings', 'advanced_analytics'],
      affiliate: ['dashboard', 'referrals', 'earnings', 'affiliate_cars', 'settings', 'advanced_analytics'],
      user: ['dashboard', 'rentals', 'book', 'payments', 'contracts', 'messages', 'settings', 'advanced_analytics']
    }
  };

  // Check if the feature is available for the user's role in their plan
  return planFeatures[userPlan]?.[userRole]?.includes(feature) || false;
};

// Helper function to check if a navigation item is active based on path and plan
export const isNavItemActive = (item, pathname, userPlan, userRole) => {
  // Check if the item is available in the user's plan
  const isAvailable = isFeatureAvailable(item.feature || item.name.toLowerCase(), userPlan, userRole);
  
  // If the item is not available in the plan, it's not active
  if (!isAvailable) return false;
  
  // Check if the current path matches
  if (item.href === pathname) return true;
  
  // Check children items if they exist
  if (item.children) {
    return item.children.some(child => isNavItemActive(child, pathname, userPlan, userRole));
  }
  
  return false;
};

export const adminNavigation = [
  { 
    name: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard,
    feature: 'dashboard',
    isActive: true
  },
  { 
    name: 'Businesses', 
    href: '/admin/businesses', 
    icon: Building2,
    feature: 'businesses',
    isActive: true
  },
  { 
    name: 'Plans', 
    href: '/admin/plans', 
    icon: FileSpreadsheet,
    feature: 'plans',
    isActive: true
    
  },
  { 
    name: 'Subscriptions', 
    href: '/admin/subscriptions', 
    icon: FileSpreadsheet 
  },
  { 
    name: 'Notifications', 
    href: '/admin/notifications', 
    icon: Bell 
  },
  { 
    name: 'Users', 
    href: '/admin/users', 
    icon: Users 
  },
  { 
    name: 'Payments', 
    href: '/admin/payments', 
    icon: CircleDollarSign 
  },
  { 
    name: 'Referrals', 
    href: '/admin/referrals', 
    icon: Users 
  },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: Settings 
  }
];

export const employeeNavigation = [
  { 
    name: 'Dashboard', 
    href: '/employee/dashboard', 
    icon: LayoutDashboard,
    feature: 'dashboard'
  },
  { 
    name: 'Vehicles', 
    href: '/employee/vehicles', 
    icon: Car,
    feature: 'vehicles'
  },
  { 
    name: 'Bookings', 
    href: '/employee/bookings', 
    icon: Calendar 
  },
  { 
    name: 'Documents', 
    href: '/employee/documents', 
    icon: FileText 
  },
  { 
    name: 'Messages', 
    href: '/employee/messages', 
    icon: MessageSquare 
  },
  { 
    name: 'Profile', 
    href: '/employee/profile', 
    icon: UserCog 
  },
  { 
    name: 'Tasks', 
    href: '/employee/tasks', 
    icon: ListTodo 
  },
  { 
    name: 'settings', 
    href: '/employee/settings', 
    icon: Settings 
  }

];

export const ownerNavigation = [
  { 
    name: 'Dashboard', 
    href: '/owner/dashboard', 
    icon: LayoutDashboard,
    feature: 'dashboard',
    isActive: true
  },
  { 
    name: 'Customers', 
    href: '/owner/customers', 
    icon: UsersIcon,
    feature: 'customers'
  },
  {
    name: 'Fleet Management',
    icon: Car,
    feature: 'fleet_management',
    isActive: true,
    children: [
      {
        name: 'All Vehicles',
        href: '/owner/fleet',
        icon: Car,
        feature: 'vehicles',
        isActive: true
      },
      {
        name: 'Maintenance',
        href: '/owner/fleet/maintenance',
        icon: Settings,
        feature: 'maintenance',
        isActive: true
      }
    ]
  },
  { 
    name: 'Bookings', 
    href: '/owner/bookings', 
    icon: Calendar 
  },
  {
    name: 'Business',
    icon: Building,
    children: [
      {
        name: 'Profile',
        href: '/owner/businessProfile',
        icon: Building
      },
      {
        name: 'Employees',
        href: '/owner/employees',
        icon: Users
      }
    ]
  },
  {
    name: 'Finance',
    icon: Wallet,
    children: [
      {
        name: 'Reports',
        href: '/owner/reports',
        icon: FileSpreadsheet
      }
    ]
  },
  {
    name: 'Documents',
    href: '/owner/documents',
    icon: FileTextIcon
  },
  { 
    name: 'Referrals', 
    href: '/owner/referrals', 
    icon: Users 
  },
  { 
    name: 'Settings', 
    href: '/owner/settings', 
    icon: Settings 
  }
];

export const affiliateNavigation = [
  {
    name: 'Dashboard',
    href: '/affiliate/dashboard',
    icon: LayoutDashboard,
    feature: 'dashboard'
  },
  {
    name: 'Referrals',
    href: '/affiliate/referrals',
    icon: Users,
    feature: 'referrals'
  },
  {
    name: 'Earnings',
    href: '/affiliate/earnings',
    icon: Users,
    feature: 'earnings'
  },
  {
    name: 'Affiliate Cars',
    href: '/affiliate/affiliateCar',
    icon: Car,
    feature: 'affiliate_cars'
  },
  {
    name: 'Settings',
    href: '/affiliate/settings',
    icon: Settings,
    feature: 'settings'
  }
];

export const userNavigation = [
  {
    name: 'Dashboard',
    href: '/user/dashboard',
    icon: LayoutDashboard,
    feature: 'dashboard'
  },
  {
    name: 'My Rentals',
    href: '/user/rentals',
    icon: Car,
    feature: 'rentals'
  },
  {
    name: 'Book a Car',
    href: '/user/book',
    icon: Calendar
  },
  {
    name: 'Payments',
    href: '/user/payments',
    icon: CreditCard
  },
  {
    name: 'Contracts',
    href: '/user/contracts',
    icon: FileText
  },
  {
    name: 'Messages',
    href: '/user/messages',
    icon: MessageSquare
  },
  {
    name: 'Settings',
    href: '/user/settings',
    icon: Settings
  }
];

// Function to get filtered navigation based on user's plan
export const getFilteredNavigation = (navigation, userPlan, userRole) => {
  // Return full navigation for admin and affiliate roles
  if (navigation === adminNavigation || navigation === affiliateNavigation) {
    return navigation;
  }

  // For other roles, filter based on plan
  return navigation.filter(item => {
    // Check if the item is available in the user's plan
    const isAvailable = isFeatureAvailable(item.feature || item.name.toLowerCase(), userPlan, userRole);
    
    // If the item has children, filter them as well
    if (item.children) {
      item.children = item.children.filter(child => 
        isFeatureAvailable(child.feature || child.name.toLowerCase(), userPlan, userRole)
      );
    }
    
    return isAvailable;
  });
}; 