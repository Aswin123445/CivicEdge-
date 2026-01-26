// src/layout/MainLayout.jsx
import {Outlet,useNavigate} from "react-router-dom";
import LogoHeader from "../../auth/components/LogoHeader";
import logo from '../../../assets/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { logout_user } from "../../auth/authSlice";
export default function MainLayout() {
  const {logout} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {role} = useSelector(s => s.auth)
  const handleLogout = async () => {
    try {
      const data = await logout().unwrap(); // fresh response from backend
      console.log("Logout success:", data);
      dispatch(logout_user()); // clear redux state
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // optionally still clear state so user is logged out client-side
      dispatch(logout_user());
      navigate("/login");
    }
  };

  return  role ? (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center  text-white p-4">
        <LogoHeader logo={logo} classname={" h-16 w-12"} classname2={"h-44 w-44"}/>

        <div className="flex text-black text-2xl gap-4">
          <div className="cursor-pointer">profile</div>
          <div onClick={() => {handleLogout()}} className="cursor-pointer">logout</div>

        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet/>
      </main>
      {/* Footer */}
      <footer className="bg-gray-200 text-center p-2 text-sm">
        &copy; {new Date().getFullYear()} CivicEdge
      </footer>
    </div>
  ): (<div>loading...</div>)
}
