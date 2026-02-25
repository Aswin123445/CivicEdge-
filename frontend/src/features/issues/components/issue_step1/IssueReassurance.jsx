import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const IssueReassurance = () => (
  <motion.div
    variants={ITEM_VARIANTS}
    className="mt-12 p-6 bg-slate-100 rounded-3xl flex gap-4 border border-slate-200"
  >
    <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm">
      <Save size={20} />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-700">
        Automatic Save Enabled
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Your progress is saved automatically. You can continue later from drafts.
      </p>
    </div>
  </motion.div>
);

export default IssueReassurance;