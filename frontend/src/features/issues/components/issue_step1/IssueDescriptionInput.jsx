import { motion } from 'framer-motion';

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const IssueDescriptionInput = ({ value, onChange, error }) => (
  <motion.div variants={ITEM_VARIANTS} className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1">
      Issue Description
    </label>

    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe the issue clearly"
      className={`w-full px-5 py-4 rounded-2xl border resize-none ${
        error ? 'border-red-200 bg-red-50/30' : 'border-slate-200'
      }`}
    />

    <div className="flex justify-between px-1">
      <p className="text-xs text-slate-400">
        What happened? Where? Since when?
      </p>
      <span className="text-[10px] font-bold text-slate-400">
        {value.length}
      </span>
    </div>

    {error && <p className="text-xs text-red-500">{error}</p>}
  </motion.div>
);

export default IssueDescriptionInput;