import { Plus } from "lucide-react";
import useAdminFetchPolls from "../hooks/admin/adminFetchPolls";
import MetricsSection from "../components/admin_poll_list_age/MetricsSection";
import PollControlsBar from "../components/admin_poll_list_age/PollControlsBar";
import PollTable from "../components/admin_poll_list_age/PollTable";
import ClosePollModal from "../components/admin_poll_list_age/ClosePollModal";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/common/PaginationBar";
const AdminPollManagement = () => {
  const {
    adminPolls,
    adminFetchPollsLoading,
    adminFetchPollsFetching,
    pagination,
    totalCount,
    activeCount,
    closedCount,
    navigate,
    handleCreatePoll,
    pollToClose,
    setPollToClose,
    handleConfirmClose,
    isModalOpen,
    setIsModalOpen,
    closePollLoading
  } = useAdminFetchPolls();
  const [searchParams, setSearchParams] = useSearchParams();
  // Resolve data
  const isLoading = adminFetchPollsLoading || adminFetchPollsFetching;

  const handleViewDetail = (poll) => {
    navigate(`/dashboard/polls/${poll.id}`);
  };

  const handleActionClose = (poll) => {
    setPollToClose(poll);
    setIsModalOpen(true);
  };

  const handleCancelClose = () => {
    setIsModalOpen(false);
    setPollToClose(null);
  };


  const handleFilterChange = (tab) => {
    if (tab === "all") {
      setSearchParams((pre) => {
        pre.delete("status");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("status", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  return (
    <div className="bg-[#1e1e1e] text-slate-100 font-sans selection:bg-blue-500/30 min-h-screen">
      {/* Sticky header */}
      <header className="border-b border-slate-800 bg-[#1e1e1e]/50 backdrop-blur-md sticky top-0 z-30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Poll Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage and monitor all civic polls in the system
            </p>
          </div>
          <button
            onClick={handleCreatePoll}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> Create Poll
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Metrics */}
        <MetricsSection
          totalCount={isLoading ? null : totalCount}
          activeCount={isLoading ? null : activeCount}
          closedCount={isLoading ? null : closedCount}
          isLoading={isLoading}
        />

        {/* Controls */}
        <PollControlsBar
          searchQuery={pagination.searchValue}
          onSearch={pagination.setSearchValue}
          statusFilter={pagination.searchParams.get("status") ?? "all"}
          // sortBy={sortBy}
          onFilter={handleFilterChange}
          // onSort={setSortBy}
          isLoading={isLoading}
        />

        {/* Table */}
        <PollTable
          polls={isLoading ? null : adminPolls}
          isLoading={isLoading}
          skeletonCount={5}
          onActionClose={handleActionClose}
          onViewDetail={handleViewDetail}
        />
        {!pagination.isSinglePage && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            onPageChange={pagination.goToPage}
          />
        )}
      </main>

      {/* Close poll modal */}
      <ClosePollModal
        poll={pollToClose}
        isOpen={isModalOpen}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
        closePollLoading={closePollLoading}
      />
    </div>
  );
};

export default AdminPollManagement;
