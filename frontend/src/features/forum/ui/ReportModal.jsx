import React, { useState, useEffect, useRef } from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";

/**
 * CIVICEDGE COMPONENT: ReportModal
 * A reusable moderation utility for reporting posts or comments.
 * * Tech Stack: React, TailwindCSS, Lucide Icons
 */

const ReportModal = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  id,
  payload,
  setPayload,
}) => {
  console.log(type)
  // --- INTERNAL STATE ---
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef(null);
  const modalRef = useRef(null);

  // --- BEHAVIOR: Accessibility & Focus ---
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      window.addEventListener("keydown", handleEsc);
      // Move focus to textarea on open
      setTimeout(() => textareaRef.current?.focus(), 100);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // --- LOGIC: Submission ---
  const handleFormSubmit = async (e) => {
    console.log("handleFormSubmit")
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!payload.reason.trim()) {
      setError("Please provide a reason for this report.");
      textareaRef.current?.focus();
      return;
    }
    if (payload.reason.length < 7) {
      setError("Reason must be at least 7 characters.");
      textareaRef.current?.focus();
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(payload.reason);

    if (!hasLetter) {
      setError(
        "Reason must contain meaningful text (not just numbers or symbols).",
      );
      textareaRef.current?.focus();
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({ ...payload, target_type: type, target_id: id });
      setPayload({ target_type: "", target_id: "", reason: "" });
      onClose();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  // Do not render if not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* BACKGROUND OVERLAY */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MODAL CONTAINER */}
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-md rounded-xl shadow-xl border border-slate-200 transform transition-all"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h3 id="modal-title" className="text-xl font-bold text-slate-900">
              Report Content
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            You are reporting this{" "}
            <span className="font-semibold text-slate-700">{type}</span> for a
            violation of community guidelines.
          </p>
        </div>

        {/* FORM BODY */}
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Reason for report
              </label>
              <textarea
                ref={textareaRef}
                rows={5}
                value={payload.reason}
                onChange={(e) =>
                  setPayload({ ...payload, reason: e.target.value })
                }
                placeholder="Describe the issue in detail..."
                className={`w-full px-4 py-3 rounded-lg border text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-4 ${
                  error
                    ? "border-red-500 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-50"
                }`}
              />
              {error && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                  <AlertTriangle size={14} />
                  {error}
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-[11px] text-slate-500 leading-relaxed uppercase font-bold tracking-wider mb-1">
                Note
              </p>
              <p className="text-xs text-slate-500 leading-normal">
                Reports are reviewed by city moderators. Intentional misuse of
                the reporting system may result in account restrictions.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition-all flex items-center gap-2 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
