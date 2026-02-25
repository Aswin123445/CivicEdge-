import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { fadeInUp } from "../../ui/motion";

const DraftHeader = () => {
  return (
    <motion.header variants={fadeInUp} className="mb-10">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        Draft Issues
      </h1>
      <p className="text-slate-500 mt-2 text-lg">
        Incomplete complaints saved automatically.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
        <Clock className="w-4 h-4" />
        Drafts are saved automatically
      </div>
    </motion.header>
  );
};

export default DraftHeader;