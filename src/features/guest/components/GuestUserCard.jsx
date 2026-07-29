import React from 'react';
import { MapPin, Eye, Lock } from 'lucide-react';
import { getValidImageUrl } from '../../../utils/image';
import { useGuestStore } from '../stores/useGuestStore';

export const GuestUserCard = ({ user }) => {
  const setSelectedUser = useGuestStore((state) => state.setSelectedUser);

  const handleCardClick = () => {
    setSelectedUser(user);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card rounded-2xl overflow-hidden shadow-lg flex flex-col relative group cursor-pointer border border-dark/60 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Online indicator dot */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-card z-10 ${user.isActive ? 'bg-success' : 'bg-muted'}`} title={user.isActive ? 'Active Now' : 'Offline'}></div>

      {/* Avatar Container */}
      <div className="h-48 w-full bg-surface relative overflow-hidden">
        <img
          src={getValidImageUrl(user.profilePhotoUrl) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
          alt={user.fullName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay hover badge */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-card/90 text-main text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
            <Eye size={14} className="text-primary" />
            View Profile
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-main line-clamp-1">{user.fullName}</h3>
        <p className="text-muted text-xs font-medium">@{user.userName || 'user'}</p>

        <div className="flex items-center text-muted text-xs mt-2 mb-4">
          <MapPin size={12} className="mr-1 text-primary/70" />
          <span>San Francisco, CA</span>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {/* View Profile Primary Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
          >
            <Eye size={14} />
            View Profile
          </button>

          {/* Connect Disabled / View-Only Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            title="Log in to send connection requests"
            className="w-full py-2 rounded-xl text-xs font-medium bg-surface/50 text-muted border border-dark flex items-center justify-center gap-1.5 cursor-pointer hover:text-main hover:bg-surface transition-colors"
          >
            <Lock size={12} className="text-muted" />
            Connect (Login Required)
          </button>
        </div>
      </div>
    </div>
  );
};
