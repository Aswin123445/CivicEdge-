import { useState } from "react";
import { Search, ShieldCheck, BarChart3 } from "lucide-react";
import { HeroSkeleton, SkeletonBlock } from "./PollSkeleton";

/**
 * PollHero
 *
 * Props:
 *   stats        { active_polls: number, total_votes: number } | null
 *   isLoading    boolean
 *   heroImageSrc string | undefined
 *   onExplore    () => void
 *   onMyVotes    () => void
 */
const PollHero = ({ stats = null, isLoading = false, heroImageSrc, onExplore, onMyVotes }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) return <HeroSkeleton />;

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Left ── */}
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 mb-6">
            Community Polls & Public Opinions
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Your Voice Shapes <br />
            <span className="text-blue-600">Community Decisions.</span>
          </h1>

          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Share your perspective on important issues, vote on proposals that
            impact your community, and witness real-time democratic results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              Explore Active Polls <Search size={20} />
            </button>
            <button
              onClick={onMyVotes}
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              View My Votes
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              One-person-one-vote
            </span>
            <span className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              Transparent results
            </span>
          </div>
        </div>

        {/* ── Right – image with per-image skeleton ── */}
        <div className="hidden lg:flex justify-center items-center relative group">
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-50 via-slate-50 to-transparent blur-3xl opacity-60 transition duration-500 group-hover:opacity-80" />

          <div className="relative w-full max-w-[580px] aspect-[4/3] overflow-hidden rounded-[2rem] transition duration-500 ease-out group-hover:-translate-y-2 shadow-2xl border border-slate-100">

            {/* Image skeleton shown until image loads */}
            {!imageLoaded && (
              <SkeletonBlock className="absolute inset-0 w-full h-full rounded-none" />
            )}

            {heroImageSrc && (
              <img
                src={heroImageSrc}
                alt="Community members discussing local issues"
                draggable={false}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover scale-[1.1] transition-all duration-700 ease-out group-hover:scale-[1.15] ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            )}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,white_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-subtle">
              <p className="text-2xl font-black text-blue-600 leading-none">
                {stats}+
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Total Votes Cast
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PollHero;
