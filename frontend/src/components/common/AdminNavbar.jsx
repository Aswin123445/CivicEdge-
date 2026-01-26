import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/services/authApi";
import { logout_user } from "../../features/auth/authSlice";
import LogoHeader from "../../features/auth/components/LogoHeader";
import logo from "../../assets/logo.png";
import AdminDropDown from "../ui/AdminDropDown";
import { useState, useRef, useEffect } from "react";
import LogoutIcon from "../ui/LogoutIcon";
import ProfileIcon from "../ui/ProfileIcon";
import SettingsIcon from "../ui/SettingsIcon";
export default function AdminNavbar() {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    try {
      await logout().unwrap();
      dispatch(logout_user());
      navigate("/auth/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#1f1f1f] border-b border-gray-700 shadow flex items-center justify-between px-6">
      <LogoHeader logo={logo} classname="w-28 h-9 mb-3" classname2="w-44" />
      <AdminDropDown
        buttonRef={buttonRef}
        toggleBar={setOpen}
        togleState={open}
      />
      {open && (
        <div
          ref={menuRef}
          className="absolute bg-[#303030] text-lg text-white right-0 mt-48 mr-12 w-40   shadow-lg border rounded-lg "
        >
          <div className="flex items-center justify-center gap-1 hover:bg-[#404040]">
            <ProfileIcon />
            <button className="py-2 ">Profile</button>
          </div>
          <div className="flex items-center justify-center gap-1 hover:bg-[#404040]">
            <SettingsIcon />
            <button className="py-2 ">Settings</button>
          </div>
          <div className="flex items-center justify-center gap-1 hover:bg-[#404040]">
            <LogoutIcon />
            <button className="py-2 " onClick={handleSubmit}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
