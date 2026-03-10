import React from "react";

const SolverFormAction = ({ loading }) => {
  return (
    <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
      <button
        onClick={()=>{window.history.back()}}
        type="button"
        className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition shadow-sm"
      >
        Back
      </button>
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95 flex items-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          "Save & Continue"
        )}
      </button>
    </div>
  );
};

export default SolverFormAction;
