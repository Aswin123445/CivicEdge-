import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, Save, FileText, Type } from "lucide-react";
import { validate } from "../utils";

/**
 * CIVICEDGE COMPONENT: UpdatePostModal
 * Aligned with UpdateForumPostSerializer (title, content).
 */
const UpdatePostModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef(null);

  // Sync initial data when modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
      });
      setError(null);
    }
  }, [isOpen, initialData]);

  // --- CLICK OUTSIDE & ESCAPE LOGIC ---
  useEffect(() => {
    const handleEvents = (e) => {
      if (e.key === "Escape") onClose();
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleEvents);
      document.addEventListener("keydown", handleEvents);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleEvents);
      document.removeEventListener("keydown", handleEvents);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation: At least one field must be provided (per Serializer logic)
    if (!formData.title.trim() && !formData.content.trim()) {
      setError("Please provide at least a title or content to update.");
      return;
    }
    if(formData.title.length < 3) return setError("Title must be at least 3 characters.");
    if(formData.content.length < 7) return setError("Content must be at least 7 characters.");

    setIsSubmitting(true);
    try {
      // Build partial payload
      const payload = {};
      if (formData.title.trim()) payload.title = formData.title.trim();
      if (formData.content.trim()) payload.content = formData.content.trim();

      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to update post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />

      {/* MODAL CONTAINER */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Save className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Edit Discussion</h3>
              <p className="text-slate-500 text-xs">Update your post's information</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Type size={14} className="text-slate-400" />
              Post Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a descriptive title..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Content Field */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <FileText size={14} className="text-slate-400" />
              Content
            </label>
            <textarea
              name="content"
              rows={8}
              value={formData.content}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all resize-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100">
              {error}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition-all flex items-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
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

export default UpdatePostModal;