import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/common/AdminNavbar";
import AdminSidebar from "../../../components/common/AdminSideBar";

// Layout
export default function AdminLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <AdminNavbar />

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
          <div className="w-full h-screen text-white pl-12 pt-5 sm:pl-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
