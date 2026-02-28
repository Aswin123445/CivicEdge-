import { MapPin, Image as ImageIcon } from "lucide-react";

export default function OriginalComplaintCard({ complaint }) {
  const issue = complaint?.issue;
  const media = complaint?.citizen_media;
  const submission = complaint?.submission;
  return (
    <section className="bg-white rounded-[24px] p-8 border border-slate-200">
      <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">
        Original Submission
      </h2>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">
            Description
          </label>
          <p className="text-slate-700 mt-1 leading-relaxed">
            {submission.description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          {submission.location}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {media.map((_, i) => (
            <div
              key={_.id}
              className="w-20 h-20 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center"
            >
              <img src={_.url} alt="Evidence" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
