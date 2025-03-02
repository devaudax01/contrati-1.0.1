// Mock data for admin dashboard
const mockCustomers = [
  {
    id: 1,
    businessName: "Photo Studio A",
    ownerName: "John Doe",
    email: "john@photostudioa.com",
    subscription: "Premium",
    status: "Active",
    joinedDate: "2024-01-15"
  },
  {
    id: 2,
    businessName: "Camera Shop B",
    ownerName: "Jane Smith",
    email: "jane@camerashopb.com",
    subscription: "Basic",
    status: "Active",
    joinedDate: "2024-02-01"
  }
];

const mockStats = {
  totalProfit: 127648.00,
  vatLimit: 7648.00,
  monthlyProfit: 7648.00,
  taxesDue: 2491.52,
  totalInvoices: 102,
  unpaidInvoices: 10,
  monthly_income: [3000, 3500, 4000, 3800, 4200, 4500],
  monthly_expenses: [2000, 2300, 2100, 2800, 2600, 2900]
};

const mockUnpaidBills = [
  {
    id: 1,
    date: '2024-03-07',
    company: 'UAB Microsoft',
    invoice_value: 1380.77,
    after_tax: 1247.15
  },
  {
    id: 2,
    date: '2024-03-07',
    company: 'UAB Microsoft',
    invoice_value: 1380.77,
    after_tax: 1247.15
  },
  {
    id: 3,
    date: '2024-03-07',
    company: 'UAB Microsoft',
    invoice_value: 1380.77,
    after_tax: 1247.15
  },
  {
    id: 4,
    date: '2024-03-07',
    company: 'UAB Microsoft',
    invoice_value: 1380.77,
    after_tax: 1247.15
  }
];

const mockSubscriptionPlans = [
  {
    id: '1',
    name: 'Basic',
    price: 349.00,
    duration: '1 month',
    description: 'Pour les petites agences de location',
    features: {
      storage: '500 MO',
      features: [
        'Accès complet à la gestion des contrats',
        'Support client 24/7',
        'Personnalisation des contrats',
        'Téléchargement des documents',
        'Nombre de contrats : Illimité'
      ]
    }
  },
  {
    id: '2',
    name: 'Standard',
    price: 1999.00,
    duration: '6 months',
    description: 'Pour les agences en pleine croissance',
    features: {
      storage: '5 GO',
      features: [
        'Accès complet à la gestion des contrats',
        'Support client prioritaire 24/7',
        'Personnalisation avancée des contrats',
        'Téléchargement des documents',
        'Nombre de contrats : Illimité',
        'Tableau de bord analytique',
        'Suivi des paiements'
      ]
    }
  },
  {
    id: '3',
    name: 'Premium',
    price: 2999.00,
    duration: '12 months',
    description: 'Pour les grandes agences professionnelles',
    features: {
      storage: 'Illimité',
      features: [
        'Accès complet à la gestion des contrats',
        'Support client VIP 24/7',
        'Personnalisation complète des contrats',
        'Téléchargement des documents',
        'Nombre de contrats : Illimité',
        'Tableau de bord analytique avancé',
        'API disponible',
        'Contrôle Technique',
        'Suivi : Vignette, Assurance, Visite Technique',
        'Export des données',
        'Multi-utilisateurs'
      ]
    }
  }
];

// Mock API functions with artificial delay
export const getCustomers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate random errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch customers');
  }

  return {
    success: true,
    data: mockCustomers
  };
};

export const getAdminStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch admin stats');
  }

  return {
    success: true,
    data: mockStats
  };
};

export const getUnpaidBills = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch unpaid bills');
  }

  return {
    success: true,
    data: mockUnpaidBills
  };
};

export const getSubscriptionPlans = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch subscription plans');
  }

  return {
    success: true,
    data: mockSubscriptionPlans
  };
};

export const updateCustomerStatus = async (customerId, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const customer = mockCustomers.find(c => c.id === customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }

  customer.status = status;
  return {
    success: true,
    data: customer
  };
}; 