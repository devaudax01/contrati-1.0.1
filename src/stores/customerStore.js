import { create } from 'zustand';

export const useCustomerStore = create((set) => ({
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,

  setCustomers: (customers) => set({ customers }),
  
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  
  addCustomer: (customer) => set((state) => ({
    customers: [...state.customers, customer],
  })),
  
  updateCustomer: (id, updatedCustomer) => set((state) => ({
    customers: state.customers.map((customer) => 
      customer.id === id ? { ...customer, ...updatedCustomer } : customer
    ),
  })),
  
  deleteCustomer: (id) => set((state) => ({
    customers: state.customers.filter((customer) => customer.id !== id),
  })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})); 