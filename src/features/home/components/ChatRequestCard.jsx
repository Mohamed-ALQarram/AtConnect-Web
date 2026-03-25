import { Check, X } from 'lucide-react';
import { useAcceptRequestMutation } from '../hooks/useChatMutations';

export const ChatRequestCard = ({ request }) => {
  const acceptMutation = useAcceptRequestMutation();

  const handleAction = (isAccepted) => {
    acceptMutation.mutate({ requestId: request.requestId, isAccepted });
  };

  return (
    <div className="min-w-[320px] bg-card rounded-2xl p-4 flex items-center gap-4">
      <img
        src={request.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.senderName}`}
        alt={request.senderName}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-main text-sm">{request.senderName}</h3>
        <p className="text-xs text-muted mb-3 break-words">Wants to connect with you</p>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleAction(true)}
            disabled={acceptMutation.isPending}
            className="flex-1 flex items-center justify-center gap-1 bg-primary hover:bg-purple-600 text-white text-xs py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            <Check size={14} /> Accept
          </button>
          <button 
            onClick={() => handleAction(false)}
            disabled={acceptMutation.isPending}
            className="flex-1 flex items-center justify-center gap-1 bg-surface hover:bg-gray-700 text-main text-xs py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={14} /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};
