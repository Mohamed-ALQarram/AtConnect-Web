import React from 'react';
import { 
  GuestSideBar, 
  GuestHeader, 
  GuestUsersSection, 
  UserProfileModal 
} from '../features/guest';

export const GuestPage = () => {
  return (
    <div className="h-screen bg-main flex text-main overflow-hidden">
      {/* Fixed Sidebar */}
      <GuestSideBar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Fixed Header Area */}
        <div className="w-full px-6 md:px-10 pt-4 border-b border-dark/40 bg-main/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <GuestHeader />
          </div>
        </div>

        {/* Scrollable Bottom Area for Members Grid */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-16 md:pb-10">
          <div className="max-w-7xl mx-auto h-full">
            <GuestUsersSection />
          </div>
        </div>
      </main>

      {/* Profile Detail View Modal */}
      <UserProfileModal />
    </div>
  );
};
