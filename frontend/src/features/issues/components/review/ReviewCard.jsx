// components/review/ReviewCard.jsx
import { motion } from "framer-motion";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const ReviewCard = ({ title, icon, children }) => (
  <motion.div
    variants={ITEM_VARIANTS}
    className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="text-blue-600 bg-blue-50 p-2 rounded-xl">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default ReviewCard;