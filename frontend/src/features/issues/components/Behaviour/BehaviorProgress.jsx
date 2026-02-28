import { motion } from "framer-motion";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const steps = [
  "Issue Details",
  "Add Photos",
  "Mark Location",
  "A Few Questions",
  "Review Issue",
];

const BehaviorProgress = () => (
  <motion.section variants={ITEM_VARIANTS} className="mb-12">
    <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-50 via-blue-100/60 to-white border">
      <div className="grid grid-cols-5 gap-3">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div
              className={`h-1.5 w-full rounded-full ${
                idx <= 3 ? "bg-blue-600" : "bg-blue-200"
              }`}
            />
            <span
              className={`text-[10px] font-semibold uppercase text-center ${
                idx === 3 ? "text-blue-700" : "text-blue-400"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default BehaviorProgress;