import { useInfiniteQuery } from '@tanstack/react-query';
import { messagesApi } from '../api/messagesApi';

export const useChatMessagesQuery = (chatId, pageSize = 20) => {
  return useInfiniteQuery({
    queryKey: ['chatMessages', chatId],
    queryFn: ({ pageParam = 1 }) => messagesApi.getChatMessages(chatId, pageParam, pageSize),
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined;
      const { currentPage, totalPages } = lastPage.data.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!chatId, // Only fetch if there is an active chat selected
  });
};
