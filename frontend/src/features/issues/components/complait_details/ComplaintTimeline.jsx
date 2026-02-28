import { formatDate } from "../../../../utils/datenormalize";

export default function ComplaintTimeline({ timeline }) {
  const formattedeDate = (date) => formatDate(date); 
  return (
    <section className="py-8">
      <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-8">
        Activity Timeline
      </h2>

      <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
        {timeline?.map((event) => (
          <div key={event.id} className="relative pl-10">
            <div
              className={`
              absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-[#F8FAFF]
              ${event.is_current ? "bg-blue-600 scale-110" : "bg-slate-300"}
            `}
            />

            <div>
              <div className="text-sm font-semibold text-slate-800">
                {event.label}
              </div>

              {event.description && (
                <div className="text-xs text-slate-500 mt-1">
                  {event.description}
                </div>
              )}

              <div className="text-xs text-slate-400 mt-1">
                {formattedeDate(event.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
