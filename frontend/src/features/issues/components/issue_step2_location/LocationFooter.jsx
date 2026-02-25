import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp } from "../../ui/motion";

const LocationFooter = ({ onBack, onContinue, canContinue }) => (
  <motion.footer
    variants={fadeInUp}
    className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-6 justify-between"
  >
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"
    >
      <ChevronLeft size={18} />
      Back
    </button>

    <button
      disabled={!canContinue}
      onClick={onContinue}
      className={`px-12 py-4 rounded-2xl font-bold flex items-center gap-3
        ${
          canContinue
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
    >
      Continue
      <ChevronRight size={18} />
    </button>
  </motion.footer>
);

export default LocationFooter;