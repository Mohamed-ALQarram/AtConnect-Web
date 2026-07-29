import React from 'react';
import { Search, Eye, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGuestStore } from '../stores/useGuestStore';

export const GuestHeader = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useGuestStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-main">Explore Members</h1>
            <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs px-2.5 py-1 rounded-full font-semibold">
              <Eye size={13} />
              Guest View Only
            </span>
          </div>
          <p className="text-muted text-xs mt-1">Browse active profiles in the AtConnect community</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-surface text-sm text-main placeholder-muted rounded-full py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-primary border border-dark"
          />
        </div>

        {/* Action Buttons for Guests */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
          >
            <LogIn size={14} />
            Log In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
          >
            <UserPlus size={14} />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
