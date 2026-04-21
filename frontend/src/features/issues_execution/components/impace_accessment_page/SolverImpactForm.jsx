import React from "react";

const SolverImpactForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  errors,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6 md:p-8 space-y-8">
        {/* --- Section: Public Impact Summary --- */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Public Impact Summary
            </h3>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600 font-medium">
              Describe how the issue affects the public.
            </label>
            <textarea
              name="public_impact_summary"
              value={formData.public_impact_summary}
              onChange={handleInputChange}
              placeholder="e.g., Blocked drainage causes water overflow during rainfall, affecting nearby homes and traffic movement."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm leading-relaxed"
              required
            ></textarea>
            {errors?.public_impact_summary && (
              <p className="text-red-500 text-xs mt-1">
                {errors.public_impact_summary}
              </p>
            )}
          </div>
        </section>

        {/* --- Section: Estimated People Affected --- */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Demographic Reach
            </h3>
          </div>
          <div className="max-w-xs space-y-2">
            <label className="text-sm text-slate-600 font-medium">
              Estimated people affected
            </label>
            <div className="relative">
              <input
                type="number"
                name="estimated_people_affected"
                value={formData.estimated_people_affected}
                onChange={handleInputChange}
                min="0"
                placeholder="e.g., 50"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase">
                Citizens
              </span>
              {errors?.estimated_people_affected && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.estimated_people_affected}
                </p>
              )}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Estimate based on nearby residents, businesses, or commuters.
            </p>
          </div>
        </section>

        {/* --- Section: Local Feedback Summary --- */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Field Feedback
            </h3>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600 font-medium">
              Summarize feedback gathered from local residents.
            </label>
            <textarea
              name="local_feedback_summary"
              value={formData.local_feedback_summary}
              onChange={handleInputChange}
              placeholder="e.g., Residents reported recurring flooding during heavy rain and requested immediate drainage maintenance."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm leading-relaxed"
              required
            ></textarea>
            {errors?.local_feedback_summary && (
              <p className="text-red-500 text-xs mt-1">
                {errors.local_feedback_summary}
              </p>
            )}
          </div>
        </section>
      </div>

      {/* --- Form Actions --- */}
      <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => {
            window.history.back();
          }}
          type="button"
          className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95 flex items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Save & Continue
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SolverImpactForm;
