import { api } from '../../../api/axios';

export const chatApi = {
  getChatRequests: async (page = 1, pageSize = 10) => {
    const response = await api.get(`/api/Chat/ChatRequests?Page=${page}&PageSize=${pageSize}`);
    return response.data;
  },
  acceptRequest: async (requestId, isAccepted) => {
    const response = await api.post('/api/Chat/AcceptRequest', { requestId, isAccepted });
    return response.data;
  },
  sendChatRequest: async (toUserId) => {
    const response = await api.post('/api/Chat/SendChatRequest', { toUserId });
    return response.data;
  }
};
