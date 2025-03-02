import { mockCustomers, mockEmployees, mockAffiliates } from '../utils/mockData';

export const authService = {
  login: async (credentials) => {
    // Add test accounts to match LoginPage
    const testAccounts = {
      'admin@test.com': { ...mockEmployees[0], role: 'admin' },
      'owner@test.com': { ...mockEmployees[1], role: 'owner' },
      'employee@test.com': { ...mockEmployees[1], role: 'employee' },
      'user@test.com': { ...mockCustomers[0], role: 'user' },
      'affiliate@test.com': { ...mockAffiliates[0], role: 'affiliate' }
    };

    const user = testAccounts[credentials.email];
    
    if (user && credentials.password === 'password') {
      return { user, token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
   
  },

  logout: async () => {
    return true;
  },

  getCurrentUser: async () => {
    return mockCustomers[0];
  },

  updateProfile: async (userData) => {
    return { ...mockCustomers[0], ...userData };
  },
}; 