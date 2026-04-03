// pages/admin/EventAttendancePage.jsx
import { useState, useMemo } from "react";

// RTK Query hook
import useAdminEventPendingAttendance from "../../hooks/admin/adminEventPendingAttendance";
import AttendanceFiltersBar from "../../components/admin_event_pending_attendance/AttendanceFiltersBar";
import AttendanceTable, { AttendanceTableSkeleton } from "../../components/admin_event_pending_attendance/AttendanceTable";
import ImagePreviewModal from "../../components/admin_event_pending_attendance/ImagePreviewModal(1)";
import RejectAttendanceModal from "../../components/admin_event_pending_attendance/RejectAttendanceModal";
import Pagination from "../../../../components/common/PaginationBar";



const EventAttendancePage = () => {
  // RTK Query hook
  const {
    eventAttendance,
    eventAttendanceLoading,
    eventAttendanceFetching,
    pagination,
    handleVerify,
    processingId,
    setProcessingId,
    handleConfirmReject,
    rejectTarget,
    setRejectTarget,
  } = useAdminEventPendingAttendance();

  // ─── UI state ─────────────────────────────────────
  const [previewImage, setPreviewImage]   = useState(null);

  const isLoading = eventAttendanceLoading || eventAttendanceFetching;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-4 md:p-8 font-sans antialiased">

      {/* Background refetch indicator */}
      {eventAttendanceFetching && !eventAttendanceLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        {/* PAGE HEADER */}
        <header>
          <h1 className="text-2xl font-black tracking-tight italic text-slate-100">
            Event Attendance
          </h1>
        </header>

        {/* FILTERS */}
        <AttendanceFiltersBar
          search={pagination.searchValue}
          onSearch={pagination.setSearchValue}
        />

        {/* TABLE */}
        {isLoading ? (
          <AttendanceTableSkeleton />
        ) : (
          <AttendanceTable
            data={eventAttendance}
            isLoading={isLoading}
            isFetching={eventAttendanceFetching}
            processingId={processingId}
            onPreview={setPreviewImage}
            onVerify={handleVerify}
            onReject={setRejectTarget}
          />
        )}
      </div>
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

      {/* MODALS */}
      <ImagePreviewModal
        url={previewImage}
        onClose={() => setPreviewImage(null)}
      />
      <RejectAttendanceModal
        target={rejectTarget}
        onConfirm={handleConfirmReject}
        onClose={() => setRejectTarget(null)}
      />
    </div>
  );
};

export default EventAttendancePage;