import { motion } from "framer-motion";
import { civicIconMap } from "../../../../utils/civicIconMap";
import useIssueHomePageService from "../../hooks/home_page_service";
import CategoryGridSkeleton from "../../ui/skeltons/CategoryGridSkeleton";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function IssueCategorySelect({ value, onSelect, error }) {
  const { categoryData, categoryFetching, categoryLoading } =
    useIssueHomePageService();
  return (
    <motion.div variants={ITEM_VARIANTS} className="space-y-4">
      <div>
        <label className="text-sm font-bold text-slate-700">
          Issue Category
        </label>
        <p className="text-xs text-slate-400">
          Helps route your issue to the right department
        </p>
      </div>

      {categoryFetching || categoryLoading ? (
        <CategoryGridSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categoryData?.map(({ id, name, icon }) => {
            const Icon = civicIconMap[icon];
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all
            ${
              value === id
                ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:shadow-sm"
            }`}
              >
                <Icon size={18} />
                <span className="text-xs font-bold text-center leading-tight">
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </motion.div>
  );
}
