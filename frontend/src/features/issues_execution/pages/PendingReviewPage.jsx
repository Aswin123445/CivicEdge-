import IssueFilters from "../components/pending_review_page/IssueFilters";
import PendingReviewSkeleton from "../components/pending_review_page/PendingReviewSkeleton";
import PageHeader from "../components/pending_review_page/PageHeader";
import EmptyState from "../components/pending_review_page/EmptyState";
import IssueTable from "../components/pending_review_page/IssueTable";
import SummaryMetrics from "../components/pending_review_page/SummaryMetrics";
import usePendingReviewService from "../hooks/admin/pending_review_page/serviceHooks";
import { useSearchParams } from "react-router-dom";
import TableSkeleton from "../components/pending_review_page/TableSkelton";
const PendingReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    issues: PendingIssues,
    PendingIssuesLoading,
    PendingIssuesFetching,
    todayPending,
    totalPending,
    pagination,
    page,
    categoryData,
    categoryLoading,
    categoryFetching,
    goToPage,
  } = usePendingReviewService();
  const handleFilterChange = (tab) => {
    if (tab === "All") {
      setSearchParams((pre) => {
        pre.delete("category");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("category", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  const handleOderingChange = (ordering) => {
    setSearchParams((pre) => {
      pre.set("ordering", ordering);
      return pre;
    });
  };
  return (
    <div className="flex  bg-[#1e1e1e] text-slate-200 font-sans">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-2 lg:p-8 space-y-4">
          <PageHeader total={totalPending} />

          {PendingIssuesLoading  ? (
            <PendingReviewSkeleton />
          ) : (
            <>
              <SummaryMetrics
                totalPending={totalPending}
                submittedToday={todayPending}
              />

              <IssueFilters
                activeTab={searchParams.get("category") ?? "All"}
                onTabChange={(tab) => handleFilterChange(tab)}
                categories={categoryData}
                search={pagination.searchValue}
                setSearchValue={pagination.setSearchValue}
                handleOderingChange={handleOderingChange}
                activeSort={
                  searchParams.get("ordering") === "-created_at"
                    ? "Newest"
                    : "Oldest"
                }
              />

              {PendingIssues.length === 0 ? (
                <EmptyState />
              ) : PendingIssuesFetching ? (
                <TableSkeleton />
              ) : (
                <IssueTable
                  issues={PendingIssues}
                  pagination={pagination}
                  goToPage={goToPage}
                  page={page}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PendingReviewPage;
