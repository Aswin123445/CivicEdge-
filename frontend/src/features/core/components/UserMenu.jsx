import { useRef } from "react";
import useCommon from "../../auth/hooks/useCommon";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Settings, LogOut } from "lucide-react";
import { createPortal } from "react-dom";
import UserMenuItem from "../ui/UserMenuItems";
import useCitizenService from "../hooks/citizen/useCitizenService";
import NameUrlGet from "./NameUrlGet";

export default function UserMenu({ open, onClose }) {
  const navigate = useNavigate();
  const { handleLogoutCitizen } = useCommon();
  const ref = useRef(null);
  const { userData } = useCitizenService();

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Invisible backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleBackdropClick} />

          {/* Menu */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="
              fixed top-16 right-6 z-50 w-72
              rounded-2xl px-4 py-4
              bg-gradient-to-b from-blue-950/90 to-[#0a192f]/95
              backdrop-blur-xl
              shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]
              text-white
            "
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <NameUrlGet
                    name={userData.profile?.name}
                    avatarUrl={userData.profile?.avatar}
                    classname="h-12 w-12"
                  />
                </div>
                <span className="absolute inset-0 rounded-full ring-2 ring-blue-400/40" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-[#0a192f]" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {userData.profile?.name ? userData.profile?.name : "User"}
                </p>
                <p className="text-xs text-blue-300/80">
                  {userData.profile?.email}
                </p>
              </div>
            </div>

            {/* Menu items */}
            <div className="mt-3 space-y-1">
              <div onClick={() => {navigate('/profile'); onClose()}}>
                <UserMenuItem icon={User} label="My Profile" />
              </div>
              <UserMenuItem icon={Bell} label="Notifications" badge="3" />
              <UserMenuItem icon={Settings} label="Settings" />
            </div>

            {/* Logout */}
            <div onClick={() => handleLogoutCitizen()} className="mt-3 pt-2">
              <UserMenuItem icon={LogOut} label="Logout" danger />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("mobile-menu-root"),
  );
}

/* ---------- Menu Item ---------- */
