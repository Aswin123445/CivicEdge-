import React from "react";
import { Eye, HelpCircle } from "lucide-react";
const AdminCreateGuidance = ({ formData }) => {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      {/* Writing Guidelines */}
      <section className="bg-[#1e1e1e] border border-slate-700 rounded-2xl p-6 sticky top-28 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <HelpCircle size={20} />
          <h2 className="font-bold text-slate-100">Writing Guidelines</h2>
        </div>
        <ul className="space-y-4">
          {[
            "Keep questions neutral and unbiased",
            "Avoid leading language that favors one choice",
            "Provide sufficient context for informed voting",
            "Ensure options are mutually exclusive",
            "Keep option text concise and scannable",
          ].map((tip, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-slate-400 leading-relaxed"
            >
              <span className="text-blue-500 font-bold">{i + 1}.</span> {tip}
            </li>
          ))}
        </ul>

        {/* Live Preview Card */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Eye size={18} />
            <h2 className="font-bold text-slate-100">Live Preview</h2>
          </div>
          <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-5 space-y-4">
            <p
              className={`text-sm font-bold leading-tight break-words line-clamp-3 ${
                formData.question ? "text-slate-100" : "text-slate-700 italic"
              }`}
            >
              {formData.question || "Poll question will appear here..."}
            </p>
            <div className="space-y-2">
              {formData.options.map((opt, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-lg border flex items-center px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${
                    opt.text
                      ? "border-slate-700 bg-[#1e1e1e] text-slate-400"
                      : "border-slate-800/50 bg-transparent text-slate-800"
                  }`}
                >
                  {opt.text || `Option ${i + 1}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminCreateGuidance;
