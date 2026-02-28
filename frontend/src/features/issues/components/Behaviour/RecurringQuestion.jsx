import { motion } from "framer-motion";
import { History } from "lucide-react";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const RecurringQuestion = ({ value, onChange }) => (
  <motion.section variants={ITEM_VARIANTS} className="space-y-4">
    <div className="flex items-start gap-3 ml-1">
      <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
        <History size={18} />
      </div>
      <div>
        <h2 className="font-semibold text-slate-800">
          Have you noticed this issue happening repeatedly?
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Repeated issues often need long-term attention.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {["Yes", "No"].map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`py-5 rounded-[1.5rem] border text-sm font-medium
            ${
              value === option
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white"
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  </motion.section>
);

export default RecurringQuestion;