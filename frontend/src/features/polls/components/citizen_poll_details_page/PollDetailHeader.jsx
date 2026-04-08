import { useState } from "react";
import { Users, Clock } from "lucide-react";
import { PollHeaderSkeleton, Sk } from "./PollDetailSkeleton";
import getTimeRemaining from "../../utils";

/**
 * PollDetailHeader
 *
 * Props:
 *   poll       { id, reference_id, question, image_url,
 *                total_votes, expires_at, has_voted } | null
 *   isLoading  boolean
 */
const PollDetailHeader = ({ poll = null, isLoading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) return <PollHeaderSkeleton />;
  if (!poll) return null;

  const {
    reference_id = "",
    question = "",
    image_url = null,
    total_votes = 0,
    expires_at = null,
    has_voted = false,
    status = null
  } = poll;

  const endsIn = getTimeRemaining(expires_at,status);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
      {/* Hero image with per-image skeleton */}
      {image_url && (
        <div className="h-48 w-full overflow-hidden relative">
          {!imageLoaded && (
            <Sk className="absolute inset-0 w-full h-full rounded-none" />
          )}
          <img
            src={image_url}
            alt="Poll context"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}

      <div className="p-8">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {has_voted ? (
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              Participated
            </span>
          ) : endsIn === 'Poll Closed' || status === 'closed' ? (
            <span className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
              Poll Closed
            </span>
          ) : (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              Live Poll
            </span>
          )}

          {reference_id && (
            <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              Ref: {reference_id}
            </span>
          )}
        </div>

        {/* Question */}
        {question && (
          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-4">
            {question}
          </h1>
        )}

        {/* Meta */}
        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-2">
            <Users size={16} className="text-slate-400" />
            {Number(total_votes).toLocaleString()} Votes
          </span>

          {endsIn && (
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              {endsIn}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default PollDetailHeader;
