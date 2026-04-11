// components/volunteer/EvidenceSection.jsx
import { FileText, Upload, Trash2 } from "lucide-react";

// ---- Constants ----
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB   = 5;
const MAX_SIZE_B    = MAX_SIZE_MB * 1024 * 1024;

// ---- Skeleton ----
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const EvidenceSectionSkeleton = () => (
  <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-2">
        <Pulse className="h-5 w-44" />
        <Pulse className="h-3 w-60" />
      </div>
      <Pulse className="h-4 w-12" />
    </div>

    {/* File grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Upload box skeleton */}
      <Pulse className="h-24 rounded-xl" />
      {/* File card skeletons */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
          <Pulse className="w-9 h-9 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>

    {/* Format notice skeleton */}
    <Pulse className="h-3 w-72 mt-4" />
  </section>
);

// ---- Component ----
/**
 * @param {"PENDING"|"SUBMITTED"|"ACTIVE"|"REJECTED"} status
 * @param {Array}    evidences  - [{ id, name, size, uploaded_at }]
 * @param {function} onUpload   - (file: File) => void
 * @param {function} onDelete   - (id: string) => void
 * @param {function} onError    - (message: string) => void  — for validation errors
 */
const EvidenceSection = ({ status, evidences, onUpload, onDelete, onError, isFileUploading }) => {
  // Hidden for active members
  if (status === "ACTIVE") return null;

  const isEditable = status === "PENDING" || status === "REJECTED";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Type check
    if (!ALLOWED_TYPES.includes(file.type)) {
      onError?.("Only PDF, JPG, PNG, or WEBP files are allowed.");
      e.target.value = "";
      return;
    }

    // Size check
    if (file.size > MAX_SIZE_B) {
      onError?.(`File size must not exceed ${MAX_SIZE_MB} MB.`);
      e.target.value = "";
      return;
    }

    onUpload?.(file);
    e.target.value = ""; 
  };
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Evidence & Documents</h2>
          <p className="text-sm text-slate-500">
            Upload the required files to support your application.
          </p>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {evidences.length} {evidences.length === 1 ? "File" : "Files"}
        </span>
      </div>

      {/* File grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upload box */}
        {isEditable && (
          !isFileUploading ? (<label className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group min-h-[96px]">
            <Upload className="text-slate-400 group-hover:text-blue-500 mb-2" size={24} />
            <span className="text-sm font-bold text-slate-600">Upload File</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
          </label>):(
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between group">  
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm shrink-0">
                <FileText size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">Uploading...</p>
              </div>
            </div>
          </div>
          )
        )}

        {/* Evidence cards */}
        {evidences.map((file,i) => (
          <div
            key={file.id??i}
            className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm shrink-0">
                <FileText size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{file?.description || "evidence"}</p>
                <p className="text-xs text-slate-500">Evidence {i + 1}</p>
              </div>
            </div>
            {isEditable && (
              <button
                onClick={() => onDelete(file.id)}
                className="text-slate-400 hover:text-red-500 p-1 transition-colors shrink-0"
                aria-label="Delete file"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Format + size notice */}
      {isEditable && (
        <p className="text-xs text-slate-400 mt-4">
          Accepted formats: <span className="font-semibold text-slate-500">PDF, JPG, PNG, WEBP</span>
          {" · "}Max file size: <span className="font-semibold text-slate-500">{MAX_SIZE_MB} MB</span>
        </p>
      )}
    </section>
  );
};

export default EvidenceSection;
