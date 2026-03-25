import { create } from 'zustand';

export const useMessagesStore = create((set) => ({
  activeChatId: null,
  activeChatUser: { userId: 0, name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John%20Doe', isOnline: true }, // To display header details quickly
  setActiveChat: (chatId, userDetails) => set({
    activeChatId: chatId,
    activeChatUser: userDetails
  }),
}));
