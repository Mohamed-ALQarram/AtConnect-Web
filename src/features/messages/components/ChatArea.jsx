import { useState, useRef, useEffect } from 'react';
import { Video, Phone, Search, MoreVertical, Plus, Smile, Mic, Send, MessageSquare } from 'lucide-react';
import { useMessagesStore } from '../stores/messagesStore';
import { useChatMessagesQuery } from '../hooks/useChatMessagesQuery';
import { MessageBubble } from './MessageBubble';
import { useChat } from '../hooks/useChat';

export const ChatArea = () => {
  const activeChatId = useMessagesStore((state) => state.activeChatId);
  const activeChatUser = useMessagesStore((state) => state.activeChatUser);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const { messages: newMessages, sendMessage, clearMessages } = useChat();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessagesQuery(activeChatId);

  // Clear new messages when switching chats to prevent duplication
  useEffect(() => {
    if (clearMessages) {
      clearMessages();
    }
  }, [activeChatId]);

  const messages = data?.pages.flatMap(page => page.data?.items || []) || [];

  // Filter new messages to only those belonging to the active chat
  const currentChatNewMessages = (newMessages || []).filter(m => String(m.chatId) === String(activeChatId));

  // Since pagination usually returns latest messages first, we might need to reverse them
  // Assuming the API returns newer messages on page 1, index 0. If so, we reverse to display chronologically.
  // Then we append the new real-time messages at the bottom.
  const displayMessages = [...messages].reverse().concat(currentChatNewMessages);

  // Scroll to bottom when new messages load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages.length]);

  if (!activeChatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-main">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
          <MessageSquare size={32} className="text-muted" />
        </div>
        <h3 className="text-xl font-bold text-main mb-2">Your Messages</h3>
        <p className="text-muted">Select a chat from the sidebar to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-main relative">
      {/* Header */}
      <div className="h-20 border-b border-dark px-6 flex items-center justify-between shrink-0 bg-main/95 backdrop-blur z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={activeChatUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChatId}`}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover bg-card"
            />
            {activeChatUser?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-main rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-main">{activeChatUser?.name || 'User'}</h3>
            <p className="text-xs text-success">{activeChatUser?.isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-muted">
          <button className="hover:text-primary transition-colors"><Video size={20} /></button>
          <button className="hover:text-primary transition-colors"><Phone size={20} /></button>
          <button className="hover:text-primary transition-colors"><Search size={20} /></button>
          <button className="hover:text-primary transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col hide-scrollbar">
        {hasNextPage && (
          <div className="flex justify-center mb-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="text-xs bg-surface text-main py-1 px-3 rounded-full hover:bg-surface/80 transition-colors disabled:opacity-50"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load older messages'}
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex-1 flex justify-center items-center text-muted">Loading messages...</div>
        ) : isError ? (
          <div className="flex-1 flex justify-center items-center text-danger">Failed to load messages.</div>
        ) : displayMessages.length === 0 ? (
          <div className="flex-1 flex justify-center items-center text-muted">No messages yet. Say hi!</div>
        ) : (
          <div className="mt-auto">
            {displayMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 shrink-0 bg-main">
        <div className="bg-surface rounded-full flex items-center px-4 py-2 gap-2">
          <button className="text-muted hover:text-primary transition-colors p-2 shrink-0">
            <Plus size={20} />
          </button>
          <button className="text-muted hover:text-primary transition-colors p-2 shrink-0">
            <Smile size={20} />
          </button>

          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && messageText.trim() !== '') {
                sendMessage(activeChatId, messageText);
                setMessageText('');
              }
            }}
            className="flex-1 bg-transparent text-main placeholder-muted text-sm focus:outline-none px-2"
          />

          {messageText.trim() === '' ? (
            <button className="text-muted hover:text-primary transition-colors p-2 shrink-0">
              <Mic size={20} />
            </button>
          ) : (
            <button className="bg-primary hover:bg-purple-600 text-white rounded-full p-2 shrink-0 transition-colors"
              onClick={() => {
                sendMessage(activeChatId, messageText);
                setMessageText('');
              }}
            >
              <Send size={16} className="ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
