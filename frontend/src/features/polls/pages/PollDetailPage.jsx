import { ArrowLeft, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";

import PollDetailHeader from "../components/citizen_poll_details_page/PollDetailHeader";
import {
  PollContext,
  PollDidYouKnow,
} from "../components/citizen_poll_details_page/PollInfoSections";
import PollVoting from "../components/citizen_poll_details_page/PollVoting";
import PollResults from "../components/citizen_poll_details_page/PollResults";
import usePollDetails from "../hooks/citizen/pollDetails";

const PollDetailPage = () => {
  const { id } = useParams();
  const {
    poll,
    pollDetailsLoading,
    pollDetailsFetching,
    votePollLoading,
    handleVoteSubmit,
    selectedOption,
    setSelectedOption,
    navigateToList
  } = usePollDetails(id);
  const isLoading = pollDetailsLoading || pollDetailsFetching;
  const activePoll = poll ?? [];
  const hasVoted = activePoll?.has_voted ?? false;
  const userChoice = activePoll?.user_choice ?? null;

  // Handlers
  const handleBack = () => window.history.back();

  const handleShare = () => {
    navigator
      .share?.({ title: activePoll?.question, url: window.location.href })
      .catch(() => {
        /* share not supported */
      });
  };

  // Closes-at formatted string for meta footer
  const closesAt = activePoll?.expires_at
    ? new Date(activePoll.expires_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased pb-20">
      {/* Sticky nav */}
      <nav className="bg-white border-b border-slate-200 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} /> Back to Polls
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Share2 size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 mt-8">
        {/* Header */}
        <PollDetailHeader
          poll={isLoading ? null : activePoll}
          isLoading={isLoading}
        />

        {/* Context */}
        <PollContext
          context={isLoading ? null : activePoll?.context}
          isLoading={isLoading}
        />

        {/* Did You Know */}
        <PollDidYouKnow
          fact={isLoading ? null : activePoll?.did_you_know}
          isLoading={isLoading}
        />

        {/* Voting / Results — mutually exclusive */}
        {!hasVoted ? (
          <PollVoting
            options={isLoading ? null : activePoll?.options}
            selectedOption={selectedOption}
            isSubmitting={votePollLoading ?? false}
            isLoading={isLoading}
            onSelectOption={setSelectedOption}
            onSubmit={handleVoteSubmit}
            votePollLoading={votePollLoading}
            expires = {activePoll?.expires_at}
            navigateToList={navigateToList}
          />
        ) : (
          <PollResults
            results={isLoading ? null : activePoll?.results}
            totalVotes={activePoll?.total_votes ?? 0}
            userChoice={userChoice}
            isLoading={isLoading}
          />
        )}

        {/* Meta footer */}
        {closesAt && !isLoading && (
          <section className="mt-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Decision Closes: {closesAt} • Verified Community Data
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default PollDetailPage;
