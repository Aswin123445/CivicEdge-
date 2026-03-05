import { ShieldCheck, Clock } from "lucide-react";
import { formatDate } from "../../../../utils/datenormalize";

export default function CurrentStatusCard({ complaint }) {
  const currentEvent = complaint?.timeline?.[complaint.timeline.length - 1];
  const currentMessage = currentEvent?.description;
  const updatedAt = currentEvent?.created_at;

  const formattedTime = formatDate(updatedAt)

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

      {/* Background Icon */}
      <div className="absolute top-6 right-6 opacity-[0.05] pointer-events-none">
        <ShieldCheck className="w-24 h-24 text-blue-600" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>

          <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-700">
            Current Status
          </h2>
        </div>

        {/* Time Container */}
        {formattedTime && (
          <div
            className="
            flex items-center gap-2
            text-xs
            text-slate-500
            bg-slate-50
            border border-slate-200
            px-3 py-1.5
            rounded-full
          "
          >
            <Clock className="w-3.5 h-3.5" />
            {formattedTime}
          </div>
        )}
      </div>

      {/* Message */}
      <p className="text-slate-700 text-[15px] leading-relaxed max-w-2xl pl-5 ">
        {currentMessage ||
          "Your complaint is currently under review by the civic team. Updates will appear here as progress is made."}
      </p>
    </section>
  );
}