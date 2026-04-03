// components/admin/events/detail/EventSponsorSection.jsx
import { ExternalLink } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./EventDetailPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const EventSponsorSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50">
      <Skeleton className="h-3 w-32" />
    </div>
    <div className="p-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex gap-6 items-start">
        <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - { sponsor_name, sponsor_logo_url, sponsor_website, sponsor_message }
 */
const EventSponsorSection = ({ event }) => {
  if (!event) return null;

  // Only render if there's at least a sponsor name or message
  if (!event.sponsor_name && !event.sponsor_message) return null;

  return (
    <SectionCard title="Sponsor Information">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
        {event.sponsor_logo_url && (
          <img
            src={event.sponsor_logo_url}
            alt={`${event.sponsor_name ?? "Sponsor"} logo`}
            className="w-12 h-12 rounded-lg object-contain bg-white/10 p-1 shrink-0"
          />
        )}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-slate-100 font-black flex items-center gap-2">
              {event.sponsor_name ?? "Sponsor"}
              {event.sponsor_website && (
                <a
                  href={event.sponsor_website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </h4>
          </div>
          {event.sponsor_message && (
            <p className="text-sm text-slate-400 italic">
              "{event.sponsor_message}"
            </p>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

export default EventSponsorSection;
