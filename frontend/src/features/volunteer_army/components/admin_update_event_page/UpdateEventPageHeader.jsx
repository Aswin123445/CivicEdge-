// components/admin/events/update/UpdateEventPageHeader.jsx
import { ChevronLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

// ─── Skeleton ─────────────────────────────────────────
export const UpdateEventPageHeaderSkeleton = () => (
  <header className="max-w-4xl mx-auto px-6 py-12">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="w-4 h-4 rounded" />
      <Skeleton className="h-3 w-36" />
    </div>
    <Skeleton className="h-10 w-48 mb-3" />
    <Skeleton className="h-4 w-72" />
  </header>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object}  eventData  - { reference_id, title, status }
 * @param {boolean} isLocked
 */
const UpdateEventPageHeader = ({ eventData, isLocked }) => {
  const navigate = useNavigate();

  return (
    <header className="max-w-4xl mx-auto px-6 py-12">
      <div
        className="flex items-center gap-3 mb-4 text-slate-500 cursor-pointer hover:text-white transition-colors w-fit"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          Admin / Edit Event
        </span>
      </div>

      <h1 className="text-4xl font-black tracking-tight italic text-slate-100">
        Edit Event
      </h1>

      <p className="text-slate-500 font-medium mt-2">
        {eventData?.reference_id ?? "—"}
        {eventData?.title && (
          <>
            {" • "}
            <span className="text-slate-300">{eventData.title}</span>
          </>
        )}
      </p>

      {isLocked && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
          <Lock size={18} className="shrink-0" />
          <p className="text-xs font-bold uppercase tracking-tight">
            This event is {eventData?.status?.toLowerCase() ?? "locked"}. Editing is disabled.
          </p>
        </div>
      )}
    </header>
  );
};

export default UpdateEventPageHeader;
