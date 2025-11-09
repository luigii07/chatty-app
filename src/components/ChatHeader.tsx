import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { getInitialFromFullName } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";

export function ChatHeader(){
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isUserOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="absolute z-10 backdrop-blur-3xl left-0 p-4 w-full pb-4 border-b border-base-100">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div className={`avatar ${isUserOnline ? "avatar-online" : "avatar-offline"}`}>
            {selectedUser.avatar ? (
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.avatar} />
              </div>
              ) : (
              <div className="size-10 flex justify-center items-center bg-neutral text-neutral-content rounded-full">
                <span className="text-md font-medium">{getInitialFromFullName({ fullName: selectedUser.fullName })}</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium ">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {isUserOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button className="cursor-pointer" onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}