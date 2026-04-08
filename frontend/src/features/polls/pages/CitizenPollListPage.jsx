import { useState, useMemo } from "react";
import usePollList from "../hooks/citizen/pollList";
import PollSearchBar from "../components/citizen_poll_list_page/PollSearchBar";
import PollGrid from "../components/citizen_poll_list_page/PollGrid";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/common/PaginationBar";

const CitizenPollListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pollList, pollListLoading, pollListFetching, pagination, navigate } =
    usePollList();
  // Resolve: prefer live data, fall back to dummy
  const isLoading = pollListLoading || pollListFetching;
  const rawPolls = pollList ?? [];

  const handleFilterChange = (tab) => {
    if (tab === "-created_at") {
      setSearchParams((pre) => {
        pre.delete("ordering");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("ordering", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  const handleVote = (poll) => {
    navigate(`/polls/list/${poll.id}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* Page Header */}
      <header className="border-b border-slate-100 bg-white py-12 lg:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Active Community Polls
            </h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Participate in ongoing discussions shaping your community. Your
              input provides the data needed for informed civic decisions.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Search + Sort */}
        <PollSearchBar
          searchQuery={pagination.searchValue}
          sortBy={searchParams.get("ordering") || "newest"}
          onSearch={pagination.setSearchValue}
          onSort={handleFilterChange}
        />

        {/* Poll Grid */}
        <PollGrid
          polls={isLoading ? null : rawPolls}
          isLoading={isLoading}
          onVote={handleVote}
        />
        {!pagination.isSinglePage && (
          <div className=" bottom-0 py-4 ">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              isFirstPage={pagination.isFirstPage}
              isLastPage={pagination.isLastPage}
              onPageChange={pagination.goToPage}
              className="bg-white border border-gray-400"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default CitizenPollListPage;
