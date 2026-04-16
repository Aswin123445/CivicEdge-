import useMyPollList from "../hooks/citizen/myPollList";
import MyVotesEmptyState from "../components/citizen_my_vote_page/MyVotesEmptyState";
import MyVotesHeader from "../components/citizen_my_vote_page/MyVotesHeader";
import VoteSection from "../components/citizen_my_vote_page/VoteSection";
import { useSearchParams } from "react-router-dom";
import MyVoteSearch from "../components/citizen_my_vote_page/MyVoteSearch";


const MyVotesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    myVotes,
    myVotesLoading,
    myVotesFetching,
    pagination,
    activeCount,
    closedCount,
    totalCount,
    handleViewPoll,
    navigate
  } = useMyPollList();

  const isLoading = myVotesLoading || myVotesFetching;

  // Resolve: prefer live hook data → dummy fixtures
  const data = myVotes ?? [];

  // Handlers


  const handleExplorePolls = () => {
    navigate("/admin/polls");
  };
  // Empty state — only show when not loading and genuinely empty
  const handleFilterChange = (tab) => {
    if (tab === "-voted_at") {
      setSearchParams((pre) => {
        pre.delete("voted_at");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("voted_at", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased pb-20">
      {/* Header + stats */}
      <MyVotesHeader
        totalCount={isLoading ? null : totalCount}
        activeCount={isLoading ? null : activeCount}
        closedCount={isLoading ? null : closedCount}
        isLoading={isLoading}
      />
      <main className="max-w-5xl mx-auto px-6 mt-12 space-y-16">
        {/* Active votes */}

        <MyVoteSearch
          searchQuery={searchParams.get("search") || ""}
          sortBy={searchParams.get("voted_at") || "-voted_at"}
          onSearch={pagination.setSearchValue}
          onSort={handleFilterChange}
        />
        {!isLoading && totalCount === 0 && (
          <MyVotesEmptyState onExplorePolls={handleExplorePolls} />
        )}
        <VoteSection
          votes={ data}
          isLoading={isLoading}
          withDivider={false}
          onViewPoll={handleViewPoll}
        />
      </main>
    </div>
  );
};

export default MyVotesPage;
