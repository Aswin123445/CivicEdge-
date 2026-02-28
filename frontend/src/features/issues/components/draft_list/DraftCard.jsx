import { Trash2, ArrowRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";


import DraftProgress from "./DraftProgress";
import { civicIconMap } from "../../../../utils/civicIconMap";
import { ISSUE_STEP_ROUTE_MAP } from "../../utils";

const DraftCard = ({ draft, onDeleteRequest }) => {
  const navigate = useNavigate();
  const Icon = civicIconMap[draft?.icon];

  const handleContinue = () => {
    const routeTemplate = ISSUE_STEP_ROUTE_MAP[draft?.next_step];
    const route = routeTemplate.replace(":id", draft?.id);
    navigate(route);
  }

  // Fallback icon for now (can be replaced with civicIconMap later)
  return (
    <div
      className="
        bg-white rounded-2xl border border-slate-200
        p-6 flex flex-col md:flex-row gap-6
        hover:shadow-md hover:border-blue-200
        transition-all
      "
    >
      {/* ───────────────
         Basic Info
      ─────────────── */}
      <div className="flex-1 min-w-0">
        {/* Category + Title */}
        <div className="flex items-center gap-3 mb-2">
          <span className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
            <Icon className="w-4 h-4" />
          </span>

          <h3 className="text-lg font-bold text-slate-900 truncate first-letter:uppercase">
            {draft?.title || "Untitled Issue"}
          </h3>
        </div>

        {/* Description */}
        {draft?.description && (
          <p className="text-slate-500 text-sm line-clamp-2 first-letter:uppercase">
            {draft?.description}
          </p>
        )}
      </div>

      {/* ───────────────
         Progress
      ─────────────── */}
      <div className="md:w-32 shrink-0">
        <DraftProgress
          progress={draft?.completion_percentage}
          currentStep={draft?.draft_step}
        />
      </div>

      {/* ───────────────
         Actions
      ─────────────── */}
      <div className="flex items-center gap-2 pt-4 md:pt-0">
        <button
          onClick={onDeleteRequest}
          className="
            p-3 rounded-xl
            text-slate-400
            hover:text-red-600 hover:bg-red-50
            transition-colors
          "
          title="Delete draft"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleContinue()}
          className="
            flex items-center gap-2
            px-6 py-3
            bg-blue-900 text-white font-bold
            rounded-xl shadow
            hover:bg-blue-800
            transition-all active:scale-95
          "
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DraftCard;
