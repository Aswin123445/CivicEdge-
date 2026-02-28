import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const BehaviorHeader = () => (
  <motion.header variants={ITEM_VARIANTS} className="mb-10">
    <h1 className="text-3xl font-bold tracking-tight">
      A Few Helpful Details
    </h1>

    <p className="text-slate-500 mt-3 text-lg leading-relaxed">
      These questions help us understand the situation better and process your report accurately.
    </p>

    <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-blue-700 bg-blue-50 w-fit px-3 py-1.5 rounded-full">
      <HelpCircle size={14} />
      Additional context
    </div>
  </motion.header>
);

export default BehaviorHeader;