import React from "react";
import EmptyTimelineState from "./EmptyTimelineState";

const SolverExecutionProgressTimeline = ({ updates }) => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <h2 className="mb-4 text-lg font-bold text-slate-900">
        Execution Timeline
      </h2>

      <div className="space-y-6">
        {updates.length > 0 ? (
          updates?.map((update) => (
            /* COMPONENT: ProgressUpdateCard 
                   Move to: components/solver/execution/ProgressUpdateCard.jsx 
                */
            <div
              key={update.id}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-hover hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                      {update.reference_id}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(update.created_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-medium leading-relaxed text-slate-900">
                    {update.progress_summary}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 px-3 py-1 text-center border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Progress
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {update.progress_percentage}%
                  </p>
                </div>
              </div>

              {update.blockers && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 border border-red-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                    Blockers Identified
                  </p>
                  <p className="mt-1 text-sm text-red-800">{update.blockers}</p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Next Steps
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {update.next_steps}
                </p>
              </div>
            </div>
          ))
        ) : (
          <EmptyTimelineState />
        )}
      </div>
    </div>
  );
};

export default SolverExecutionProgressTimeline;
