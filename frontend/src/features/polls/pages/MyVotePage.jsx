import useMyPollList from "../hooks/citizen/myPollList";
import MyVotesEmptyState from "../components/citizen_my_vote_page/MyVotesEmptyState";
import MyVotesHeader from "../components/citizen_my_vote_page/MyVotesHeader";
import VoteSection from "../components/citizen_my_vote_page/VoteSection";
import PollSearchBar from "../components/citizen_poll_list_page/PollSearchBar";
import { useSearchParams } from "react-router-dom";
import MyVoteSearch from "../components/citizen_my_vote_page/MyVoteSearch";
const DUMMY_DATA = {
  count: 3,
  results: [
    {
      id: "VT-101",
      poll_id: "POL-2026-001",
      reference_id: "REF-9920",
      question:
        "Should the city implement a 'Quiet Zone' policy in the Downtown Residential District?",
      selected_option: {
        option_id: "OPT-1",
        label: "Yes, implement the full policy",
      },
      voted_at: "2026-04-05T10:30:00Z",
      expires_at: "2026-04-15T23:59:59Z",
      is_expired: false,
      total_votes: 1240,
    },
    {
      id: "VT-102",
      poll_id: "POL-2026-005",
      reference_id: "REF-4412",
      question: "Transitioning Sector 4 Community Parks to 100% Solar Lighting",
      selected_option: {
        option_id: "OPT-A",
        label: "Support with immediate effect",
      },
      voted_at: "2026-03-28T14:20:00Z",
      expires_at: "2026-04-12T23:59:59Z",
      is_expired: false,
      total_votes: 856,
    },
    {
      id: "VT-103",
      poll_id: "POL-2026-012",
      reference_id: "REF-1102",
      question: "Mandatory Waste Segregation at Source for Apartment Complexes",
      selected_option: {
        option_id: "OPT-2",
        label: "Support with 6-month grace period",
      },
      voted_at: "2026-02-15T09:00:00Z",
      expires_at: "2026-03-01T23:59:59Z",
      is_expired: true,
      total_votes: 3105,
    },
  ],
};

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
  } = useMyPollList();

  const isLoading = myVotesLoading || myVotesFetching;

  // Resolve: prefer live hook data → dummy fixtures
  const data = myVotes ?? [];

  // Handlers


  const handleExplorePolls = () => {
    // TODO: navigate to /polls
    console.log("Navigate to polls list");
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
