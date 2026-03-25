import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '../api/chatApi';

export const useAcceptRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, isAccepted }) => chatApi.acceptRequest(requestId, isAccepted),
    onSuccess: () => {
      // Invalidate the chat requests query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['chatRequests'] });
    },
  });
};

export const useSendRequestMutation = () => {
  return useMutation({
    mutationFn: (toUserId) => chatApi.sendChatRequest(toUserId),
  });
};
