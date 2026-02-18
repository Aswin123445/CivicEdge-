// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import ROLE_REDIRECT_MAP from "../utils/role_mapper";

export default function NotFound() {
  const navigate = useNavigate();
  const {role} = useSelector((s) => s.auth);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        {/* Soft icon / visual */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center"
        >
          <span className="text-3xl font-semibold text-blue-400">404</span>
        </motion.div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-slate-100 mb-2">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The page you’re trying to reach doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate(ROLE_REDIRECT_MAP[role])}
            className="
              inline-flex items-center justify-center gap-2
              px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-500
              text-white text-sm
              transition
            "
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
