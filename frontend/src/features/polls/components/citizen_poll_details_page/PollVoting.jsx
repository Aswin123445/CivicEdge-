import { ChevronRight } from "lucide-react";
import { PollOptionsSkeleton } from "./PollDetailSkeleton";

/**
 * OptionCard - single selectable vote option
 */
const OptionCard = ({ option, isSelected, onSelect, votePollLoading }) => {
  if (!option) return null;

  const { id, option_text: label = "" } = option;

  return (
    <button
      onClick={() => onSelect?.(id)}
      disabled={votePollLoading}
      className={`flex items-center justify-between p-6 rounded-2xl border-2 text-left transition-all duration-200 group w-full ${
        isSelected
          ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <span
        className={`font-bold transition-colors ${
          isSelected ? "text-blue-700" : "text-slate-700"
        }`}
      >
        {label}
      </span>

      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4 ${
          isSelected ? "border-blue-600 bg-blue-600" : "border-slate-200"
        }`}
      >
        {isSelected &&
          (votePollLoading ? (
            <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <div className="w-2 h-2 bg-white rounded-full" />
          ))}
      </div>
    </button>
  );
};
/**
 * PollVoting
 *
 * Props:
 *   options          { id, label }[] | null
 *   selectedOption   number | null
 *   isSubmitting     boolean
 *   isLoading        boolean
 *   onSelectOption   (optionId) => void
 *   onSubmit         () => void
 */
const PollVoting = ({
  options = null,
  selectedOption = null,
  isSubmitting = false,
  isLoading = false,
  onSelectOption,
  onSubmit,
  votePollLoading,
  expires,
  navigateToList
}) => {
  if (isLoading) return <PollOptionsSkeleton count={options?.length ?? 3} />;
  const safeOptions = options ?? [];
  const diffMs = new Date(expires) - new Date();
  const isLive = diffMs > 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-900">Make your decision</h2>
        <p className="text-slate-500 text-sm">
          Select an option below to submit your vote. This action cannot be
          undone.
        </p>
      </div>

      <div className="grid gap-4">
        {safeOptions.map((option) => (
          <OptionCard
            key={option?.id}
            option={option}
            isSelected={selectedOption === option?.id}
            onSelect={onSelectOption}
            isSubmitting={votePollLoading}
          />
        ))}
      </div>
      {!isLive && (<div>
        <button className="w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98]"
        onClick={()=>navigateToList()}
        >                 
          See Upcoming Polls
        </button>
      </div>)}
      {votePollLoading && (
        <button
          disabled
          className="w-full bg-blue-600 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
        >
          <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </button>
      )}
      {!isSubmitting && isLive &&(<button
        onClick={onSubmit}
        disabled={!selectedOption || isSubmitting || !isLive}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
          !selectedOption || isSubmitting 
            ? `bg-slate-200 text-slate-400 cursor-not-allowed `
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98]"
        } ${votePollLoading ? "cursor-not-allowed bg-blue-600" : ""}`}
      >

            Submit My Vote <ChevronRight size={20} />
      </button>)}
    </section>
  );
};

export default PollVoting;
