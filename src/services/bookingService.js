import { mockBookings } from '../utils/mockData';

export const bookingService = {
  getAllBookings: async () => {
    return mockBookings;
  },

  getBookingById: async (id) => {
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  },

  createBooking: async (bookingData) => {
    return {
      ...bookingData,
      id: `B${Date.now()}`,
      createdAt: new Date().toISOString()
    };
  },

  updateBooking: async (id, bookingData) => {
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return { ...booking, ...bookingData };
  },

  deleteBooking: async (id) => {
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return true;
  }
}; 