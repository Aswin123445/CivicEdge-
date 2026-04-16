import React from "react";
import { Image as ImageIcon, X } from "lucide-react";

const MAX_IMAGES = 5;

/**
 * ImageUploader
 * Self-contained image pick + preview grid.
 *
 * Props:
 *   previews  {string[]}  - Blob/data URLs for preview
 *   error     {string}    - Validation error message
 *   onAdd     {function}  - (FileList) => void
 *   onRemove  {function}  - (index: number) => void
 */
const ImageUploader = ({ previews = [], error, onAdd, onRemove }) => {
  const remaining = MAX_IMAGES - previews.length;

  const handleChange = (e) => {
    if (e.target.files?.length) onAdd?.(e.target.files);
    // Reset so the same file can be re-selected after removal
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Drop zone — hidden once limit reached */}
      {remaining > 0 && (
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition-all group">
          <ImageIcon className="w-7 h-7 text-slate-300 group-hover:text-blue-400 transition-colors mb-1.5" />
          <p className="text-sm text-slate-400 group-hover:text-blue-500 transition-colors">
            Click to upload
          </p>
          <p className="text-xs text-slate-300 mt-0.5">
            {remaining} of {MAX_IMAGES} remaining
          </p>
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
      )}

      {/* Preview grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100"
            >
              <img
                src={src}
                alt={`Preview ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove?.(i)}
                aria-label="Remove image"
                className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/40 transition-all"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-1">
                  <X size={13} className="text-slate-700" />
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ImageUploader;
