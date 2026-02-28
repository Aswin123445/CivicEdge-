import React from "react";

const STEPS = [
  "Issue Details",
  "Mark Location",
  "Add Photos",
  "A Few Questions",
  "Review Issue",
];

const ProgressSteps = ({ currentStep }) => {
  return (
    <section>
      <div
        className="
          rounded-3xl p-6
          bg-gradient-to-br from-blue-50 via-blue-100/60 to-white
          border border-blue-200/60
          shadow-lg shadow-blue-900/5
        "
      >
        <div className="grid grid-cols-5 gap-3">
          {STEPS.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    isCompleted || isActive
                      ? "bg-blue-600"
                      : "bg-blue-200"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider text-center ${
                    isActive
                      ? "text-blue-700"
                      : "text-blue-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgressSteps;