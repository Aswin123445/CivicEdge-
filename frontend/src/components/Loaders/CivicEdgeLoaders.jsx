// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CitizenLogo from "../ui/CitizenLogo";
 // your logo svg component
import { useNavigate } from "react-router-dom";

export default function CivicEdgeLoader() {
      const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-6"
      >
        {/* ===================== */}
        {/* LOGO + HALO */}
        {/* ===================== */}
        <div className="relative">
          {/* Soft pulsing halo */}
          <motion.div
            className="
              absolute inset-0
              rounded-full
              bg-blue-600/20
              blur-2xl
            "
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Logo container */}


    <motion.div
      onClick={() => navigate("/home")}
      className="flex items-center gap-3 cursor-pointer select-none"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover="hover"
    >
      {/* ===================== */}
      {/* ICON */}
      {/* ===================== */}
      <div className="relative">
        <div
          className="
            w-9 h-9 rounded-xl
            bg-blue-600
            flex items-center justify-center
            text-white font-extrabold
            shadow-lg
          "
        >
          C
        </div>

        {/* subtle glow for dark bg */}
        <div className="absolute inset-0 rounded-xl bg-blue-600/30 blur-lg -z-10" />
      </div>

      {/* ===================== */}
      {/* TEXT */}
      {/* ===================== */}
      <motion.span
        variants={{
          hover: { opacity: 0.85 },
        }}
        className={`
          text-xl font-bold tracking-tight
          text-white
        `}
      >
        CivicEdge
      </motion.span>
    </motion.div>


        </div>

        {/* ===================== */}
        {/* STATUS TEXT */}
        {/* ===================== */}
        <div className="space-y-2">
          <p className="text-slate-200 font-semibold tracking-wide">
            Initializing Civic Systems
          </p>

          <p className="text-xs text-slate-400 max-w-xs">
            Securing your session and preparing community data
          </p>
        </div>

        {/* ===================== */}
        {/* PROGRESS INDICATOR */}
        {/* ===================== */}
        <div className="w-40 h-1 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
