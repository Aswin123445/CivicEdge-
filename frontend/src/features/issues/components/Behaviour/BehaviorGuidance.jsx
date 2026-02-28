import { motion } from "framer-motion";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const BehaviorGuidance = () => {
  return (
    <motion.div
      variants={ITEM_VARIANTS}
      className="
        mt-14
        p-6
        bg-slate-100/60
        rounded-3xl
        border border-slate-200
        border-dashed
      "
    >
      <p className="text-xs text-slate-500 text-center leading-relaxed">
        There’s no right or wrong answer here.
        Answering both questions helps create more responsible
        and meaningful civic reports.
      </p>
    </motion.div>
  );
};

export default BehaviorGuidance;