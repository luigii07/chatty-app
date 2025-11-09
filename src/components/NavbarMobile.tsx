import { Link } from "react-router-dom";
import { getInitialFromFullName, navLinks } from "../lib/utils";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export function NavbarMobile() {
  const { onlineUsers } = useAuthStore();
  const { users, isUsersLoading, setSelectedUser } = useChatStore();

  return (
    <div className="w-full h-20 shrink-0 md:hidden flex pl-4 py-2">
      <div className="flex flex-col items-center mr-6">
        <button className="bg-neutral p-2 rounded-full" popoverTarget="popover-1" >
          <label className="swap swap-rotate text-neutral-content">
            <input type="checkbox" />

            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512">
              <polygon
                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </button>

        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover="auto" id="popover-1" >
          {navLinks.map((link, index) => {
            const Icon = link.icon;
          
            return (
              <li key={`${link.path}-${index}`}>
                <Link
                  to={link.path}
                >
                  <Icon className="size-5" />
                  <span className="font-semibold">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {isUsersLoading && (
        <nav className="flex items-center gap-3 overflow-x-scroll scrollbar-hide">
          {new Array(9).fill(null).map((_, index) => (
            <div key={`${new Date().getTime()}-${index}`} className="flex flex-col justify-center items-center gap-3">
              <div className="skeleton size-10 rounded-full" />
              <div className="skeleton w-8 h-2" />
            </div>
          ))}
        </nav>
      )}

      <nav className="flex items-center gap-3 overflow-x-scroll scrollbar-hide">
        {users.map((user, index) => (
          <button key={index} className="rounded-xl cursor-pointer" onClick={() => setSelectedUser(user)}>
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

            <div>
              <span className="font-semibold text-xs">{user.fullName.split(" ")[0]}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};