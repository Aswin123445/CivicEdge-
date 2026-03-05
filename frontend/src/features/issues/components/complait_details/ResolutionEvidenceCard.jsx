import { CheckCircle2 } from "lucide-react";

const ResolutionEvidenceCard = ({ complaint }) => (
  <section
    className="
    relative
    bg-white
    border border-slate-200
    rounded-xl
    p-8
    shadow-sm
    overflow-hidden
  "
  >
    {/* Green Accent Line */}
    <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />

    {/* Watermark Icon */}
    <div className="absolute top-6 right-6 opacity-[0.05] pointer-events-none">
      <CheckCircle2 className="w-24 h-24 text-green-600" />
    </div>

    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-50">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
      </div>

      <h2 className="text-sm font-semibold tracking-wide uppercase text-green-700">
        Issue Resolved
      </h2>
    </div>

    {/* Message */}
    <p className="text-slate-700 text-[15px] leading-relaxed mb-6 max-w-2xl">
      {/* {complaint.resolution_note} */}
      Thank you for contributing to CivicEdge. Every responsible action helps
      build a stronger and more accountable community.
    </p>

    {/* Evidence */}
    <div className="grid grid-cols-2 gap-4">
      {complaint?.resolution?.after_media?.slice(0, 2).map((media) => (
        <div
          key={media.reference_id}
          className="
          aspect-video
          rounded-xl
          overflow-hidden
          bg-slate-100
          border border-slate-200
        "
        >
          <img
            src={media.secure_url}
            alt="Resolution proof"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </section>
);

export default ResolutionEvidenceCard;