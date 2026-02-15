// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line no-unused-vars
export default function UserMenuItem({ icon: Icon, label, badge, danger }) {
  return (
    <motion.div
      whileHover={{
        x: 4,
        backgroundColor: danger
          ? "rgba(239,68,68,0.12)"
          : "rgba(255,255,255,0.06)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        flex items-center justify-between
        px-3 py-2.5 rounded-xl cursor-pointer
        ${
          danger
            ? "text-red-400 hover:text-red-300"
            : "text-blue-100 hover:text-white"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 opacity-80" />
        <span className="text-sm font-medium">{label}</span>
      </div>

      {badge && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
          {badge}
        </span>
      )}
    </motion.div>
  );
}