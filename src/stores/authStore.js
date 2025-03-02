import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(credentials);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return data.user;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Failed to login',
            isAuthenticated: false 
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return user;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Failed to get current user',
            isAuthenticated: false
          });
          throw error;
        }
      },

      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await authService.updateProfile(userData);
          set((state) => ({
            user: { ...state.user, ...updatedUser },
            isLoading: false,
            error: null
          }));
          return updatedUser;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Failed to update profile'
          });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
