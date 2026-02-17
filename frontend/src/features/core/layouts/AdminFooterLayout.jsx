import { Outlet } from "react-router-dom"
import AdminFooter from "../../../components/common/AdminFooter"
export default function AdminFooterLayout(){
return (
  <div className="min-h-screen flex flex-col text-white">
    
    {/* Main Content */}
    <main className="flex-1 pl-12 pt-5 md:pl-4">
      <Outlet />
    </main>

    {/* Footer */}
    <AdminFooter />

  </div>
);
}