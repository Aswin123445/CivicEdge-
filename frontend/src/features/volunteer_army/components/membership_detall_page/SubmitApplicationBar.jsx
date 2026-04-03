// components/volunteer/SubmitApplicationBar.jsx

/**
 * Shown only when status === "PENDING"
 * @param {boolean}  hasEvidences
 * @param {boolean}  isSubmitting
 * @param {function} onSubmit
 */
const SubmitApplicationBar = ({ hasEvidences, isSubmitting, onSubmit }) => (
  <div className="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="text-sm text-slate-500">
      <p className="font-bold text-slate-900">Ready to submit?</p>
      <p>Make sure you've uploaded all required documents.</p>
    </div>
    <button
      onClick={onSubmit}
      disabled={!hasEvidences || isSubmitting}
      className={`px-10 py-3 rounded-xl font-bold transition-all shadow-lg ${
        !hasEvidences || isSubmitting
          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
      }`}
    >
      {isSubmitting ? "Submitting..." : "Submit Application"}
    </button>
  </div>
);

export default SubmitApplicationBar;
