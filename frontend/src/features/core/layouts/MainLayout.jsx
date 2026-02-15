// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/citizen/Navbar";
import Footer from "../../../components/common/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col bg-blue-700">
      {/* Navbar */}
      <HomeNavbar />

      {/* Main content */}
      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>

      {/* Footer */}
      {/* Footer wrapper owns footer color */}

      <div className="bg-blue-700">
        <Footer />
      </div>
    </div>
  );
}
