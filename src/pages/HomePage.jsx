import { SideBar } from '../features/home';
import { HomePageHeader } from '../features/home/components/HomePageHeader';
import { ChatRequestsSection } from '../features/home/components/ChatRequestsSection';
import { DiscoverUsersSection } from '../features/home/components/DiscoverUsersSection';

export const HomePage = () => {
  return (
    // Make the outer container take full screen height and hide global overflow
    <div className="h-screen bg-main flex text-main overflow-hidden">

      {/* Sidebar will be fixed on the left naturally because of the parent flex */}
      <SideBar />

      {/* Main Content Area: acts as a column flex container */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Fixed Top Area: Header and Chat Requests */}
        {/* This div does not have overflow-auto, so it stays fixed */}
        <div className="w-full px-6 md:px-10 pt-6">
          <div className="max-w-7xl mx-auto">
            <HomePageHeader />
            <ChatRequestsSection />
          </div>
        </div>

        {/* Scrollable Bottom Area: Only Discover Users */}
        {/* flex-1 makes it take the remaining space, overflow-y-auto allows scrolling inside it */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-16 md:pb-10 mt-4">
          <div className="max-w-7xl mx-auto h-full">
            <DiscoverUsersSection />
          </div>
        </div>

      </main>
    </div>
  );
};