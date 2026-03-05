import { ShieldCheck, Scale } from "lucide-react";
import { formatDate } from "../../../../utils/datenormalize";

const AdministrativeDecisionCard = ({ decision, issue_status }) => {
  if (!decision) return null;

  const statusCode = issue_status?.code;

  // Hide card if issue already resolved or closed
  if (statusCode === "RESOLVED" || statusCode === "CLOSED") {
    return null;
  }

  const date = formatDate(decision?.created_at);

  return (
    <section
      className="
      relative
      bg-white
      border border-slate-200
      rounded-xl
      p-8
      shadow-sm
      overflow-hidden
    "
    >
      {/* Blue Accent Line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />

      {/* Watermark Icon */}
      <div className="absolute top-6 right-6 opacity-[0.05] pointer-events-none">
        <Scale className="w-24 h-24 text-blue-600" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50">
          <Scale className="w-5 h-5 text-blue-600" />
        </div>

        <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-700">
          Administrative Update
        </h2>
      </div>

      {/* Decision Type */}
      <h3 className="text-slate-900 font-medium text-[16px] mb-3 pl-5">
        {decision.type}
      </h3>

      {/* Reason */}
      <p className="text-slate-700 text-[15px] leading-relaxed max-w-2xl pl-5">
        {decision.reason}
      </p>

      {/* Footer */}
      {date && (
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-500">Administrative update</span>

          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
            {date}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdministrativeDecisionCard;