// pages/volunteer/EventDetailPage.jsx
import { useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import useVolunteerEventDetails from "../../hooks/citizen/volulnteerEventDetails";
import EventDetailHeader, { EventDetailHeaderSkeleton } from "../../components/event_detail_page/EventDetailHeader";
import EventDetailCountdown from "../../components/event_detail_page/EventDetailCountdown";
import EventAboutSection, { EventAboutSkeleton } from "../../components/event_detail_page/EventAboutSection";
import DynamicActionSection, { DynamicActionSkeleton } from "../../components/event_detail_page/DynamicActionSection";
import EventSidebarPanel, { EventSidebarPanelSkeleton } from "../../components/event_detail_page/EventSidebarPanel";

const EventDetailPage = () => {
  const { event_id } = useParams();

  const {
    volunteerEvent,
    volunteerEventLoading,
    volunteerEventFetching,
    handleJoin,
    joinEventLoading,
    handleLeave,
    leaveEventLoading,
    handleSubmitAttendance,
    submitAttendanceLoading,
    isCloudinaryUplaoding,
    handleAllRecognitions,
    navigate,
    handleViewRecognition,
    handleMyEvents
  } = useVolunteerEventDetails(event_id);

  // Use real API data if loaded, fallback to mock during development
  const event = volunteerEvent 
  const isLoading = volunteerEventLoading;
  const runtimeStatus = event?.runtime_status;
  return (
    <div className="min-h-screen bg-white">

      {/* Background refetch indicator */}
      {volunteerEventFetching && !volunteerEventLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      {/* Back nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="mr-1 group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-semibold tracking-tight">
            Back to events
          </span>
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT COLUMN ───────────────────────────── */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* Header */}

            <EventDetailHeader event={event} />

            {/* Countdown — only show when not loading and status matches */}
            {!isLoading && runtimeStatus === "UPCOMING" && event?.start_time && (
              <EventDetailCountdown
                targetTime={event.start_time}
                label="Event starts in"
              />
            )}
            {!isLoading && runtimeStatus === "ONGOING" && event?.end_time && (
              <EventDetailCountdown
                targetTime={event.end_time}
                label="Live Now • Ends in"
              />
            )}

            {/* About */}
            {isLoading || volunteerEventFetching
              ? <EventAboutSkeleton />
              : <EventAboutSection description={event?.description} />
            }

            {/* Dynamic action section */}
            {isLoading || volunteerEventFetching || joinEventLoading 
              ? <DynamicActionSkeleton />
              : (
                <DynamicActionSection
                  event={event}
                  onJoin={handleJoin}
                  onLeave={handleLeave}
                  onSubmitAttendance={handleSubmitAttendance}
                  onViewRecognition={handleViewRecognition}
                  onAllRecognitions={handleAllRecognitions}
                  onBackButtonClick={() => navigate(-1)}  
                  submitAttendanceLoading={submitAttendanceLoading}
                  isCloudinaryUplaoding={isCloudinaryUplaoding}
                  handleMyEvents ={handleMyEvents}
                />
              )
            }

            {/* Sidebar (mobile — shown in content flow) */}
            <div className="lg:hidden">
              {isLoading || volunteerEventFetching
                ? <EventSidebarPanelSkeleton />
                : <EventSidebarPanel event={event} />
              }
            </div>
          </div>

          {/* ── RIGHT SIDEBAR (desktop) ────────────────── */}
          <div className="hidden lg:block lg:col-span-4">
            {isLoading || volunteerEventFetching
              ? <EventSidebarPanelSkeleton />
              : <EventSidebarPanel event={event} />
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;