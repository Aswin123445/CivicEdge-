import { formatDate } from "../../../../utils/datenormalize";

const STATUS_STYLES = {
  OPEN: {
    dot: "bg-blue-600",
    text: "text-blue-700",
    badge: "text-blue-700 bg-blue-50",
  },
  IN_REVIEW: {
    dot: "bg-purple-600",
    text: "text-purple-700",
    badge: "text-purple-700 bg-purple-50",
  },
  IN_PROGRESS: {
    dot: "bg-amber-500",
    text: "text-amber-700",
    badge: "text-amber-700 bg-amber-50",
  },
  RESOLVED: {
    dot: "bg-green-600",
    text: "text-green-700",
    badge: "text-green-700 bg-green-50",
  },
  CLOSED: {
    dot: "bg-slate-600",
    text: "text-slate-700",
    badge: "text-slate-700 bg-slate-100",
  },
  REJECTED: {
    dot: "bg-red-600",
    text: "text-red-700",
    badge: "text-red-700 bg-red-50",
  },
  CANCELLED: {
    dot: "bg-gray-500",
    text: "text-gray-700",
    badge: "text-gray-700 bg-gray-100",
  },
  REOPENED: {
    dot: "bg-orange-600",
    text: "text-orange-700",
    badge: "text-orange-700 bg-orange-50",
  },
};

export default function ComplaintTimeline({ timeline = [], status }) {
  const formattedDate = (date) => formatDate(date);
  const lastIndex = timeline.length - 1;

  const currentStatusStyle =
    STATUS_STYLES[status?.code] || STATUS_STYLES.OPEN;

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
                    ? `${currentStatusStyle.dot} scale-110`
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
                      ? currentStatusStyle.text
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
                  <div
                    className={`
                    mt-2 inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full
                    ${currentStatusStyle.badge}
                  `}
                  >
                    {status?.label || "Current Stage"}
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