import { useInfiniteQuery } from '@tanstack/react-query';
import { usersApi } from '../api/usersApi';

export const useUsersQuery = (pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => usersApi.getAllUsers(pageParam, pageSize),
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined;
      const { currentPage, totalPages } = lastPage.data.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
