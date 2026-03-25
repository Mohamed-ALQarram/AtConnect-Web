import { SideBar } from '../features/home';
import { HomePageHeader } from '../features/home/components/HomePageHeader';
import { ChatRequestsSection } from '../features/home/components/ChatRequestsSection';
import { DiscoverUsersSection } from '../features/home/components/DiscoverUsersSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-main flex text-main">
      <SideBar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-10">
          <HomePageHeader />
          <ChatRequestsSection />
          <DiscoverUsersSection />
        </div>
      </main>
    </div>
  );
};
