import { SideBar } from '../features/home';
import { ChatsSidebar } from '../features/messages/components/ChatsSidebar';
import { ChatArea } from '../features/messages/components/ChatArea';

export const MessagesPage = () => {
  return (
    <div className="h-screen w-full bg-main flex text-main overflow-hidden">
      <SideBar slim={true} />
      
      {/* Main Content Area: Left Panel + Right Panel */}
      <ChatsSidebar />
      <ChatArea />
    </div>
  );
};

