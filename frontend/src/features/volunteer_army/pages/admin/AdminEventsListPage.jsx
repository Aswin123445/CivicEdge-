// pages/admin/AdminEventsListPage.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import useVolunteerEventList from "../../hooks/admin/volunteerEventList";
import EventMetricsCards, {
  EventMetricsCardsSkeleton,
} from "../../components/admin_event_list_page/EventMetricsCards";
import EventFiltersBar from "../../components/admin_event_list_page/EventFiltersBar";
import EventTable, {
  EventTableSkeleton,
} from "../../components/admin_event_list_page/EventTable";
import ConfirmActionModal from "../../components/admin_event_list_page/ConfirmActionModal";
import Pagination from "../../../../components/common/PaginationBar";

const MODAL_CLOSED = { isOpen: false, type: "", eventTitle: "" };

const AdminEventsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useState(MODAL_CLOSED);

  // RTK Query hook
  const {
    eventData,
    eventListLoading,
    eventListFetching,
    pagination,
    matrix,
    handleCreateEvent,
    navigate,
    handlePublish,
    publishEventLoading,
    handleCancel,
    handleEdit

  } = useVolunteerEventList();

  // Use real data when available, fallback to mock
  const events = Array.isArray(eventData) ? eventData : [];

  const handleView = (event) => {
    navigate(`/admin/volunteer/events/${event.id}`);
  };

  const handleConfirmAction = (type) => {
    console.log("Confirmed action:", type);
    // dispatch publishEvent / cancelEvent mutation here
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

  // Show skeleton on first load OR background refetch
  const showSkeleton = eventListLoading || eventListFetching;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-100">
              Events
            </h1>
            <p className="text-slate-400 font-medium">
              Manage and monitor all volunteer events
            </p>
          </div>
          <button
            onClick={handleCreateEvent}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <Plus size={20} strokeWidth={3} />
            Create Event
          </button>
        </div>

        {/* METRICS — skeleton on loading OR fetching */}
        {showSkeleton ? (
          <EventMetricsCardsSkeleton />
        ) : (
          <EventMetricsCards matrix={matrix} />
        )}

        {/* FILTERS — always visible, no skeleton needed */}
        <EventFiltersBar
          search={pagination.searchValue}
          statusFilter={pagination.searchParams.get("status") || "ALL"}
          onSearch={pagination.setSearchValue}
          onStatusChange={handleFilterChange}
        />

        {/* TABLE — skeleton on loading OR fetching */}
        {showSkeleton ? (
          <EventTableSkeleton />
        ) : (
          <EventTable
            events={events}
            isFetching={eventListFetching}
            onView={handleView}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onCancel={handleCancel}
            onCreateEvent={handleCreateEvent}
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

        {/* CONFIRM MODAL */}
        <ConfirmActionModal
          modal={modal}
          onClose={() => setModal(MODAL_CLOSED)}
          onConfirm={handleConfirmAction}
        />
      </div>
    </div>
  );
};

export default AdminEventsListPage;
