import { Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { getInitialFromFullName, navLinks } from "../lib/utils";

export function Sidebar() {
  const { pathname } = useLocation();
  const { authUser } = useAuthStore();
  
  return (
    <aside className="hidden w-20 h-full md:flex flex-col justify-between items-center border-r border-base-300 p-6">
      {/* Logo */}
      <Link to="/" className="flex flex-col items-center gap-2.5 hover:opacity-80 transition-all">
        <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-md font-bold text-primary">Chatty</h1>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navLinks.map((link, index) => {
          const IconComponent = link.icon;

          return (
            <Link
              to={link.path}
              key={`${link.path}-${index}`}
              className={`
                p-4 rounded-xl opacity-80 tooltip tooltip-right z-1 hover:text-primary hover:bg-primary/10
                ${pathname === link.path && "text-primary bg-primary/10"}
              `}
              data-tip={link.label}
            >
              <IconComponent />
            </Link>
          )
        })}
      </nav>

      {/* Avatar */}
      <div className="avatar avatar-placeholder">
        {authUser.avatar ? (
          <div className="w-12 rounded-full">
            <img src={authUser.avatar} />
          </div>
        ) : (
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span className="text-lg font-semibold">{getInitialFromFullName({ fullName: authUser.fullName })}</span>
          </div>
        )}
      </div>
    </aside>
  );
};
