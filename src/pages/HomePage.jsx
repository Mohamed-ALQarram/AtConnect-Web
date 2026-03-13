import React from 'react';
import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

// The Home Page where the chat application will eventually live
export const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const clearCredentials = useAuthStore((state) => state.clearCredentials);
  const navigate = useNavigate();

  // Handle user logging out
  const handleLogout = () => {
    clearCredentials();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-main flex flex-col items-center justify-center text-text-main p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to AtConnect</h1>
      <p className="text-lg text-text-muted mb-8">
        You are successfully logged in as {user?.username || 'User'}!
      </p>

      {/* Placeholder for the chat interface */}
      <div className="bg-card w-full max-w-2xl p-8 rounded-24 border border-dark text-center shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Chat Features Coming Soon</h2>
        <p className="text-sm text-text-muted mb-12">
          This is a placeholder for the actual chat application interface. We will build the chat components here later.
        </p>

        <button
          onClick={handleLogout}
          className="bg-danger/10 text-danger hover:bg-danger/20 font-semibold py-3 px-8 rounded-24 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
