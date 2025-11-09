import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { NavbarMobile } from "../components/NavbarMobile";

export function AppLayout() {
  return (
    <div className="w-screen h-dvh flex flex-col md:flex-row overflow-hidden">
      <NavbarMobile />
      <Sidebar />
      <Outlet />
    </div>
  );
};
