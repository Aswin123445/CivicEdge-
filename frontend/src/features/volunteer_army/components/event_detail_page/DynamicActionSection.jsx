import {
  Award,
  CheckCircle2,
  AlertCircle,
  Users,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import AttendanceReviewCard from "./AttendanceReviewCard";
import VerifiedImpactCard from "./VerifiedImpactCard";
import RegisteredOngoingCard from "./RegisteredOngoingCard";
import { useNavigate } from "react-router-dom";

// ─── Skeleton ─────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const DynamicActionSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
    <div className="flex flex-col items-center space-y-3">
      <Pulse className="w-16 h-16 rounded-full" />
      <Pulse className="h-6 w-48" />
      <Pulse className="h-4 w-64" />
    </div>
    <Pulse className="h-12 w-full rounded-xl" />
  </div>
);

// ─── Sub-cases ────────────────────────────────────────

// Case 1: Not joined yet
const NotJoinedCard = ({ runtimeStatus, onJoin }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
      <Award size={32} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900">
        Be part of something meaningful
      </h3>
      <p className="text-slate-500">
        Join this event and contribute to your community through direct action.
      </p>
    </div>
    {runtimeStatus !== "COMPLETED" ? (
      <button
        onClick={onJoin}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all w-full sm:w-auto"
      >
        Join Event
      </button>
    ) : (
      <p className="text-amber-600 font-semibold bg-amber-50 py-2 rounded-lg">
        This event has ended
      </p>
    )}
  </div>
);

// Case 2a: Registered + Upcoming
const RegisteredUpcomingCard = ({ onLeave }) => (
  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-start gap-4">
      <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm">
        <CheckCircle2 />
      </div>

      <div>
        <p className="font-bold text-blue-900">
          You're officially part of this civic mission
        </p>

        <p className="text-blue-800 text-sm mt-1 leading-relaxed">
          Your participation helps build a cleaner, safer, and more responsible
          community. Please make sure to be present at the assigned location on
          time and actively contribute to the task. Every small effort you make
          creates a meaningful impact.
        </p>

        <p className="text-blue-700 text-xs mt-2">
          📍 Be at the reported location within the scheduled time and follow
          the instructions provided.
        </p>
      </div>
    </div>

    <button
      onClick={onLeave}
      className="text-slate-500 hover:text-red-600 font-semibold text-sm transition-colors"
    >
      Leave Event
    </button>
  </div>
);
const EventFullCard = ({ onBackButtonClick }) => (
  <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-start gap-4">
      <div className="bg-white p-3 rounded-full text-amber-600 shadow-sm">
        <Users />
      </div>

      <div>
        <p className="font-bold text-amber-900">
          This event has reached full capacity
        </p>

        <p className="text-amber-800 text-sm mt-1 leading-relaxed">
          We’re grateful for your willingness to contribute. Unfortunately, the
          required number of volunteers has already been reached for this event.
          Your interest still matters—there are many other opportunities where
          you can make an impact.
        </p>

        <p className="text-amber-700 text-xs mt-2">
          💡 Explore other active events and continue being part of the change.
        </p>
      </div>
    </div>

    <button
      className="text-blue-600 hover:underline font-semibold text-sm"
      onClick={() => onBackButtonClick?.()}
    >
      View Other Events
    </button>
  </div>
);

// Case 5: Rejected attendance
const RejectedCard = () => (
  <div className="p-6 rounded-xl border bg-red-50 border-red-100 flex items-center gap-4">
    <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
      <AlertCircle className="text-red-500" />
    </div>
    <div>
      <p className="font-bold text-red-900">
        Your attendance could not be verified
      </p>
      <p className="text-sm text-red-700 opacity-80">
        The uploaded image didn't match our criteria. Please try again.
      </p>
    </div>
  </div>
);
const NoShowCard = () => (
  <div className="p-6 rounded-xl border bg-yellow-50 border-yellow-100 flex items-start gap-4">
    {/* Icon */}
    <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
      <AlertTriangle className="text-yellow-500" />
    </div>

    {/* Content */}
    <div className="flex-1">
      <p className="font-bold text-yellow-900">You missed this event</p>

      <p className="text-sm text-yellow-700 opacity-80 mt-1 leading-relaxed">
        You were registered but did not attend. For future events, if you're
        unable to participate, please leave the event in advance so that other
        members can take your spot.
      </p>
    </div>
  </div>
);

const LeftCard = () => (
  <div className="p-6 rounded-xl border bg-slate-50 border-slate-200 flex items-center gap-4">
    <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
      <LogOut className="text-slate-600" />
    </div>

    <div>
      <p className="font-bold text-slate-900">You have left this event</p>

      <p className="text-sm text-slate-700 opacity-80">
        We understand plans can change. However, your participation plays an
        important role in improving the community. Consider joining future
        events and contributing when you're available.
      </p>
    </div>
  </div>
);
const MissedEventState = ({ runtime_status, onExplore }) => {
  const isLive = runtime_status === "LIVE";

  return (
    <div className=" flex flex-col items-center justify-center text-center px-4  rounded-xl border border-slate-100 bg-slate-50">
      {/* Icon */}
      <div className="bg-slate-100 text-slate-500 p-3 rounded-full ">
        {isLive ? "📡" : "📅"}
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-slate-700">
        {isLive ? "This event is happening now" : "You missed this event"}
      </p>

      {/* Message */}
      <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xs">
        {isLive
          ? "Join in next time and be part of meaningful community efforts happening around you."
          : "Don’t worry — there are many more opportunities to contribute and make an impact."}
      </p>

      {/* Motivation */}
      <p className="text-xs text-blue-600 mt-3 font-medium">
        Explore events near you and get involved →
      </p>

      {/* CTA */}
      <button
        onClick={onExplore}
        className="mt-4 px-4 py-2 text-xs font-medium bg-white text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition"
      >
        Explore Events
      </button>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────
/**
 * @param {object}   event       - full event object from API
 * @param {function} onJoin
 * @param {function} onLeave
 * @param {function} onSubmitAttendance  - (imageUrl) => void
 * @param {function} onViewRecognition
 * @param {function} onAllRecognitions
 */
const DynamicActionSection = ({
  event,
  onJoin,
  onLeave,
  onSubmitAttendance,
  onViewRecognition,
  onAllRecognitions,
  onBackButtonClick,
  submitAttendanceLoading,
  isCloudinaryUplaoding,
  handleMyEvents
}) => {
  const navigate = useNavigate();
  if (!event) return <DynamicActionSkeleton />;

  const {
    runtime_status,
    participation_status,
    participation_id,
    selfie_url,
    recognition_id,
    filled_count,
    capacity,
  } = event;
  const isNotShown =
    participation_status === "NOT_SHOWN" ||
    (runtime_status === "COMPLETED" &&
      participation_status === "REGISTERED");

  // Case 1: Not joined
  if (!participation_id) {
    if (runtime_status === "COMPLETED" || runtime_status === "LIVE") {
      return (
        <MissedEventState
          runtime_status={runtime_status}
          onExplore={() => navigate("/volunteer-army/groups")}
        />
      );
    }
    if (capacity - filled_count <= 0) {
      return <EventFullCard onBackButtonClick={onBackButtonClick} />;
    }
    return <NotJoinedCard runtimeStatus={runtime_status} onJoin={onJoin} />;
  }

  // Case 2a: Registered + Upcoming
  if (participation_status === "REGISTERED" && runtime_status === "UPCOMING") {
    return <RegisteredUpcomingCard onLeave={onLeave} />;
  }

  // Case 2b: Registered + Ongoing
  if (participation_status === "REGISTERED" && runtime_status === "LIVE") {
    return (
      <RegisteredOngoingCard
        onSubmit={onSubmitAttendance}
        submitAttendanceLoading={submitAttendanceLoading}
        isCloudinaryUplaoding={isCloudinaryUplaoding}
      />
    );
  }

  // Case 3: Attendance submitted
  if (participation_status === "ATTENDANCE_SUBMITTED") {
    return <AttendanceReviewCard selfie_url={event?.selfie_url} />;
  }

  // Case 4: Verified
  if (participation_status === "VERIFIED") {
    return (
      <VerifiedImpactCard
        selfieUrl={selfie_url}
        recognitionId={recognition_id}
        onViewRecognition={onViewRecognition}
        onAllRecognitions={onAllRecognitions}
        handleMyEvents = {handleMyEvents}
      />
    );
  }

  // Case 5: Rejected
  if (participation_status === "REJECTED") {
    return <RejectedCard />;
  }
  // Case 6: left
  if (isNotShown) {
    return <NoShowCard />;
  }
  return <LeftCard />;
};

export default DynamicActionSection;
