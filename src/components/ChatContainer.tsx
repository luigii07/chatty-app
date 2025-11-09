import { useEffect, useRef } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { formatMessageTime, getInitialFromFullName } from "../lib/utils";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";

export function ChatContainer() {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { authUser } = useAuthStore();
  const { messages, selectedUser, getMessages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
  
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  if (isMessagesLoading) {
    return <MessageSkeleton />
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden md:p-6">
      <div className="relative w-full h-full flex flex-col p-4 pt-0 rounded-t-2xl md:rounded-2xl bg-base-200 overflow-hidden">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto pt-14 scrollbar-hide">
          <div className="min-h-full flex">
            <div className="mt-auto w-full">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${
                    message.senderId === authUser._id ? "chat-end" : "chat-start"
                  }`}
                  ref={messageEndRef}
                >
                  {/* Chat Avatar */}
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full avatar-placeholder">
                      {message.senderId === authUser._id ? (
                        authUser.avatar ? (
                          <img src={authUser.avatar} alt="Foto de perfil" />
                        ) : (
                          <div className="size-10 bg-neutral text-neutral-content rounded-full">
                            <span className="text-md font-medium">
                              {getInitialFromFullName({ fullName: authUser.fullName })}
                            </span>
                          </div>
                        )
                      ) : (
                        selectedUser.avatar ? (
                          <img src={selectedUser.avatar} alt="Foto de perfil" />
                        ) : (
                          <div className="size-10 bg-neutral text-neutral-content rounded-full">
                            <span className="text-md font-medium">
                              {getInitialFromFullName({ fullName: selectedUser.fullName })}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Chat Header */}
                  <div className="chat-header mb-2 px-2">
                    <span className="text-xs">{message.senderId === authUser._id ? authUser.fullName : selectedUser.fullName},</span>
                    <time className="text-xs opacity-75">
                      {formatMessageTime({ date: message.createdAt })}
                    </time>
                  </div>

                  {/* Chat Content */}
                  <div className={
                    `chat-bubble flex flex-col rounded-2xl py-3
                    ${message.senderId === authUser._id
                    ? "rounded-br-none bg-primary text-primary-content"
                    : "rounded-bl-none bg-base-100"
                  }`}>
                    {message.image && (
                      <img
                        className="max-w-[200px] mb-2 rounded"
                        src={message.image}
                        alt="Anexo"
                      />
                    )}
                    {message.text && (
                      <p
                        className={`text-sm ${message.senderId === authUser._id
                          ? "text-primary-content"
                          : "text-base-content"}`}
                      >
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MessageInput />
      </div>
    </div>
  );
};
