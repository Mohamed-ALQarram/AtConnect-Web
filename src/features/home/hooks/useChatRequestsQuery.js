import { useQuery } from '@tanstack/react-query';
import { chatApi } from '../api/chatApi';

export const useChatRequestsQuery = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['chatRequests', page, pageSize],
    queryFn: () => chatApi.getChatRequests(page, pageSize),
  });
};
