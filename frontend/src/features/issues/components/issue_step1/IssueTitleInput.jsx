import { motion } from 'framer-motion';

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const IssueTitleInput = ({ value, onChange, error }) => (
  <motion.div variants={ITEM_VARIANTS} className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1">
      Issue Title
    </label>

    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Short title for the issue"
      className={`w-full px-5 py-4 rounded-2xl border ${
        error ? 'border-red-200 bg-red-50/30' : 'border-slate-200'
      } focus:ring-2 focus:ring-blue-500/20`}
    />

    <div className="flex justify-between px-1">
      <span className="text-xs text-slate-400">
        Example: “Pothole near main road”
      </span>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  </motion.div>
);

export default IssueTitleInput;