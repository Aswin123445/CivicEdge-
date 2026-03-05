import { formatDate } from "../../../../utils/datenormalize";

export default function ComplaintTimeline({ timeline = [] }) {
  const formattedDate = (date) => formatDate(date);
  const lastIndex = timeline.length - 1;

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-700 mb-8">
        Activity Timeline
      </h2>

      <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
        {timeline.map((event, index) => {
          const isCurrent = index === lastIndex;
          const isCompleted = index < lastIndex;

          return (
            <div key={event.id} className="relative pl-10">
              
              {/* Dot */}
              <div
                className={`
                absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm
                ${
                  isCurrent
                    ? "bg-blue-600 scale-110"
                    : isCompleted
                    ? "bg-green-500"
                    : "bg-slate-300"
                }
                `}
              />

              <div>
                <div
                  className={`
                  text-sm font-semibold
                  ${
                    isCurrent
                      ? "text-blue-700"
                      : isCompleted
                      ? "text-green-700"
                      : "text-slate-800"
                  }
                `}
                >
                  {event.label}
                </div>

                {event.description && (
                  <div className="text-xs text-slate-500 mt-1">
                    {event.description}
                  </div>
                )}

                <div className="text-xs text-slate-400 mt-1">
                  {formattedDate(event.created_at)}
                </div>

                {isCurrent && (
                  <div className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
                    Current Stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}