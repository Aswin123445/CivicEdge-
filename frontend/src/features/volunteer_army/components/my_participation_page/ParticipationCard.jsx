// components/volunteer/ParticipationCard.jsx
import {
  Users,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Camera,
  ChevronRight,
} from "lucide-react";
import ParticipationStatusBadge from "./ParticipationStatusBadge";
import { useNavigate } from "react-router-dom";

// ─── Skeleton ─────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const ParticipationCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-full space-y-4">
    {/* Header */}
    <div className="flex justify-between items-start">
      <Pulse className="h-5 w-20 rounded-full" />
      <Pulse className="w-5 h-5 rounded" />
    </div>

    {/* Title + group */}
    <div className="space-y-2">
      <Pulse className="h-6 w-3/4" />
      <div className="flex items-center gap-1.5">
        <Pulse className="w-3.5 h-3.5 rounded" />
        <Pulse className="h-3 w-28" />
      </div>
    </div>

    {/* Timeline */}
    <div className="pt-4 border-t border-slate-100 space-y-2">
      <div className="flex justify-between">
        <Pulse className="h-3 w-20" />
        <Pulse className="h-3 w-24" />
      </div>
      <div className="flex justify-between">
        <Pulse className="h-3 w-16" />
        <Pulse className="h-3 w-24" />
      </div>
    </div>

    {/* CTA button */}
    <Pulse className="h-12 w-full rounded-xl mt-2" />
  </div>
);

// ─── Action button logic ───────────────────────────────
const ActionButton = ({ item, handleAction }) => {
  const { status, event_runtime_status } = item;

  if (status === "REGISTERED" && event_runtime_status === "LIVE") {
    return (
      <button
        onClick={() => handleAction?.(item)}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group/btn"
      >
        Submit Attendance{" "}
        <ArrowRight
          size={16}
          className="group-hover/btn:translate-x-1 transition-transform"
        />
      </button>
    );
  }

  if (status === "VERIFIED") {
    return (
      <button
        onClick={() => handleAction?.(item)}
        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-200"
      >
        <Award size={16} className="text-amber-400" /> View Recognition
      </button>
    );
  }

  if (status === "REJECTED") {
    return (
      <button
        onClick={() => handleAction?.(item)}
        className="w-full bg-red-50 text-red-600 border border-red-100 py-3 rounded-xl font-bold hover:bg-red-100 transition-all"
      >
        View Details
      </button>
    );
  }

  return (
    <button
      onClick={() => handleAction?.(item)}
      className="w-full bg-slate-100 text-slate-800 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
    >
      View Details <ChevronRight size={16} />
    </button>
  );
};

// ─── Status message ────────────────────────────────────
const StatusMessage = ({ status }) => {
  const navigate = useNavigate();
  if (!status) return null;

  if (status === "REGISTERED") {
    return (
      <div className="text-sm font-semibold text-blue-600 pl-28">You are registered</div>
    );
  }
  if (status === "VERIFIED") {
    return (
      <p className="text-sm font-semibold text-green-700 flex items-center gap-1">
        <CheckCircle2 size={16} /> Verified Participation
      </p>
    );
  }
  if (status === "REJECTED") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 py-6 rounded-xl border border-red-100 bg-red-50/40">
        {/* Icon */}
        <div className="bg-red-100 text-red-500 p-3 rounded-full mb-3">⚠️</div>

        {/* Title */}
        <p className="text-sm font-semibold text-red-600">
          Attendance not approved
        </p>

        {/* Message */}
        <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-xs">
          Your submission couldn’t be verified this time. Please ensure your
          selfie clearly shows your presence at the event location.
        </p>

        {/* Motivation */}
        <p className="text-xs text-blue-600 mt-3 font-medium">
          Don’t worry — keep participating and make a difference 💪
        </p>

        {/* Optional CTA */}
        <button
          onClick={() => navigate("/volunteer-army/groups")}
          className="mt-4 px-4 py-2 text-xs font-medium bg-white text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition"
        >
          Explore More Events
        </button>
      </div>
    );
  }
  if (status === "LEFT") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 mt-7">
        <p className="text-lg  font-bold text-slate-600">
          You left this event
        </p>

        <p className="text-md text-slate-400 mt-1 leading-relaxed">
          Things don’t always go as planned — but your contribution still
          matters. Explore other events and continue making a positive impact in
          your community.
        </p>

        <p
          onClick={() => {
            navigate("/volunteer-army/groups");
          }}
          className="text-sm text-blue-600 mt-8 font-semibold cursor-pointer"
        >
          Discover new opportunities →
        </p>
      </div>
    );
  }
  if (status === "NO_SHOW") {
    return (
      <p className="text-sm font-semibold text-slate-500">Marked as no show</p>
    );
  }
  if (status === "ATTENDANCE_SUBMITTED") {
    return (
      <p className="text-sm font-semibold text-amber-600">
        Attendance under review
      </p>
    );
  }
  return null;
};

// ─── Main Component ────────────────────────────────────
/**
 * @param {object}   item                 - participation object from API
 * @param {function} onSubmitAttendance   - (item) => void
 * @param {function} onViewRecognition    - (item) => void
 * @param {function} onViewDetails        - (item) => void
 */
const ParticipationCard = ({ item, handleAction }) => {
  if (!item) return null;

  const isLive =
    item.event_runtime_status === "LIVE" && item.status === "REGISTERED";
  const isNotAttend =
    item.status === "NO_SHOW" ||
    (item.event_runtime_status === "COMPLETED" && item.status === "REGISTERED");

  return (
    <div
      className={`group bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl flex flex-col justify-between h-full
        ${isLive ? "ring-2 ring-green-500 ring-offset-2" : ""}`}
    >
      {/* Top section */}
      <div className="space-y-3">
        {/* Badge row */}
        <div className="flex justify-between items-start">
          <ParticipationStatusBadge
            status={item.status}
            runtimeStatus={item.event_runtime_status}
          />
          <div className="flex items-center gap-2">
            {item.status === "VERIFIED" && (
              <Award size={18} className="text-amber-500" />
            )}
            {isLive && (
              <div className="flex items-center gap-1.5 text-green-600 animate-pulse font-bold text-xs">
                <Zap size={14} fill="currentColor" /> LIVE
              </div>
            )}
          </div>
        </div>

        {/* Title + group */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {item.event_title ?? "Untitled Event"}
          </h3>
          {item.group_name && (
            <div className="flex items-center gap-1.5 text-slate-500 mt-1">
              <Users size={14} />
              <span className="text-xs font-medium">{item.group_name}</span>
            </div>
          )}
        </div>

        {/* Evidence image */}
        {item.attendance_evidence_url && (
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-slate-100 my-1 bg-slate-900">
            <img
              src={item.attendance_evidence_url}
              alt="Attendance proof"
              className="absolute inset-0 w-full h-full object-cover blur-md opacity-40"
            />
            <img
              src={item.attendance_evidence_url}
              alt="Selfie"
              className="relative z-10 w-full h-full object-contain"
            />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-lg text-white">
              <Camera size={12} />
            </div>
          </div>
        )}
        {!item.attendance_evidence_url && isLive && (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 my-4 bg-slate-50 flex flex-col items-center justify-center text-center px-4">
            {/* Camera Icon */}
            <div className="bg-blue-50 text-blue-600 p-3 rounded-full mb-2">
              <Camera size={18} />
            </div>

            {/* Message */}
            <p className="text-lg font-medium text-slate-700">
              Upload your attendance selfie
            </p>

            {/* Subtext */}
            <p className="text-md text-slate-400 mt-1">
              Take a selfie at the event to mark your presence
            </p>
          </div>
        )}
        {!isLive &&
          item.event_runtime_status === "UPCOMING" &&
          item.status === "REGISTERED" && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 pt-10  text-center ">
              <p className="text-lg font-bold text-green-700">
                Be ready to attend on time
              </p>

              <p className="text-md text-slate-400 mt-1">
                Your participation helps build a better community. Join the
                event on time and make an impact.
              </p>
            </div>
          )}

        {isNotAttend && (
          <div className="rounded-xl border  bg-white p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Message */}
            <div>
              <p className="text-lg  font-bold text-yellow-600">
                You missed this event
              </p>

              <p className="text-md text-slate-400  mt-1 leading-relaxed max-w-xl">
                It looks like you registered but were unable to attend. For
                future events, if you’re not able to join, please leave the
                event in advance. This helps free up spots for other citizens
                who are willing to participate.
              </p>
            </div>
          </div>
        )}

        {/* Status message */}
        <div className="py-2">
          <StatusMessage status={item.status} />
        </div>

        {/* Timeline */}
        <div className="pt-4 border-t border-slate-50 space-y-2">
          {item.registered_at && (
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-slate-400">Registered:</span>
              <span className="text-slate-700">
                {new Date(item.registered_at).toLocaleDateString()}
              </span>
            </div>
          )}
          {item.attendance_submitted_at && (
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-slate-400">Submitted:</span>
              <span className="text-slate-700">
                {new Date(item.attendance_submitted_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action button */}
      <div className="mt-6">
        <ActionButton item={item} handleAction={handleAction} />
      </div>
    </div>
  );
};

export default ParticipationCard;
