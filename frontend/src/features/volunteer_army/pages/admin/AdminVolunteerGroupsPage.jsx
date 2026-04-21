import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useVolunteerGroupList from "../../hooks/admin/volunteerGroupList";
import MetricsCards, {
  MetricsCardsSkeleton,
} from "../../components/admin_group_list_page/MetricsCards";
import GroupFiltersBar from "../../components/admin_group_list_page/GroupFiltersBar";
import GroupTable, {
  GroupTableSkeleton,
} from "../../components/admin_group_list_page/GroupTable";
import CreateGroupModal from "../../components/admin_group_list_page/CreateGroupModal";
import Pagination from "../../../../components/common/PaginationBar";
import { useSearchParams } from "react-router-dom";

const AdminVolunteerGroupsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // RTK Query hook
  const {
    groupData,
    groupisLoading,
    groupisFetching,
    pagination,
    handleCreateSubmit,
    createGroupLoading,
    isModalOpen,
    setModalOpen,
    handleActivate,
    activateGroupLoading,
    activeDropdown,
    setActiveDropdown,
    dropdownRef,
    handleArchive,
    archiveGroupLoading,
    metrix

  } = useVolunteerGroupList();

  // Use real data when available, fallback to mock
  const groups = Array.isArray(groupData) ? groupData : [];

  // ─── Handlers ────────────────────────────────────────

  const handleView = (group) => {
    navigate(`/dashboard/volunteer-groups/${group.id}`);
  };

  const handleFilterChange = (tab) => {
    if (tab === "ALL") {
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
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-6 lg:p-10 font-sans">
      {/* Background refetch indicator */}
      {groupisFetching && !groupisLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">
              Volunteer Groups
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Manage and control all volunteer groups in the system
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            Create Group
          </button>
        </div>

        {/* METRICS */}
        {groupisLoading ? (
          <MetricsCardsSkeleton />
        ) : (
          <MetricsCards metrix={metrix} />
        )}

        {/* FILTERS */}
        <GroupFiltersBar
          search={pagination.searchValue}
          statusFilter={pagination.searchParams.get("status") ?? "ALL"}
          onSearch={pagination.setSearchValue}
          onStatusChange={handleFilterChange}
        />

        {/* TABLE */}
        {groupisLoading || groupisFetching || createGroupLoading || activateGroupLoading || archiveGroupLoading ? (
          <GroupTableSkeleton />
        ) : (
          <GroupTable
            groups={groupData}
            onView={handleView}
            onActivate={handleActivate}
            onArchive={handleArchive}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            dropdownRef={dropdownRef}
            activateGroupLoading={activateGroupLoading}
            archiveGroupLoading={archiveGroupLoading}
          />
        )}
        {/* pagination */}
        {!pagination.isSinglePage && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            onPageChange={pagination.goToPage}
          />
        )}
        {/* MODAL */}
        <CreateGroupModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateSubmit}
          createGroupLoading={createGroupLoading}
        />
      </div>
    </div>
  );
};

export default AdminVolunteerGroupsPage;
