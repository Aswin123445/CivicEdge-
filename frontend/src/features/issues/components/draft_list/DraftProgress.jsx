import React from "react";

const DraftProgress = ({
  progress = 0,
  currentStep,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current step */}
      {currentStep && (
        <p className="text-[10px] text-slate-400 truncate">
          At: {currentStep}
        </p>
      )}
    </div>
  );
};

export default DraftProgress;