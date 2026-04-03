// components/admin/attendance/ImagePreviewModal.jsx
import { X } from "lucide-react";

/**
 * @param {string}   url     - image URL to preview
 * @param {function} onClose
 */
const ImagePreviewModal = ({ url, onClose }) => {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative max-w-xl w-full bg-[#1e1e1e] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Attendance Selfie Evidence
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image */}
        <div className="p-2">
          <img
            src={url}
            className="w-full h-auto rounded-lg"
            alt="Attendance evidence preview"
          />
        </div>

        {/* Footer note */}
        <div className="p-4 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase italic">
            Verify identity against registration profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;