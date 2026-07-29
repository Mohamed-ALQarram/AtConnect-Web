import { create } from 'zustand';

export const useGuestStore = create((set) => ({
  searchQuery: '',
  selectedUser: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  closeProfileModal: () => set({ selectedUser: null }),
}));
