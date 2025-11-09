import { Contacts } from "../components/Contacts";
import { ChatContainer } from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import { NoChatSelected } from "../components/NoChatSelected";

export function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0">
      <Contacts />

      {selectedUser ? <ChatContainer /> : <NoChatSelected /> }
    </div>
  );
};
