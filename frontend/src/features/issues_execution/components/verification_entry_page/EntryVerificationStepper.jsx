import React from "react";

const EntryVerificationStepper = ({ steps, draftStatus, isLoading }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
        Verification Progress
      </h2>

      <div className="relative">
        {/* Stepper Track */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 lg:hidden"></div>

        <div className="space-y-8 lg:space-y-0 lg:flex lg:justify-between lg:items-start relative">
          {steps.map((step, index) => {
            const isCompleted =
              draftStatus && step.key && draftStatus[step.key];
            const isCurrent =
              !isLoading &&
              draftStatus &&
              !isCompleted &&
              (index === 0 ||
                (steps[index - 1].key && draftStatus[steps[index - 1].key]));

            return (
              <div
                key={step.id}
                className="flex lg:flex-col items-center lg:text-center gap-4 lg:gap-2 lg:flex-1 relative"
              >
                {/* Step Icon/Circle */}
                <div
                  className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isCurrent
                        ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50"
                        : "bg-white border-slate-200 text-slate-300"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="flex flex-col lg:items-center">
                  <span
                    className={`text-sm font-bold ${isCurrent ? "text-blue-600" : isCompleted ? "text-slate-900" : "text-slate-400"}`}
                  >
                    {step.label}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-blue-500 font-bold uppercase lg:hidden">
                      Resume Here
                    </span>
                  )}
                </div>

                {/* Horizontal Line for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-4 left-[60%] w-[80%] h-0.5 bg-slate-100 -z-0"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EntryVerificationStepper;
