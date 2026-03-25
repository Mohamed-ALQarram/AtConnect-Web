import { useChatRequestsQuery } from '../hooks/useChatRequestsQuery';
import { ChatRequestCard } from './ChatRequestCard';

export const ChatRequestsSection = () => {
  const { data, isLoading, isError } = useChatRequestsQuery(1, 10);

  if (isLoading) {
    return (
      <div className="mb-10 animate-pulse">
        <div className="h-6 w-48 bg-surface rounded mb-4"></div>
        <div className="flex gap-4 overflow-hidden">
          <div className="min-w-[320px] h-28 bg-card rounded-2xl"></div>
          <div className="min-w-[320px] h-28 bg-card rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-danger mb-10">Failed to load chat requests.</div>;
  }

  // Response wrapper format: { data: { items: [], metadata: {} } }
  const requests = data?.data?.items || [];
  const totalCount = data?.data?.metadata?.totalCount || 0;

  if (requests.length === 0) {
    return null; // Don't show the section if there are no requests
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-main">Chat Requests</h2>
          <span className="bg-primary px-2.5 py-0.5 rounded-full text-xs font-semibold text-white">
            {totalCount}
          </span>
        </div>
        <button className="text-primary text-sm font-semibold hover:text-purple-400 transition-colors">
          View all
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
        {requests.map((request) => (
          <div key={request.requestId} className="snap-start">
            <ChatRequestCard request={request} />
          </div>
        ))}
      </div>
    </div>
  );
};
