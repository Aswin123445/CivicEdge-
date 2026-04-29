import IssueFilters from "../components/pending_review_page/IssueFilters";
import PendingReviewSkeleton from "../components/pending_review_page/PendingReviewSkeleton";
import IssueTable from "../components/pending_review_page/IssueTable";
import SummaryMetrics from "../components/pending_review_page/SummaryMetrics";
import usePendingReviewService from "../hooks/admin/pending_review_page/serviceHooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableSkeleton from "../components/pending_review_page/TableSkelton";
import SearchBar from "../ui/pending_review_page/SearchBar";
import useAdminPendingVerification from "../hooks/admin/admin_pending_verification/adminPendingVerfication";
import ReportTable from "../components/AdminPendingVerification/ReportTable";
import PageHeader from "../components/AdminPendingVerification/PageHeader";
import EmptyState from "../components/AdminPendingVerification/EmptyState";
const AdminPendingVerification = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    pendingVerificationIssue,
    pendingVerificationIssueLoading,
    pendingVerificationIssueFetching,
    today_count,
    pagination,
    categoryData,
    categoryLoading,
    categoryFetching,
    totalPending
  } = useAdminPendingVerification();
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/dashboard/execution/verification-report/${id}`);
  }
  return (
    <div className="flex  bg-[#1e1e1e] text-slate-200 font-sans">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-2 lg:p-8 space-y-4">
          <PageHeader total={totalPending} />

          {pendingVerificationIssueLoading  ? (
            <PendingReviewSkeleton />
          ) : (
            <>
              <SummaryMetrics
                totalPending={totalPending}
                submittedToday={today_count}
              />

             <SearchBar search = {pagination?.searchValue} setSearchValue={pagination?.setSearchValue } />
              

              {pendingVerificationIssue?.length === 0 ? (
                <EmptyState />
              ) : pendingVerificationIssueFetching ? (
                <TableSkeleton />
              ) : (
                <ReportTable
                  tasks={pendingVerificationIssue}
                  pagination={pagination}
                  handleNavigate={handleNavigate}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPendingVerification;
