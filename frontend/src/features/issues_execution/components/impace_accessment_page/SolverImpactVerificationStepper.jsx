import React from "react";

const SolverImpactVerificationStepper = ({ steps }) => {
  return (
    <nav className="mb-8 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  step.status === "current"
                    ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-50"
                    : step.status === "completed"
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-white border-slate-200 text-slate-300"
                }`}
              >
                {step.status === "completed" ? "✓" : step.id}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-tighter hidden md:block ${
                  step.status === "current" ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx !== steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-2 ${step.status === "completed" ? "bg-green-500" : "bg-slate-100"}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default SolverImpactVerificationStepper;
