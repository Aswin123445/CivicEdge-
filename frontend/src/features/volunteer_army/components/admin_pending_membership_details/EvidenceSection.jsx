// components/admin/memberships/detail/EvidenceSection.jsx
import { FileText, Eye, FileArchive, ExternalLink } from "lucide-react";
import { useState } from "react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./DetailPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const EvidenceSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-700/30 flex items-center gap-3">
      <Skeleton className="w-5 h-5 rounded" />
      <Skeleton className="h-4 w-36" />
    </div>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-slate-700">
          <Skeleton className="h-40 w-full rounded-none" />
          <Skeleton className="h-8 w-full rounded-none" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Evidence modal ────────────────────────────────────
const EvidenceModal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
    <div className="relative w-full max-w-5xl bg-[#1e1e1e] rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <span className="text-xs font-black uppercase tracking-widest text-slate-500">
          Evidence Preview
        </span>
        <div className="flex gap-4">
          <a
            href={item.file_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"
          >
            <ExternalLink size={14} /> Open in New Tab
          </a>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white uppercase font-black text-[10px]"
          >
            Close
          </button>
        </div>
      </div>
      <div className="p-2 flex items-center justify-center min-h-[60vh] max-h-[85vh]">
        {item.description === "image" ? (
          <img
            src={item.file_url}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            alt="Evidence preview"
          />
        ) : (
          <iframe
            src={item.file_url}
            className="w-full h-[80vh] rounded-lg border-none"
            title="PDF preview"
          />
        )}
      </div>
    </div>
  </div>
);

const EvidenceCard = ({ item, onClick }) => {
  if (!item) return null;

  const isImage = item.description !== "pdf";

  return (
    <div
      onClick={onClick}
      className="group relative bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all"
    >
      {isImage ? (
        <div className="h-40 overflow-hidden relative">
          <img
            src={item.file_url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Evidence"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Eye className="text-white" size={24} />
          </div>
        </div>
      ) : (
        <div className="h-40 flex flex-col items-center justify-center space-y-2 p-4">
          <FileArchive size={40} className="text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            PDF Document
          </span>
          <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
            View PDF
          </span>
        </div>
      )}

      <div className="p-3 bg-slate-800/80 border-t border-slate-700 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
        Uploaded:{" "}
        {item.uploaded_at
          ? new Date(item.uploaded_at).toLocaleDateString()
          : "—"}
      </div>
    </div>
  );
};

// ─── Main component ────────────────────────────────────
/**
 * @param {Array} evidences - [{ id, file_url, description: "image"|"pdf", uploaded_at }]
 */
const EvidenceSection = ({ membership }) => {
  const evidences = membership?.evidences ?? [];
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <>
      <SectionCard
        title="Submitted Evidence"
        icon={<FileText size={18} className="text-blue-400" />}
      >
        {Array.isArray(evidences) && evidences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {evidences.map((item) =>
              item?.id ? (
                <EvidenceCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedMedia(item)}
                />
              ) : null
            )}
          </div>
        ) : (
          <p className="text-slate-600 italic text-sm">No evidence submitted.</p>
        )}
      </SectionCard>

      {selectedMedia && (
        <EvidenceModal
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  );
};

export default EvidenceSection;
