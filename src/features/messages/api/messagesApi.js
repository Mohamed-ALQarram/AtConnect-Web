import { api } from '../../../api/axios';

export const messagesApi = {
  getUserChats: async (page = 1, pageSize = 10) => {
    const response = await api.get(`/api/Chat/UserChats?Page=${page}&PageSize=${pageSize}`);
    return response.data;
  },
  getChatMessages: async (chatId, page = 1, pageSize = 20) => {
    const response = await api.get(`/api/Chat/ChatMessages?ChatId=${chatId}&Page=${page}&PageSize=${pageSize}`);
    return response.data;
  }
};
