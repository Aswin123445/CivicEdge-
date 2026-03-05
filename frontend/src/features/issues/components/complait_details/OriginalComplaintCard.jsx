import { MapPin, Image as ImageIcon } from "lucide-react";

export default function OriginalComplaintCard({ complaint }) {
  const issue = complaint?.issue;
  const media = complaint?.citizen_media || [];
  const submission = complaint?.submission;

  return (
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
      {/* Accent Line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />

      {/* Watermark */}
      <div className="absolute top-6 right-6 opacity-[0.05] pointer-events-none">
        <ImageIcon className="w-24 h-24 text-blue-600" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50">
          <ImageIcon className="w-5 h-5 text-blue-600" />
        </div>

        <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-700">
          Original Submission
        </h2>
      </div>

      <div className="space-y-6">
        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Description
          </label>

          <p className="text-slate-700 mt-1 leading-relaxed text-[15px]">
            {submission?.description}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          {submission?.location}
        </div>

        {/* Evidence Images */}
        {media.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {media.map((item) => (
              <div
                key={item.id}
                className="
                w-24
                aspect-square
                rounded-lg
                overflow-hidden
                border border-slate-200
                bg-slate-100
                flex-shrink-0
              "
              >
                <img
                  src={item.url}
                  alt="Evidence"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}