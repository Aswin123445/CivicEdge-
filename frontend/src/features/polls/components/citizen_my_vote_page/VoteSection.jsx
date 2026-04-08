import { Archive } from "lucide-react";
import VoteCard from "./VoteCard";
import { VoteSectionSkeleton } from "./MyVotesSkeleton";

/**
 * VoteSection
 *
 * Props:
 *   votes        Vote[] | null
 *   variant      "active" | "closed"
 *   isLoading    boolean
 *   withDivider  boolean
 *   onViewPoll   (vote) => void
 */
const VoteSection = ({
  votes = null,
  isLoading = false,
  withDivider = false,
  onViewPoll,
}) => {
  if (isLoading)
    return <VoteSectionSkeleton count={2} withDivider={withDivider} />;

  const safeVotes = votes ?? [];
  if (safeVotes.length === 0) return null;

  return (
    <section>
      {withDivider && (
        <div className="border-t border-slate-200 mb-10" />
      )}

      {/* Section heading */}
      <div className="flex items-center gap-3 mb-6">
        

            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-bold text-slate-800">
              My Participations
            </h2>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeVotes.map((vote) => (
          <VoteCard
            key={vote?.id ?? Math.random()}
            vote={vote}
            onViewPoll={onViewPoll}
          />
        ))}
      </div>
    </section>
  );
};

export default VoteSection;
