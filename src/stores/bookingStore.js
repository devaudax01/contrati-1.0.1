import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { mockCustomers, mockVehicles } from '../utils/mockData';

export const useBookingStore = create((set, get) => ({
  bookings: [],
  isLoading: false,
  selectedVehicle: null,
  customerDetails: null,
  customers: [],

  // Set selected vehicle
  setSelectedVehicle: (vehicle) => {
    set({ selectedVehicle: vehicle });
  },

  // Fetch customer details
  fetchCustomerDetails: async (email) => {
    try {
      set({ isLoading: true });
      // Replace with your actual API call
      const response = await fetch(`/api/customers?email=${email}`);
      const data = await response.json();
      
      if (data.success) {
        set({ customerDetails: data.customer });
        return data.customer;
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      toast.error('Failed to fetch customer details');
    } finally {
      set({ isLoading: false });
    }
  },

  // Create booking
  createBooking: async (bookingData) => {
    set({ isLoading: true });
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const booking = {
        id: `B${Date.now()}`,
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      set(state => ({
        bookings: [...(state.bookings || []), booking],
        isLoading: false
      }));

      return booking;
    } catch (error) {
      console.error('Error creating mock booking:', error);
      set({ isLoading: false });
      throw new Error('Failed to create booking');
    }
  },

  setBookings: (bookings) => set({ bookings }),
  
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, booking],
  })),
  
  updateBooking: (id, updatedBooking) => set((state) => ({
    bookings: state.bookings.map((booking) => 
      booking.id === id ? { ...booking, ...updatedBooking } : booking
    ),
  })),
  
  deleteBooking: (id) => set((state) => ({
    bookings: state.bookings.filter((booking) => booking.id !== id),
  })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchCustomers: async () => {
    set({ isLoading: true });
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      // Transform mock customers to match the expected format
      const formattedCustomers = mockCustomers.map(customer => ({
        id: customer.id,
        firstName: customer.name.split(' ')[0],
        lastName: customer.name.split(' ')[1],
        email: customer.email,
        phone: customer.phone,
        licenseNumber: customer.licenseNumber
      }));

      set({ 
        customers: formattedCustomers,
        isLoading: false 
      });
      
      return formattedCustomers;
    } catch (error) {
      console.error('Error loading mock customers:', error);
      set({ 
        customers: [],
        isLoading: false 
      });
      throw error;
    }
  },

  createCustomer: async (customerData) => {
    set({ isLoading: true });
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const currentCustomers = get().customers;
      const newId = currentCustomers.length > 0 
        ? Math.max(...currentCustomers.map(c => c.id)) + 1 
        : 1;

      const newCustomer = {
        id: newId,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        licenseNumber: customerData.licenseNumber
      };

      // Update store with new customer
      set(state => ({
        customers: [...state.customers, newCustomer],
        isLoading: false
      }));

      return newCustomer;
    } catch (error) {
      console.error('Error creating mock customer:', error);
      set({ isLoading: false });
      throw new Error('Failed to create customer');
    }
  },

  fetchVehicleById: async (vehicleId) => {
    set({ isLoading: true });
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const vehicle = mockVehicles.find(v => v.id === parseInt(vehicleId));
      if (vehicle) {
        set({ 
          selectedVehicle: vehicle,
          isLoading: false 
        });
        return { success: true, vehicle };
      } else {
        throw new Error('Vehicle not found');
      }
    } catch (error) {
      console.error('Error loading mock vehicle:', error);
      set({ isLoading: false });
      throw error;
    }
  },
})); 