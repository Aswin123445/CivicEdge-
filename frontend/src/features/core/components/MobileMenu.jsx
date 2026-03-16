// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Bell, LogOut, Settings, User, AlertTriangle } from "lucide-react";
import { HomeIcons } from "../ui/HomeIcons";
import MobileMenuItem from "../ui/MobileMenuItem";
import useCitizenService from "../hooks/citizen/useCitizenService";
import NameUrlGet from "./NameUrlGet";
import useCommon from "../../auth/hooks/useCommon";
import MobileMenuSkeleton from "../ui/skeltons/MobileMenuSkelton";
import { useNavigate } from "react-router-dom";
export default function MobileMenu({ open, onClose }) {
  const navigate = useNavigate();
  const handleNavigate = (path) => navigate(path);
  const { userData, userDataLoading } = useCitizenService();
  const { handleLogoutCitizen } = useCommon();
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: Increased opacity (bg-black/70) and higher blur (backdrop-blur-md) */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.aside
            className="
              fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm
              /* Using a solid dark base to prevent image bleed-through */
              bg-[#0a192f] 
              bg-gradient-to-b from-blue-950 via-blue-900 to-[#0a192f]
              text-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]
              /* Added a subtle left border to define the edge against the backdrop */
              border-l border-white/10
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {userDataLoading ? (
              <MobileMenuSkeleton />
            ) : (
              <>
                <div className="px-6 py-8 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                            <NameUrlGet
                              name={userData.profile?.name}
                              avatarUrl={userData.profile?.avatar}
                              classname="h-14 w-14"
                            />
                          </div>
                          <span className="absolute inset-0 rounded-full ring-2 ring-blue-400/40 animate-pulse" />
                        </div>

                        <div>
                          <h2 className="text-lg font-bold tracking-tight">
                            {userData.profile?.name || "User"}
                          </h2>
                          <p className="text-xs text-blue-300/80 font-medium">
                            {userData.profile?.email || "user@example.com"}
                          </p>
                        </div>
                      </div>

                      {/* Close button */}
                      <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="
                         absolute top-4 right-4
                         z-50
                         p-2 rounded-full
                         text-blue-200 hover:text-white
                         bg-white/10 hover:bg-white/20
                         transition"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <nav className="px-4 py-6 space-y-6 overflow-y-auto h-[calc(100vh-120px)]">
                  {/* Primary CTA */}
                  <motion.button
                    onClick={() => {navigate('issue/new')}}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                  w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl
                  bg-gradient-to-r from-amber-500 to-yellow-400
                  text-blue-950 font-bold shadow-xl shadow-amber-900/20
                "
                  >
                    <AlertTriangle className="h-5 w-5" />
                    Report Issue
                  </motion.button>

                  {/* Main navigation */}
                  <div className="space-y-1">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-blue-400/60 mb-2">
                      Menu
                    </p>
                    <MobileMenuItem icon={HomeIcons.Issues} label="My Issues" handleNavigate={() => handleNavigate('/complaints/list')}/>
                    <MobileMenuItem icon={HomeIcons.Talk} label="Civic Talk" />
                    <MobileMenuItem
                      icon={HomeIcons.Army}
                      label="Volunteer Armies"
                    />
                    <MobileMenuItem icon={HomeIcons.Polls} label="Polls" />
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Secondary */}
                  <div className="space-y-1">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-blue-400/60 mb-2">
                      Account
                    </p>
                    <div
                      onClick={() => {
                        navigate("/profile/");
                        onClose();
                      }}
                    >
                      <MobileMenuItem icon={User} label="My Profile" />
                    </div>
                    <MobileMenuItem icon={Bell} label="Notifications" badge />
                    <div
                      onClick={() => {
                        navigate("/settings");
                      }}
                    >
                      <MobileMenuItem icon={Settings} label="Settings" />
                    </div>
                    <div onClick={() => handleLogoutCitizen()}>
                      <MobileMenuItem icon={LogOut} label="Logout" danger />
                    </div>
                  </div>
                </nav>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("mobile-menu-root"),
  );
}
