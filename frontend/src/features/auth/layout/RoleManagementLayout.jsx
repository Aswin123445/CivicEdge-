import { Outlet } from "react-router-dom";
import { useNavigate,useLocation} from "react-router-dom";
// import useAdminUserManagement from "../hooks/admin/useadminUserManagement"; // Sample user data

const UserManagementLayout = () => {
  const location = useLocation(); // 👈 this always holds the current pathname
  let Tab ;
  if (location.pathname.includes("/admin/management/citizens")){
    Tab = "user"
  }else if (location.pathname.includes("/admin/management/solvers")){
    Tab = "solver"
  }else {
    Tab = "admin"
  }
  // const Tab = location.pathname.includes("/admin/management/citizens") ? "user" : "solver";
  console.log(location,Tab)
  // const { users, activeTab, setActiveTab } = useAdminUserManagement();

  const navigate = useNavigate();
  const handleSolverClick = () => {
    navigate("/admin/management/solvers");
  };
  const handleUserClick = () => {
    navigate("/admin/management/citizens");    
  };
  const handleAdminClick = () => {
    navigate("/admin/management/admins");    
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#1e1e1e] custom-scrollbar">
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={handleUserClick}
          className={`px-4 py-2 ${
            Tab === "user" ? "border-b-2 border-[#56CCF2]" : ""
          }`}
        >
          User Management
        </button>
        <button
          onClick={handleSolverClick}
          className={`px-4 py-2 ${
            Tab === "solver" ? "border-b-2 border-[#56CCF2]" : ""
          }`}
        >
          Solver Management
        </button>
        <button
          onClick={handleAdminClick}
          className={`px-4 py-2 ${
            Tab === "admin" ? "border-b-2 border-[#56CCF2]" : ""
          }`}
        >
          Admin Management
        </button>
      </div>
      <Outlet />
    </main>
  );
};

export default UserManagementLayout;
