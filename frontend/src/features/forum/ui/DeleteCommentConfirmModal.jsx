import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

/**
 * DeleteCommentConfirmModal
 * A standard-issue confirmation dialog specifically for comment deletion.
 */
const DeleteCommentConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Comment", 
  message = "Are you sure you want to remove your comment? This will permanently delete your feedback and cannot be undone.",
  isDeleting = false 
}) => {
  const modalRef = useRef(null);

  // --- CLICK OUTSIDE & ESCAPE LOGIC ---
  useEffect(() => {
    const handleCloseEvents = (e) => {
      if (e.key === 'Escape') onClose();
      // Click outside listener: only if modalRef exists and click target is outside it
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleCloseEvents);
      document.addEventListener('keydown', handleCloseEvents);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleCloseEvents);
      document.removeEventListener('keydown', handleCloseEvents);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* SEMI-TRANSPARENT OVERLAY */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />

      {/* MODAL BOX - Attachment point for 'modalRef' */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-red-50 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              {title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-4 bg-slate-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 rounded-b-2xl border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-sm transition-all flex items-center justify-center gap-2 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Removing...
              </>
            ) : (
              'Yes, Remove Comment'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentConfirmModal;