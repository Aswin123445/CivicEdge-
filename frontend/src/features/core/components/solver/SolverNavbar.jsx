// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import CitizenLogo from "../../../../components/ui/CitizenLogo";
import SolverMenu from "./SolverMenu";
import solverUi from "../../hooks/solver/solverUi"
import useCitizenService from "../../hooks/citizen/useCitizenService";
import NameUrlGet from "../NameUrlGet";
import ProfileHeaderSkeleton from "../../ui/skeltons/ProfileHeaderSkeleton";
import UserSkeleton from "../../ui/skeltons/UserButtonSkelton";

export default function SolverNavbar() {
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

        <CitizenLogo />
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100">
          <NavItem active>Dashboard</NavItem>
          <NavItem>Tasks</NavItem>

          <div className="flex items-center gap-2">
            <NavItem>New Assignments</NavItem>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md"
            >
              3
            </motion.span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            relative p-2
            text-blue-100
            hover:bg-blue-500/30
            rounded-full
            transition-colors
          "
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-blue-700" />
        </motion.button>

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
        <button onClick={() => setMenuOpen(pre => !pre)} className="md:hidden p-2 text-white">
          <Menu size={20} />
        </button>
        <SolverMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          user={userData?.profile}
        />
      </div>
    </motion.nav>
  );
}

/* ---------------- Nav Item ---------------- */

function NavItem({ children, active }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -1 }}
      className={`
        relative pb-1 transition-colors
        ${active ? "text-white" : "hover:text-white"}
      `}
    >
      {children}
      {active && (
        <motion.span
          layoutId="navbar-underline"
          className="
            absolute left-0 right-0 -bottom-0.5
            h-0.5 bg-white rounded-full
          "
        />
      )}
    </motion.a>
  );
}
