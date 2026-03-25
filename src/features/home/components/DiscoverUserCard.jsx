import { MapPin } from 'lucide-react';
import { useSendRequestMutation } from '../hooks/useChatMutations';

export const DiscoverUserCard = ({ user }) => {
  const sendMutation = useSendRequestMutation();

  const handleSendRequest = () => {
    sendMutation.mutate(user.id);
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg flex flex-col relative group">
      {/* Online indicator dot example - conditionally rendered */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-card ${user.isActive ? 'bg-success' : 'bg-muted'}`}></div>
      
      <div className="h-48 w-full bg-surface">
        <img
          src={user.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`}
          alt={user.fullName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-main">{user.fullName}</h3>
        <div className="flex items-center text-muted text-xs mt-1 mb-4">
          <MapPin size={12} className="mr-1" />
          <span>{/* Fake location for design */ 'San Francisco, CA'}</span>
        </div>
        
        <div className="mt-auto">
          <button 
            onClick={handleSendRequest}
            disabled={sendMutation.isPending || user.chatRequest !== null}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors
              bg-surface hover:bg-opacity-80 text-primary border border-primary/20
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {user.chatRequest ? 'Request Sent' : 'Send Request'}
          </button>
        </div>
      </div>
    </div>
  );
};
