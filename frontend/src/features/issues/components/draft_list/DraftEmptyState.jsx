import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { fadeInUp } from "../../ui/motion";
const DraftEmptyState = () => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center py-5 text-center"
  >
    <div className="w-20 h-20 bg-blue-50 text-blue-200 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="w-10 h-10" />
    </div>

    <h2 className="text-2xl font-bold text-slate-900">
      No draft issues yet
    </h2>
    <p className="text-slate-500 mt-2 max-w-xs">
      Start a complaint and we’ll save it automatically.
    </p>
  </motion.div>
);

export default DraftEmptyState;