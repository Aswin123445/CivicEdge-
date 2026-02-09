// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import LogoHeader from "../../auth/components/LogoHeader";
import logo from "../../../assets/civic_edge.svg";
import { useAuth } from "../../auth/hooks/useAuth";
export default function MainLayout() {
  const { handleLogout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center  text-white p-4">
        <LogoHeader
          logo={logo}
          classname={" h-16 w-12"}
          classname2={"h-44 w-44"}
        />

        <div className="flex text-black text-2xl gap-4">
          <div className="cursor-pointer">profile</div>
          <div
            onClick={() => {
              handleLogout();
            }}
            className="cursor-pointer"
          >
            logout
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="bg-gray-200 text-center p-2 text-sm">
        &copy; {new Date().getFullYear()} CivicEdge
      </footer>
    </div>
  );
}
