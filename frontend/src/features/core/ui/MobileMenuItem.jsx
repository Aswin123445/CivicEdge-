// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line no-unused-vars
export default function MobileMenuItem({ icon: Icon, label, badge, danger }) {
  return (
    <motion.div
      whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      className={`
        flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors
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
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
      )}
    </motion.div>
  );
}
