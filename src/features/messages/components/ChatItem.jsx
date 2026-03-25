import { useMessagesStore } from '../stores/messagesStore';

export const ChatItem = ({ chat }) => {
  const { activeChatId, setActiveChat } = useMessagesStore();
  const isActive = activeChatId === chat.chatId;

  const handleSelect = () => {
    setActiveChat(chat.chatId, {
      userId: chat.otherUserId,
      name: chat.otherUserName || 'User', // You might need to adjust based on exact API response mappings
      avatar: chat.avatarURL,
      isOnline: chat.isActive
    });
  };

  // Format the date (simple example)
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return 'Yesterday'; // Simplified for the example UI
  };

  return (
    <div
      onClick={handleSelect}
      className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-colors ${isActive ? 'bg-surface border border-primary/20' : 'hover:bg-surface/50'}`}
    >
      <div className="relative">
        <img
          src={chat.avatarURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.otherUserId}`}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover bg-card"
        />
        {chat.isActive && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-main"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className="font-semibold text-main text-sm truncate pr-2">{chat.otherUserName || 'User'}</h4>
          <span className="text-xs text-muted flex-shrink-0">{formatTime(chat.mostRecentMessageSentAt)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted truncate pr-2">
            {chat.mostRecentMessageContent || 'No messages yet'}
          </p>
          {chat.unreadMessageCount > 0 && (
            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
          )}
        </div>
      </div>
    </div>
  );
};
