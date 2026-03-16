import AdminProofHeader from "../components/AdminExecutionProofLIstPage/AdminProofHeader";
import AdminProofTable from "../components/AdminExecutionProofLIstPage/AdminProofTable";
import TableSkeleton from "../components/AdminExecutionProofLIstPage/TableSkeleton";
import EmptyState from "../components/AdminExecutionProofLIstPage/EmptyState";
import useAdminExecutionProofList from "../hooks/admin/admin_execution_proof_list/adminProofListHook";
import Pagination from "../../../components/common/PaginationBar";

const AdminExecutionProofListPage = () => {
  const {
    adminFinalReport,
    adminFinalReportLoading,
    adminFinalReportFetching,
    total_count,
    pagination,
  } = useAdminExecutionProofList();

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* COMPONENT: PageHeader 
          Move to: components/admin/execution/PageHeader.jsx
        */}
        <AdminProofHeader metadata={total_count} />

        {/* COMPONENT: ExecutionProofListCard 
          Move to: components/admin/execution/ExecutionProofListCard.jsx
        */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
          {adminFinalReportLoading || adminFinalReportFetching ? (
            <TableSkeleton />
          ) : adminFinalReport?.length > 0 ? (
            <AdminProofTable proofs={adminFinalReport} />
          ) : (
            <EmptyState />
          )}
        </div>
        {/* pagination */}
        {!pagination.isSinglePage &&
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          isFirstPage={pagination.isFirstPage}
          isLastPage={pagination.isLastPage}
          onPageChange={pagination.goToPage}
        />}
      </div>
    </div>
  );
};

/**
 * COMPONENT: TableSkeleton
 * Follows the established design language for loading states.
 */

export default AdminExecutionProofListPage;
