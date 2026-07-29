import React from 'react';
import { X, MapPin, Calendar, Lock, LogIn, UserPlus, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGuestStore } from '../stores/useGuestStore';
import { getValidImageUrl } from '../../../utils/image';

export const UserProfileModal = () => {
  const navigate = useNavigate();
  const { selectedUser, closeProfileModal } = useGuestStore();

  if (!selectedUser) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={closeProfileModal}
    >
      <div 
        className="bg-card w-full max-w-lg rounded-3xl overflow-hidden border border-dark shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Banner */}
        <div className="h-32 bg-gradient-to-r from-primary/30 via-purple-600/20 to-blue-600/20 relative">
          <button 
            onClick={closeProfileModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col items-center text-center -mt-16">
          {/* Profile Photo */}
          <div className="relative mb-3">
            <img 
              src={getValidImageUrl(selectedUser.profilePhotoUrl) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.id}`} 
              alt={selectedUser.fullName}
              className="w-28 h-28 rounded-full border-4 border-card object-cover bg-surface shadow-md"
            />
            <div 
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-card ${selectedUser.isActive ? 'bg-success' : 'bg-muted'}`}
              title={selectedUser.isActive ? 'Active' : 'Offline'}
            />
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold text-main">{selectedUser.fullName}</h2>
          <p className="text-primary font-medium text-sm">@{selectedUser.userName || 'user'}</p>

          {/* Metadata badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-muted mt-3 mb-5">
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-primary" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={13} className="text-primary" />
              <span>Joined July 2026</span>
            </div>
          </div>

          {/* Bio section */}
          <div className="w-full bg-surface/60 rounded-2xl p-4 border border-dark text-left mb-5">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" />
              About
            </h4>
            <p className="text-sm text-main leading-relaxed">
              Software enthusiast and active member of the AtConnect community. Passionate about networking and building connections.
            </p>
          </div>

          {/* Guest Mode Restriction Banner */}
          <div className="w-full bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6 text-left flex items-start gap-3">
            <div className="p-2 bg-primary/20 rounded-xl text-primary mt-0.5">
              <Shield size={18} />
            </div>
            <div className="text-xs">
              <h5 className="font-bold text-main mb-0.5">Guest View-Only Mode</h5>
              <p className="text-muted leading-snug">
                You are viewing this member's profile as a guest. To send a connect request or exchange messages, please log in or create an account.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <LogIn size={16} />
              Log In to Connect
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex-1 py-3 px-4 bg-surface hover:bg-opacity-80 text-main border border-dark rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus size={16} />
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
