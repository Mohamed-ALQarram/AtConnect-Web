import { SideBar } from '../features/home';
import { ChatsSidebar } from '../features/messages/components/ChatsSidebar';
import { ChatArea } from '../features/messages/components/ChatArea';
import { useMessagesStore } from '../features/messages/stores/messagesStore';

export const MessagesPage = () => {
  const activeChatId = useMessagesStore(state => state.activeChatId);
  return (
    <div className="h-screen w-full bg-main flex text-main overflow-hidden">
      <SideBar slim={true} hiddenOnMobile={!!activeChatId} />

      {/* Main Content Area: Left Panel + Right Panel */}
      <ChatsSidebar />
      <ChatArea />
    </div>
  );
};

