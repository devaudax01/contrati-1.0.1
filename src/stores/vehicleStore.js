import { create } from 'zustand';
import { vehicleService } from '../services/vehicleService';

export const useVehicleStore = create((set, get) => ({
  vehicles: [],
  selectedVehicle: null,
  isLoading: false,
  error: null,

  fetchVehicles: async () => {
    set({ isLoading: true, error: null });
    try {
      const vehicles = await vehicleService.getAllVehicles();
      set({ vehicles, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchVehicleById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const vehicle = await vehicleService.getVehicleById(id);
      set({ selectedVehicle: vehicle, isLoading: false });
      return vehicle;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  createVehicle: async (vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      const newVehicle = await vehicleService.createVehicle(vehicleData);
      set((state) => ({
        vehicles: [...state.vehicles, newVehicle],
        isLoading: false,
      }));
      return newVehicle;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateVehicle: async (id, vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedVehicle = await vehicleService.updateVehicle(id, vehicleData);
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === id ? updatedVehicle : vehicle
        ),
        selectedVehicle: updatedVehicle,
        isLoading: false,
      }));
      return updatedVehicle;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteVehicle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await vehicleService.deleteVehicle(id);
      set((state) => ({
        vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
})); 