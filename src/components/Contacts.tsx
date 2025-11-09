import { Search, SearchX, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { getInitialFromFullName } from "../lib/utils";
import { useChatStore } from "../store/useChatStore";

export function Contacts() {
  const [search, setSearch] = useState("");
  const { authUser, onlineUsers } = useAuthStore();
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const searchUsers = users.filter((user) => user.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  const filteredUsers = showOnlineOnly ? searchUsers.filter(user => onlineUsers.includes(user._id)) : searchUsers;

  return (
    <aside className="hidden h-full w-48 lg:w-80 lg:max-w-80 md:flex flex-col p-6 pr-0 lg:p-6">
      {/* Nav Header */}
      <header className="border-b border-base-300 p-4 pb-7">
        <h1 className="text-2xl font-semibold">Chat</h1>
      </header>

      {/* Profile Info */}
      <div className="relative w-full flex flex-col items-center gap-4 mt-6 pb-6 border-b border-base-300">
        <Link to={"/profile"} className="absolute top-0 right-0 cursor-pointer opacity-70 hover:text-primary">
          <UserPen className="size-5" />
        </Link>
        <div className="avatar avatar-online">
          {authUser.avatar ? (
            <div className="size-28 rounded-full">
              <img src={authUser.avatar} />
            </div>
          ) : (
            <div className="size-28 flex justify-center items-center bg-neutral text-neutral-content rounded-full">
              <span className="text-5xl">{getInitialFromFullName({ fullName: authUser.fullName })}</span>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold">{authUser.fullName}</h2>
      </div>

      {/* Filter online users */}
      <div className="flex flex-col">
        <div className="my-5 flex items-center justify-between gap-2 px-1">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-sm">Online</span>
          </label>
          <span className="text-xs text-zinc-500">{onlineUsers.length - 1} online</span>
        </div>

        <form className="mb-4">
          <div className="relative w-full flex justify-end items-center bg-base-300/65 p-3 rounded-xl">
            <input
              type="text"
              className="absolute inset-0 pl-4 outline-none"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search />
          </div>
        </form>
      </div>

      {/* Users */}
      {isUsersLoading ? (
        <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          {Array(5).fill(null).map((_, idx) => (
            <div key={idx} className="w-full flex items-center gap-3">
              {/* Avatar skeleton */}
              <div className="relative mx-auto lg:mx-0">
                <div className="skeleton size-12 rounded-full" />
              </div>

              {/* User info skeleton - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="skeleton h-4 w-32 mb-2" />
                <div className="skeleton h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <nav className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          {filteredUsers.map((user, index) => (
            <button
              key={index}
              className={`w-full flex shrink-0 gap-2 rounded-xl p-3 cursor-pointer hover:bg-base-300/50 overflow-hidden ${user._id === selectedUser?._id && "bg-base-300/50" }`}
              onClick={() => setSelectedUser(user)}
            >
              {/* Avatar */}
              <div className={`avatar avatar-placeholder ${onlineUsers.includes(user._id) ? "avatar-online" : "avatar-offline"}`}>
                {user.avatar ? (
                  <div className="size-10 rounded-full">
                    <img src={user.avatar} />
                  </div>
                  ) : (
                  <div className="size-10 bg-neutral text-neutral-content rounded-full">
                    <span className="text-md font-medium">{getInitialFromFullName({ fullName: user.fullName })}</span>
                  </div>
                )}
              </div>

              {/* Name / Email */}
              <div className="flex flex-col gap-1 flex-1 min-w-0 text-start">
                <span className="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {user.fullName}
                </span>
                <span className="text-xs overflow-hidden text-ellipsis whitespace-nowrap opacity-75 w-full">
                  {user.email}
                </span>
              </div>
            </button>
          ))}
        </nav>
      )}

      {!isUsersLoading && filteredUsers.length === 0 && (
        <div className="text-center gap-1 text-zinc-500 py-4">
          Nenhum usuário encontrado!
        </div>
      )}
    </aside>
  );
};
