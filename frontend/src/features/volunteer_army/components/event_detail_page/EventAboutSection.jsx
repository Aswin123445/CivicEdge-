// components/volunteer/EventAboutSection.jsx

// ─── Skeleton ─────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const EventAboutSkeleton = () => (
  <section className="space-y-4">
    <Pulse className="h-6 w-36" />
    <div className="space-y-2">
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-5/6" />
      <Pulse className="h-4 w-4/6" />
    </div>
  </section>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {string} description
 */
const EventAboutSection = ({ description }) => {
  if (!description) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">About this event</h2>
      <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
    </section>
  );
};

export default EventAboutSection;
