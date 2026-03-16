import React from "react";

const IssueEvidenceGallary = ({ proofData }) => {
  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Citizen Evidence Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {proofData?.issue?.issue_evidence?.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-video bg-[#1e1e1e] rounded-lg overflow-hidden border border-slate-700 cursor-pointer"
          >
            <img
              src={item.cloudinary_url}
              alt="Evidence"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                View Preview
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IssueEvidenceGallary;
