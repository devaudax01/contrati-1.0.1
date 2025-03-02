// Mock Vehicles
export const mockVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    color: 'Silver',
    licensePlate: 'ABC123',
    status: 'available',
    dailyRate: 75,
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    category: 'Sedan',
    features: ['Bluetooth', 'Backup Camera', 'Cruise Control'],
    images: [
      'https://example.com/camry1.jpg',
      'https://example.com/camry2.jpg'
    ],
    location: 'Main Branch'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    color: 'Blue',
    licensePlate: 'XYZ789',
    status: 'available',
    dailyRate: 85,
    mileage: 22000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    category: 'SUV',
    features: ['AWD', 'Apple CarPlay', 'Sunroof'],
    images: [
      'https://example.com/crv1.jpg',
      'https://example.com/crv2.jpg'
    ],
    location: 'Downtown Branch'
  },
  {
    id: 3,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    color: 'White',
    licensePlate: 'EV1234',
    status: 'rented',
    dailyRate: 120,
    mileage: 8000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    category: 'Electric',
    features: ['Autopilot', 'Premium Sound', 'Glass Roof'],
    images: [
      'https://example.com/tesla1.jpg',
      'https://example.com/tesla2.jpg'
    ],
    location: 'Airport Branch'
  }
];

// Mock Customers
export const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    licenseNumber: 'DL123456',
    status: 'active',
    rentals: [
      {
        id: 'R1001',
        vehicleId: 1,
        startDate: '2024-03-01',
        endDate: '2024-03-03',
        status: 'completed'
      }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '098-765-4321',
    licenseNumber: 'DL789012',
    status: 'active',
    rentals: [
      {
        id: 'R1002',
        vehicleId: 2,
        startDate: '2024-03-10',
        endDate: '2024-03-15',
        status: 'active'
      }
    ]
  }
];

// Mock Bookings
export const mockBookings = [
  {
    id: 'B1001',
    customerId: 1,
    vehicleId: 1,
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'confirmed',
    totalAmount: 150,
    paymentStatus: 'paid',
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: 'B1002',
    customerId: 2,
    vehicleId: 3,
    startDate: '2024-03-25',
    endDate: '2024-03-28',
    status: 'pending',
    totalAmount: 360,
    paymentStatus: 'pending',
    createdAt: '2024-03-16T14:20:00Z'
  }
];
export const mockAffiliates = [
  {
    id: 1,
    name: 'Affiliate 1',
    email: 'affiliate1@example.com',  
    phone: '123-456-7890',
    status: 'active',
    commissionRate: 10,
    totalEarnings: 1000,
    recentPayments: [
      { 
        id: 'P1001',
        amount: 500,
        date: '2024-03-15'
      }
    ]
  }
];

// Mock Employees
export const mockEmployees = [
  {
    id: 1,
    name: 'Mike Johnson',
    email: 'mike.j@company.com',
    phone: '555-0123',
    role: 'Manager',
    department: 'Operations',
    status: 'active',
    hireDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.w@company.com',
    phone: '555-0124',
    role: 'Sales Representative',
    department: 'Sales',
    status: 'active',
    hireDate: '2023-03-01'
  }
];

// Mock Locations
export const mockLocations = [
  {
    id: 1,
    name: 'Main Branch',
    address: '123 Main St, City, State 12345',
    phone: '555-1111',
    email: 'main@rentalcompany.com',
    hours: '9:00 AM - 6:00 PM'
  },
  {
    id: 2,
    name: 'Downtown Branch',
    address: '456 Downtown Ave, City, State 12345',
    phone: '555-2222',
    email: 'downtown@rentalcompany.com',
    hours: '8:00 AM - 8:00 PM'
  },
  {
    id: 3,
    name: 'Airport Branch',
    address: '789 Airport Rd, City, State 12345',
    phone: '555-3333',
    email: 'airport@rentalcompany.com',
    hours: '7:00 AM - 10:00 PM'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats = {
  totalCustomers: 150,
  totalVehicles: 45,
  activeRentals: 12,
  monthlyRevenue: 25000,
  recentActivities: [
    {
      id: 1,
      type: 'booking',
      description: 'New booking by John Doe',
      timestamp: '2024-03-16T15:30:00Z'
    },
    {
      id: 2,
      type: 'return',
      description: 'Vehicle returned by Jane Smith',
      timestamp: '2024-03-16T14:20:00Z'
    },
    {
      id: 3,
      type: 'maintenance',
      description: 'Vehicle #123 scheduled for maintenance',
      timestamp: '2024-03-16T12:00:00Z'
    }
  ],
  vehicleStats: {
    available: 30,
    rented: 12,
    maintenance: 3
  },
  revenueData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [15000, 18000, 22000, 20000, 25000, 23000]
  }
};

// Mock Settings
export const mockSettings = {
  company: {
    name: 'Car Rental Company',
    email: 'contact@rentalcompany.com',
    phone: '1-800-RENTAL',
    address: '123 Business Ave, City, State 12345',
    website: 'www.rentalcompany.com'
  },
  businessHours: {
    weekday: '9:00 AM - 6:00 PM',
    weekend: '10:00 AM - 4:00 PM'
  },
  policies: {
    minimumAge: 21,
    requiredDocuments: ['Valid Driver License', 'Credit Card', 'Proof of Insurance'],
    cancellationPolicy: '24 hours notice required for full refund',
    insuranceOptions: ['Basic', 'Premium', 'Full Coverage']
  }
}; 