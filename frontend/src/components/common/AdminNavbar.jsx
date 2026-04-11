// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";

import AdminDropDown from "../ui/AdminDropDown";
import CitizenLogo from "../ui/CitizenLogo";
import AdminMenu from "../../features/core/components/admin/AdminMenu";
import useCitizenService from "../../features/core/hooks/citizen/useCitizenService";
import NotificationDrawer from "../../features/notifications/pages/NotificationDrawer";
import CitizenBellIconNotification from "../../features/notifications/components/CitizenBellIconNotification";
import useNotificationCount from "../../features/notifications/hooks/notificationCountHook";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const [userNotificationsOpen, setUserNotificationsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { userData } = useCitizenService();
  const {
    notificationCount,
    countRefetch,
  } = useNotificationCount({ enabled: !userNotificationsOpen });
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
          navigate_route="/admin/dashboard"
        />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Admin Panel
        </span>
      </div>

      {/* ===================== */}
      {/* CENTER: SEARCH */}
      {/* ===================== */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search users, issues, polls…"
            className="
              w-full h-9 pl-9 pr-3
              bg-neutral-800
              border border-neutral-700
              rounded-md
              text-sm text-slate-200
              placeholder:text-slate-500
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* ===================== */}
      {/* RIGHT: ACTIONS */}
      {/* ===================== */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <CitizenBellIconNotification
          onClick={() => setUserNotificationsOpen(true)}
          count={notificationCount?.unread_count || 0}
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
