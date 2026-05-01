// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import CitizenLogo from "../../../../components/ui/CitizenLogo";
import SolverMenu from "./SolverMenu";
import solverUi from "../../hooks/solver/solverUi";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import NameUrlGet from "../NameUrlGet";
import UserSkeleton from "../../ui/skeltons/UserButtonSkelton";
import { NavLink } from "react-router-dom";
import CitizenBellIconNotification from "../../../notifications/components/CitizenBellIconNotification";
import { useState } from "react";
import useNotificationCount from "../../../notifications/hooks/notificationCountHook";
import NotificationDrawer from "../../../notifications/pages/NotificationDrawer";
import { useSelector } from "react-redux";

export default function SolverNavbar() {
  const { access_token } = useSelector((s) => s.auth);
  const [userNotificationsOpen, setUserNotificationsOpen] = useState(false);
  const { notificationCount, refetch } = useNotificationCount({
    access_token
  });
  const { menuOpen, setMenuOpen } = solverUi();
  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        sticky top-0 z-50
        bg-gradient-to-r from-blue-700 to-blue-600
        text-white
        border-b border-blue-800/40
        px-4 md:px-8 py-3
        flex items-center justify-between
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-8">
        {/* Logo */}

        <CitizenLogo navigate_route="/solver/dashboard" />
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100">
          <NavItem to="/solver/dashboard" active>
            Dashboard
          </NavItem>
          <NavItem to="solver/task/list">Tasks</NavItem>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <CitizenBellIconNotification
          onClick={() => setUserNotificationsOpen(true)}
          count={notificationCount || 0}
        />

        {/* Profile / Menu */}
        {userDataLoading || userDataFetching ? (
          <UserSkeleton />
        ) : (
          <div
            onClick={() => setMenuOpen((pre) => !pre)}
            className="hidden md:flex cursor-pointer items-center gap-3 bg-blue-700/50 px-3 py-1.5 rounded-full"
          >
            <div className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-sm font-semibold">
              <NameUrlGet
                name={userData.profile?.name}
                avatarUrl={userData.profile?.avatar}
                classname="w-7 h-7"
              />
            </div>
            <span className="text-sm pb-1">
              {userData.profile?.name || "User"}
            </span>
          </div>
        )}
        <button
          onClick={() => setMenuOpen((pre) => !pre)}
          className="md:hidden p-2 text-white"
        >
          <Menu size={20} />
        </button>
        <SolverMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          user={userData?.profile}
        />
        <NotificationDrawer
          open={userNotificationsOpen}
          onClose={() => setUserNotificationsOpen(false)}
          role="solver"
        />
      </div>
    </motion.nav>
  );
}

/* ---------------- Nav Item ---------------- */

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative pb-1 transition-colors ${
          isActive ? "text-white" : "text-blue-100 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span
              layoutId="navbar-underline"
              className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-white rounded-full"
            />
          )}
        </>
      )}
    </NavLink>
  );
}
