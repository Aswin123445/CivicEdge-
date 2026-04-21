// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SolverMenuItem from "../../ui/solver/SolverMenuItem";
import useCommon from "../../../auth/hooks/useCommon";
import NameUrlGet from "../NameUrlGet";

export default function AdminMenu({ open, onClose, user }) {
  const { handleLogoutAdmin } = useCommon();
  const navigate = useNavigate();
  const ref = useRef(null);

  if (!open) return null;

  const go = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <>
        {/* BACKDROP */}
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* MENU */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="
            absolute right-4 top-16 z-50
            w-80 rounded-xl
            bg-neutral-900
            border border-neutral-700
            shadow-2xl
            overflow-hidden
          "
        >
          {/* ===================== */}
          {/* USER IDENTITY */}
          {/* ===================== */}
          <button
            onClick={() => go("/dashboard/profile")}
            className="
              w-full flex items-center gap-4
              p-4 text-left
              hover:bg-neutral-800 transition-colors
            "
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              <NameUrlGet name = {user?.name} avatarUrl = {user?.avatar}/>
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-white truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                Administrator · {user?.email}
              </p>
            </div>
          </button>

          {/* ===================== */}
          {/* ACCOUNT ACTIONS */}
          {/* ===================== */}
          <div className="border-t border-neutral-700 px-2 py-2 space-y-1">
            <SolverMenuItem
              icon={User}
              label="Profile"
              onClick={() => go("/dashboard/profile")}
              className="text-white hover:bg-neutral-800"
            />

            <SolverMenuItem
              icon={Settings}
              label="Settings"
              onClick={() => go("/dashboard/settings")}
              className="text-white hover:bg-neutral-800"
            />

            <button
              onClick={() => {
                onClose();
                handleLogoutAdmin();
              }}
              className="
                w-full flex items-center gap-3
                px-3 py-2.5 rounded-lg
                text-red-400 font-semibold
                hover:bg-red-500/10
                transition-colors
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
