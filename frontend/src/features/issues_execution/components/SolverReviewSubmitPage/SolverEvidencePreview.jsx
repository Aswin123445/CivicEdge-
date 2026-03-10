import React from "react";

const SolverEvidencePreview = ({ reportData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-6 relative">

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
        Field Evidence
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {reportData?.evidence?.map((item) => (
          <div
            key={item.id}
            className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200"
          >
            <img
              src={item.secure_url}
              alt="Field Evidence"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolverEvidencePreview;
