import { Check, CheckCheck } from 'lucide-react';
import { useMessagesStore } from '../stores/messagesStore';

export const MessageBubble = ({ message }) => {
  const activeChatUser = useMessagesStore((state) => state.activeChatUser);

  // If senderId matches activeChatId, it's from the other person
  const isReceived = String(message.senderId) === String(activeChatUser?.userId);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderStatus = () => {
    if (isReceived) return null;

    switch (message.status) {
      case 'Sent':
        // Single checkmark for sent
        return <Check size={14} className="text-muted ml-1" />;
      case 'Delivered':
        // Double checkmark for delivered
        return <CheckCheck size={14} className="text-muted ml-1" />;
      case 'Seen':
        // Colored double checkmark for seen
        return <CheckCheck size={14} className="text-[#3b82f6] ml-1" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex w-full mb-6 ${isReceived ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[70%] gap-3 ${isReceived ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Avatar for received messages */}
        {isReceived && (
          <img
            src={activeChatUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${0}`}
            alt="User avatar"
            className="w-8 h-8 rounded-full flex-shrink-0 mt-auto hidden sm:block bg-card"
          />
        )}

        <div className={`flex flex-col min-w-0 max-w-full ${isReceived ? 'items-start' : 'items-end'}`}>
          <div
            className={`p-4 rounded-t-2xl text-sm whitespace-pre-wrap break-all ${isReceived
              ? 'bg-surface text-main rounded-br-2xl'
              : 'bg-primary text-white rounded-bl-2xl'
              }`}
          >
            {message.content}
          </div>

          <div className="flex items-center mt-1 text-[10px] text-muted">
            {formatTime(message.sentAt)}
            {renderStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};
