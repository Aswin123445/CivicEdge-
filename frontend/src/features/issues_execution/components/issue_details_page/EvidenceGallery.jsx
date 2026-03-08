import { useState } from "react";

const EvidenceGallery = ({ issue, setSelectedImage }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Evidence Gallery</h2>
        <span className="text-xs text-slate-500">
          {issue.evidences.length} Photos
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {issue.evidences.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className="group relative h-48 min-w-[280px] md:min-w-[320px] snap-start rounded-lg overflow-hidden bg-slate-800 border border-slate-700 cursor-zoom-in flex-shrink-0"
          >
            <div className="absolute top-2 left-2 z-10 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
              IMG_0{idx + 1}
            </div>

            <img
              src={img?.cloudinary_url}
              alt={`Evidence ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-90"
            />

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-xs text-white font-medium">Click to enlarge</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EvidenceGallery;
