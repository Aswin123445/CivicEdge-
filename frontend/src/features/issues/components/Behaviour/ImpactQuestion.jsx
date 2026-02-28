import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const impactOptions = [
  { id: "low", label: "Low impact", sub: "Minor inconvenience" },
  { id: "medium", label: "Moderate impact", sub: "Affects daily routine" },
  { id: "high", label: "High impact", sub: "Safety risk or serious disruption" },
];

const ImpactQuestion = ({ value, onChange }) => (
  <motion.section variants={ITEM_VARIANTS} className="space-y-4">
    <div className="flex items-start gap-3 ml-1">
      <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
        <AlertTriangle size={18} />
      </div>
      <div>
        <h2 className="font-semibold text-slate-800">
          How serious is the impact right now?
        </h2>
      </div>
    </div>

    <div className="space-y-3">
      {impactOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`w-full p-5 rounded-[1.5rem] border text-left
            ${
              value === opt.id
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
        >
          <p className="font-semibold text-sm">{opt.label}</p>
          <p className="text-xs text-slate-400 mt-1">{opt.sub}</p>
        </button>
      ))}
    </div>
  </motion.section>
);

export default ImpactQuestion;