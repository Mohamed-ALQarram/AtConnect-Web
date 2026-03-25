import { useInfiniteQuery } from '@tanstack/react-query';
import { messagesApi } from '../api/messagesApi';

export const useUserChatsQuery = (pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ['userChats'],
    queryFn: ({ pageParam = 1 }) => messagesApi.getUserChats(pageParam, pageSize),
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined;
      const { currentPage, totalPages } = lastPage.data.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
