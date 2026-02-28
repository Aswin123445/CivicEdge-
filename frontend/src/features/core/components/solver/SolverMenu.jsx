// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Inbox,
  Loader,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SolverMenuItem from "../../ui/solver/SolverMenuItem";
import useCommon from "../../../auth/hooks/useCommon";
import NameUrlGet from "../NameUrlGet";

export default function SolverMenu({ open, onClose, user }) {
  const {handleLogout} = useCommon();
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
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="
            absolute right-4 top-16 z-50
            w-80 bg-white rounded-xl
            shadow-xl border border-slate-200
            overflow-hidden
          "
        >
          {/* USER IDENTITY */}
          <button
            onClick={() => go("/solver/profile")}
            className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              <NameUrlGet name = {user?.name} avatarUrl = {user?.avatar} />
            </div>

            <div className="min-w-0">
              <p className="font-bold text-slate-800 truncate">
                {user?.name || "Solver"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                Solver · {user?.email}
              </p>
            </div>
          </button>

          {/* FEATURE NAVIGATION */}
          <div className="px-2 py-2 space-y-1">
            <SolverMenuItem icon={LayoutDashboard} label="Dashboard" onClick={() => go("/solver")} />
            <SolverMenuItem icon={ClipboardList} label="View Tasks" onClick={() => go("/solver/tasks")} />
            <SolverMenuItem icon={Inbox} label="New Assignments" onClick={() => go("/solver/tasks?status=new")} />
            <SolverMenuItem icon={Loader} label="In Progress" onClick={() => go("/solver/tasks?status=in_progress")} />
          </div>

          {/* ACCOUNT ACTIONS */}
          <div className="border-t border-slate-100 px-2 py-2 space-y-1">
            <SolverMenuItem icon={User} label="Profile" onClick={() => go("/solver/profile")} />
            <SolverMenuItem icon={Settings} label="Settings" onClick={() => go("/solver/settings")} />

            <button
              onClick={() => {
                onClose();
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition"
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
