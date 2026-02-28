import { CheckCircle2 } from "lucide-react";

const ResolutionEvidenceCard = ({ complaint }) => (
  <section className="bg-green-50/50 rounded-[24px] p-8 border border-green-100">
    <div className="flex items-center gap-2 mb-6">
      <CheckCircle2 className="w-6 h-6 text-green-600" />
      <h2 className="text-green-900 font-bold text-lg">
        Issue Resolved
      </h2>
    </div>

    <p className="text-slate-700 mb-6">
      {complaint.resolution_note}
    </p>

    <div className="grid grid-cols-2 gap-4">
      {complaint.after_photos.map((url, i) => (
        <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-200">
          <img src={url} alt="Resolution proof" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </section>
);

export default ResolutionEvidenceCard;