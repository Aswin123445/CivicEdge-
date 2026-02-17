import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/common/AdminNavbar";
import AdminSidebar from "../../../components/common/AdminSideBar";
import AdminFooter from "../../../components/common/AdminFooter";

// Layout
export default function AdminLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#1e1e1e]">
      {/* Navbar */}
      <AdminNavbar />

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
          <div >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
