import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPill({ onClick ,className=" hidden md:flex"}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        ${className} cursor-pointer
        items-center gap-3
        bg-blue-700/50 hover:bg-blue-700/70
        px-3 py-1.5
        rounded-full
        transition-colors
      `}
    >
      {/* Icon Circle */}
      <div className="
        w-7 h-7
        bg-blue-200
        rounded-full
        flex items-center justify-center
        text-blue-700
      ">
        <LogIn size={14} />
      </div>

      {/* Label */}
      <span className="text-sm pb-1 font-medium">
        Login
      </span>
    </motion.div>
  );
}
