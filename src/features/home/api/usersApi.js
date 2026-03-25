import { api } from '../../../api/axios';

export const usersApi = {
  getAllUsers: async (page = 1, pageSize = 10) => {
    const response = await api.get(`/api/User/AllUsers?Page=${page}&PageSize=${pageSize}`);
    return response.data;
  },
};
