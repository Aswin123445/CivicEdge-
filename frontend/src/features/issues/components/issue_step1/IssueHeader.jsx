import { motion } from 'framer-motion';
import { Save, CheckCircle2 } from 'lucide-react';

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const IssueHeader = ({ isSaving }) => (
  <motion.header variants={ITEM_VARIANTS} className="mb-10">
    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
      Report an Issue
    </h1>
    <p className="text-slate-500 mt-3 text-lg">
      Start with the basic details. You can complete the rest later.
    </p>

    <div className="flex items-center gap-2 mt-4 text-xs font-medium">
      {isSaving ? (
        <span className="flex items-center gap-1.5 text-slate-400">
          <Save size={14} className="animate-pulse" />
          Saving draft…
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-emerald-600">
          <CheckCircle2 size={14} />
          Draft saved
        </span>
      )}
    </div>
  </motion.header>
);

export default IssueHeader;