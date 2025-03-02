import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      profile: {
        fullName: '',
        email: '',
        phone: '',
      },
      notifications: {
        email: true,
        push: false,
        sms: true,
        desktop: false,
        updates: true,
        marketing: false,
      },
      security: {
        twoFactorEnabled: false,
      },
      dashboardLayout: {
        layout: 'grid',
        defaultView: 'overview',
        chartStyle: 'modern',
      },
      dashboardPreferences: {
        showRevenueChart: true,
        showBookingsStats: true,
        showCustomerMetrics: true,
        showQuickActions: true,
        compactView: false,
        enableAnimations: true,
      },
      // Actions
      updateProfile: (profile) => 
        set((state) => ({ profile: { ...state.profile, ...profile } })),
      updateNotifications: (notifications) => 
        set((state) => ({ notifications: { ...state.notifications, ...notifications } })),
      updateSecurity: (security) => 
        set((state) => ({ security: { ...state.security, ...security } })),
      updateDashboardLayout: (layout) => 
        set((state) => ({ dashboardLayout: { ...state.dashboardLayout, ...layout } })),
      updateDashboardPreferences: (preferences) => 
        set((state) => ({ dashboardPreferences: { ...state.dashboardPreferences, ...preferences } })),
    }),
    {
      name: 'settings-storage',
    }
  )
); 