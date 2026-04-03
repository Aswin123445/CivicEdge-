// components/volunteer/GroupAbout.jsx
import { CheckCircle2 } from "lucide-react";

/**
 * @param {string} description
 * @param {string} requirements
 */
const GroupAbout = ({ description, requirements }) => (
  <div className="space-y-6">
    {/* Description */}
    <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4">About this group</h2>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </section>

    {/* Requirements */}
    <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
      {requirements ? (
        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-slate-700 font-medium py-1">{requirements}</p>
        </div>
      ) : (
        <p className="text-slate-500 italic">
          No specific requirements for this group.
        </p>
      )}
    </section>
  </div>
);

export default GroupAbout;
