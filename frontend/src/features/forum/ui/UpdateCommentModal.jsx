import React, { useState, useEffect, useRef } from 'react';
import { Pencil, X, Loader2, AlertCircle } from 'lucide-react';

/**
 * UpdateCommentModal
 * Pre-filled with existing content to allow users to edit their feedback.
 */
const UpdateCommentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialContent = "", 
  isUpdating = false ,
  setInitialContent
}) => {
  const [error, setError] = useState(null);
  
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  // Sync state with initialContent when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      // Auto-focus the textarea
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, initialContent]);

  // --- CLICK OUTSIDE & ESCAPE LOGIC ---
  useEffect(() => {
    const handleEvents = (e) => {
      if (e.key === 'Escape') onClose();
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleEvents);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleEvents);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialContent.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    // Expected data: { content: "string" }
    onSubmit({ content: initialContent.trim() });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />

      {/* MODAL BOX */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* HEADER */}
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Pencil className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Edit Comment</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Your Message
              </label>
              <textarea
                ref={textareaRef}
                rows={5}
                value={initialContent || ''}
                onChange={(e) => setInitialContent(e.target.value)}
                placeholder="Write your updated comment..."
                className={`w-full px-4 py-3 rounded-xl border text-slate-900 outline-none transition-all focus:ring-4 ${
                  error 
                    ? 'border-red-500 focus:ring-red-50' 
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-50'
                }`}
              />
              {error && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="p-4 bg-slate-50 flex items-center justify-end gap-3 rounded-b-2xl border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;