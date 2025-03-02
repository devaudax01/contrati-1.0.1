import { mockVehicles } from '../utils/mockData';

export const vehicleService = {
  getAllVehicles: async () => {
    return mockVehicles;
  },

  getVehicleById: async (id) => {
    const vehicle = mockVehicles.find(v => v.id === id);
    if (!vehicle) throw new Error('Vehicle not found');
    return vehicle;
  },

  createVehicle: async (vehicleData) => {
    return {
      ...vehicleData,
      id: mockVehicles.length + 1,
      status: 'available'
    };
  },

  updateVehicle: async (id, vehicleData) => {
    const vehicle = mockVehicles.find(v => v.id === id);
    if (!vehicle) throw new Error('Vehicle not found');
    return { ...vehicle, ...vehicleData };
  },

  deleteVehicle: async (id) => {
    const vehicle = mockVehicles.find(v => v.id === id);
    if (!vehicle) throw new Error('Vehicle not found');
    return true;
  }
}; 