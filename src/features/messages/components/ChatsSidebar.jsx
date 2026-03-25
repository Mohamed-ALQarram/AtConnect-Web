import { Search, Plus } from 'lucide-react';
import { useUserChatsQuery } from '../hooks/useUserChatsQuery';
import { ChatItem } from './ChatItem';
import { useState } from 'react';

export const ChatsSidebar = () => {
  const { data, isLoading, isError } = useUserChatsQuery(20);
  const [searchQuery, setSearchQuery] = useState('');

  const chats = data?.pages.flatMap(page => page.data?.items || []) || [];

  const filteredChats = chats.filter(chat =>
    (chat.otherUserName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-dark flex flex-col h-screen">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-main">My Chats</h2>
          <button className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/30 transition-colors">
            <Plus size={18} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface text-sm text-main placeholder-muted rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 hide-scrollbar">
        {isLoading && <div className="text-muted text-center mt-10">Loading chats...</div>}
        {isError && <div className="text-danger text-center mt-10">Failed to load chats.</div>}

        {!isLoading && !isError && filteredChats.length === 0 && (
          <div className="text-muted text-center mt-10 text-sm">No conversations found.</div>
        )}

        {filteredChats.map(chat => (
          <ChatItem key={chat.chatId} chat={chat} />
        ))}
      </div>
    </div>
  );
};
