import React from "react";
import BorderAnimation from "../components/BorderAnimation";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import TabSwitch from "../components/TabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import ChatInstruction from "../components/ChatInstruction";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-7xl h-[800px] ">
      <BorderAnimation>
        {/* LEFT SIDEBAR */}
        <div className="w-80 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <TabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>
        {/* RIGHT CHATS PAGE */}
        <div className="flex-1 flex flex-col  bg-slate-900/50  backdrop-blur-sm ">
          {selectedUser ? <ChatContainer /> : <ChatInstruction />}
        </div>
      </BorderAnimation>
    </div>
  );
};

export default ChatPage;
