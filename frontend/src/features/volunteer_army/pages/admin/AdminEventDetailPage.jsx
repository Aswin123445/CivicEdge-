// pages/admin/AdminEventDetailPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAdminEventDetails from "../../hooks/admin/eventDetails";
import EventDetailPageHeader, { EventDetailPageHeaderSkeleton } from "../../components/admin_event_details_page/EventDetailPageHeader";
import EventOverviewSection, { EventOverviewSectionSkeleton } from "../../components/admin_event_details_page/EventOverviewSection";
import EventLocationSection, { EventLocationSectionSkeleton } from "../../components/admin_event_details_page/EventLocationSection";
import EventScheduleSection, { EventScheduleSectionSkeleton } from "../../components/admin_event_details_page/EventScheduleSection";
import ParticipantsSummaryCard, { ParticipantsSummaryCardSkeleton } from "../../components/admin_event_details_page/ParticipantsSummaryCard";
import EventMetadataCard, { EventMetadataCardSkeleton } from "../../components/admin_event_details_page/EventMetadataCard";
import AdminActionsPanel, { AdminActionsPanelSkeleton } from "../../components/admin_event_details_page/AdminActionsPanel";
import EventConfirmModal from "../../components/admin_event_details_page/EventConfirmModal";
import EventSponsorSection  from "../../components/admin_event_details_page/EventSponsorSection";

const MODAL_CLOSED = { isOpen: false, type: null };

const AdminEventDetailPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  // RTK Query hook
  const { eventData, eventDetailsLoading, eventDetailsFetching,handleConfirm } =
    useAdminEventDetails(id);

  // Use real data when available, fallback to mock
  const event = eventData ?? [];

  // Local state for optimistic status updates until mutation is integrated
  const [modal, setModal]             = useState(MODAL_CLOSED);

  const isLoading = eventDetailsLoading;

  // ─── Handlers ────────────────────────────────────────
  const openPublish = () => setModal({ isOpen: true, type: "publish" });
  const openCancel  = () => setModal({ isOpen: true, type: "cancel" });
  const closeModal  = () => setModal(MODAL_CLOSED);



  const handleViewParticipants = () => {
    navigate(`/dashboard/volunteer/events/${id}/participants`);
  };
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 font-sans p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Background refetch indicator */}
        {eventDetailsFetching && !eventDetailsLoading && (
          <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
        )}

        {/* PAGE HEADER */}
        {isLoading ? (
          <EventDetailPageHeaderSkeleton />
        ) : (
          <EventDetailPageHeader
            event={event}
            onPublish={openPublish}
            onCancel={openCancel}
          />
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {isLoading ? <EventOverviewSectionSkeleton />   : <EventOverviewSection event={event} />}
            {isLoading ? <EventLocationSectionSkeleton />   : <EventLocationSection event={event} />}
            {isLoading ? <EventScheduleSectionSkeleton />   : <EventScheduleSection event={event} />}

            {/* Sponsor — only renders if sponsor data exists */}
            {!isLoading && <EventSponsorSection event={event} />}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {isLoading ? (
              <ParticipantsSummaryCardSkeleton />
            ) : (
              <ParticipantsSummaryCard
                event={event}
                onViewParticipants={handleViewParticipants}
              />
            )}

            {isLoading ? <EventMetadataCardSkeleton />    : <EventMetadataCard event={event} />}
            {isLoading ? <AdminActionsPanelSkeleton />    : (
              <AdminActionsPanel
                event={event}
                onPublish={openPublish}
                onCancel={openCancel}
              />
            )}
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <EventConfirmModal
        modal={modal}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AdminEventDetailPage;