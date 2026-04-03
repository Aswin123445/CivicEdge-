// pages/admin/AdminPendingMembershipsPage.jsx
import { useState } from "react";
import useAdminPendingMemberships from "../../hooks/admin/adminPendingMembership";
import MembershipsFiltersBar from "../../components/admin_pending_memberships/MembershipsFiltersBar";
import MembershipsTable from "../../components/admin_pending_memberships/MembershipsTable";
import RejectConfirmModal from "../../components/admin_pending_memberships/RejectConfirmModal";
import { useSearchParams } from "react-router-dom";
import TableSkeleton from "../../../issues_execution/components/pending_review_page/TableSkelton";
import MembershipRequestsSkeleton from "../../components/admin_pending_memberships/MembershipRequestsSkeleton";
import Pagination from "../../../../components/common/PaginationBar";

const AdminPendingMembershipsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // RTK Query hook
  const {
    pendingMemberships,
    pendingMembershipsLoading,
    pendingMembershipsFetching,
    pagination,
    handleApprove,
    approveMembershipLoading,
    handleConfirmReject,
    activeRequest,
    setActiveRequest
  } = useAdminPendingMemberships();

  // Use real data when available, fallback to mock
  const allRequests = Array.isArray(pendingMemberships)
    ? pendingMemberships
    : [];


  const handleOpenReject = (req) => {
    setActiveRequest(req);
  };


  const handleFilterChange = (tab) => {
    setSearchParams((pre) => {
      pre.set("ordering", tab);
      pre.set("page", "1");
      return pre;
    });
  };

  const emptyMessage = "No pending membership requests";
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 font-sans antialiased p-4 md:p-8">
      {/* Background refetch indicator */}
      {pendingMembershipsFetching && !pendingMembershipsLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* PAGE HEADER */}
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            Pending Membership Requests
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Review and manage membership applications for the CivicEdge network.
          </p>
        </header>

        {/* FILTERS */}
        <MembershipsFiltersBar
          search={pagination.searchValue}
          sort={pagination.searchParams.get("ordering") || "-created_at"}
          onSearch={pagination.setSearchValue}
          onSortChange={handleFilterChange}
        />

        {/* TABLE */}
        <MembershipsTable
          data={allRequests}
          isLoading={pendingMembershipsLoading}
          isFetching={pendingMembershipsFetching}
          processingId={approveMembershipLoading}
          emptyMessage={emptyMessage}
          onApprove={handleApprove}
          onReject={handleOpenReject}
        />
      </div>
        {pagination.isSinglePage && (
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
      {/* REJECT CONFIRM MODAL */}
      <RejectConfirmModal
        activeRequest={activeRequest}
        onClose={() => setActiveRequest(null)}
        onConfirm={handleConfirmReject}
        rejectMembershipLoading={approveMembershipLoading}
      />
    </div>
  );
};

export default AdminPendingMembershipsPage;
