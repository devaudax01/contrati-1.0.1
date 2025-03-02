import { create } from 'zustand';
import { getAdminStats, getCustomers, getSubscriptionPlans } from '../mockApi/admin';

export const useAdminStore = create((set, get) => ({
  // User state
  user: null,
  
  // Data states
  stats: null,
  businesses: [],
  users: [],
  subscriptions: [],
  plans: [],
  invoices: [],
  notifications: [],
  
  // Loading states
  isLoading: false,
  
  // Actions
  setUser: (user) => set({ user }),
  
  // Fetch actions
  fetchStats: async () => {
    try {
      set({ isLoading: true });
      const response = await getAdminStats();
      if (response.success) {
        set({ stats: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBusinesses: async () => {
    try {
      set({ isLoading: true });
      const response = await getCustomers();
      if (response.success) {
        set({ businesses: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch businesses:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPlans: async () => {
    try {
      set({ isLoading: true });
      const response = await getSubscriptionPlans();
      if (response.success) {
        set({ plans: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Mock data fetchers (replace with real API calls later)
  fetchUsers: async () => {
    try {
      set({ isLoading: true });
      const mockUsers = [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@example.com',
          role: 'admin',
          business: 'Business A',
          created_at: '2024-01-15'
        },
        // Add more mock users...
      ];
      set({ users: mockUsers });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSubscriptions: async () => {
    try {
      set({ isLoading: true });
      const mockSubscriptions = [
        {
          id: 1,
          businessName: 'Auto Rental Pro',
          plan: 'Premium',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          created_at: '2024-01-01',
          amount: '€499.99',
          billingCycle: 'Monthly',
          details: {
            'Billing Contact': 'John Doe',
            'Email': 'john@autorentalpro.com',
            'Payment Method': 'Credit Card',
            'Last Payment': '2024-03-01',
            'Next Payment': '2024-04-01',
            'Auto Renewal': 'Yes'
          }
        },
        // Add more mock subscriptions...
      ];
      set({ subscriptions: mockSubscriptions });
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      const mockNotifications = [
        {
          id: 1,
          type: 'success',
          title: 'New Business Registration',
          message: 'Business "Auto Rental Pro" has completed registration',
          date: '2024-03-07T10:30:00',
          read: false
        },
        // Add more mock notifications...
      ];
      set({ notifications: mockNotifications });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      const mockInvoices = [
        {
          id: 'INV-2024-001',
          businessName: 'Auto Rental Pro',
          amount: '€1,499.99',
          status: 'paid',
          created_at: '2024-03-01',
          dueDate: '2024-03-15',
          paidDate: '2024-03-10',
          details: {
            'Invoice Number': 'INV-2024-001',
            'Payment Method': 'Credit Card',
            'Transaction ID': 'TXN-123456',
            'Billing Contact': 'John Doe',
            'Email': 'john@autorentalpro.com',
            'VAT Number': 'VAT123456789'
          },
          items: [
            { description: 'Premium Subscription - March 2024', amount: '€499.99' },
            { description: 'Additional User Licenses (2)', amount: '€1,000.00' }
          ]
        },
        // Add more mock invoices...
      ];
      set({ invoices: mockInvoices });
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    } finally {
      set({ isLoading: false });
    }
  },
})); 