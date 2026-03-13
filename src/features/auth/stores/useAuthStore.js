import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand store to keep user info, accessToken, and refreshToken
export const useAuthStore = create(
  // The persist middleware saves the store to localStorage automatically
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      
      // Action to set user and tokens after login/verification
      setCredentials: (user, accessToken, refreshToken) => set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true
      }),
      
      // Action to clear store on logout or refresh failure
      clearCredentials: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      })
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
    }
  )
);
