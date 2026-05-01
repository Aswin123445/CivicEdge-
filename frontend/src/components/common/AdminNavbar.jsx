// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  AlertTriangle,
  CalendarPlus,
  Vote,
  ShieldAlert,
} from "lucide-react";

import AdminDropDown from "../ui/AdminDropDown";
import CitizenLogo from "../ui/CitizenLogo";
import AdminMenu from "../../features/core/components/admin/AdminMenu";
import useCitizenService from "../../features/core/hooks/citizen/useCitizenService";
import NotificationDrawer from "../../features/notifications/pages/NotificationDrawer";
import CitizenBellIconNotification from "../../features/notifications/components/CitizenBellIconNotification";
import useNotificationCount from "../../features/notifications/hooks/notificationCountHook";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminNavbar() {
  const { access_token } = useSelector((s) => s.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userNotificationsOpen, setUserNotificationsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { userData } = useCitizenService();
  const { notificationCount, refetch } = useNotificationCount({
    access_token,
  });
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

  const isIssue = location.pathname.includes(
    "/dashboard/execution/in-review/issues",
  );
  const isEvents = location.pathname.includes(
    "/dashboard/volunteer/events/create",
  );
  const isPolls = location.pathname.includes("/dashboard/polls/create");  
  const isReport = location.pathname.includes("/dashboard/forum/reports");
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        fixed top-0 left-0 right-0 z-50 h-16
        bg-neutral-900
        border-b border-neutral-700
        flex items-center justify-between
        px-6
      "
    >
      {/* ===================== */}
      {/* LEFT: BRAND */}
      {/* ===================== */}
      <div className="flex items-center gap-4">
        <CitizenLogo
          classname="text-blue-500"
          navigate_route="/dashboard/home"
        />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Admin Panel
        </span>
      </div>

      {/* ===================== */}
      {/* CENTER: SEARCH */}
      {/* ===================== */}

      <div className="hidden lg:flex items-center gap-2 text-slate-400">
        {/* Pending Issues */}
        <div
          onClick={() => navigate("/dashboard/execution/in-review/issues")}
          className={`${isIssue ? "bg-slate-800 text-white" : ""} flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-800 hover:text-white transition-all duration-200`}
        >
          <AlertTriangle size={16} />
          <span className="text-sm font-medium">Pending Issues</span>
        </div>

        {/* Create Event */}
        <div
          onClick={() => navigate("/dashboard/volunteer/events/create")}
          className={`${isEvents ? "bg-slate-800 text-white" : ""} flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-800 hover:text-white transition-all duration-200`}
        >
          <CalendarPlus size={16} />
          <span className="text-sm font-medium">Create Event</span>
        </div>

        {/* Create Poll */}
        <div
          onClick={() => {
            navigate("/dashboard/polls/create");
          }}
          className={`${isPolls ? "bg-slate-800 text-white" : ""} flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-800 hover:text-white transition-all duration-200`}
        >
          <Vote size={16} />
          <span className="text-sm font-medium">Create Poll</span>
        </div>

        {/* Forum Reports */}
        <div
          onClick={() => navigate("/dashboard/forum/reports")}
          className={`${isReport ? "bg-slate-800 text-white" : ""} flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-800 hover:text-white transition-all duration-200`}
        >
          <ShieldAlert size={16} />
          <span className="text-sm font-medium">Forum Reports</span>
        </div>
      </div>
      {/* ===================== */}
      {/* RIGHT: ACTIONS */}
      {/* ===================== */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <CitizenBellIconNotification
          onClick={() => setUserNotificationsOpen(true)}
          count={notificationCount || 0}
        />

        {/* Admin Menu */}
        <div className="relative">
          <AdminDropDown
            buttonRef={buttonRef}
            toggleBar={setOpen}
            togleState={open}
          />
          <AdminMenu
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            user={userData?.profile}
          />
          <NotificationDrawer
            open={userNotificationsOpen}
            onClose={() => setUserNotificationsOpen(false)}
            role="admin"
          />
        </div>
      </div>
    </motion.nav>
  );
}
