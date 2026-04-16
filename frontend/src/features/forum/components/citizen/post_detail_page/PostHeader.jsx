import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  MoreVertical,
  ShieldAlert,
  Pencil,
  Trash2,
} from "lucide-react";
import ReportModal from "../../../ui/ReportModal";

/**
 * PostHeader
 * Displays navigation, title, author info, and dynamic moderation/author controls.
 */
const PostHeader = ({
  title,
  category,
  time,
  onBack,
  isOwnPost,
  onReport,
  onEdit, // New Prop for editing
  onDelete, // New Prop for deleting
  user,
  isModalOpen,
  setIsModalOpen,
  id,
  setPayload,
  payload,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  updatePostLoading,
  setIsDeleteModalOpen
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // --- CLICK OUTSIDE LOGIC ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const formattedDate = time
    ? new Date(time).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <header className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Discussions
        </button>

        {/* Dynamic Options Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className={`p-2 rounded-md transition-colors ${
              openMenu
                ? "bg-slate-100 text-slate-600"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Options"
          >
            <MoreVertical size={18} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {isOwnPost ? (
                <>
                  {/* Author Actions: Edit */}
                  <button
                    onClick={() => {
                      setOpenMenu(false);
                      setIsUpdateModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors border-b border-slate-50"
                  >
                    <Pencil size={16} className="text-slate-400" />
                    Edit Discussion
                  </button>
                  {/* Author Actions: Delete */}
                  <button
                    onClick={() => {
                      setOpenMenu(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 font-medium hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                    Delete Discussion
                  </button>
                </>
              ) : (
                /* Non-Author Actions: Report */
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 font-medium hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <ShieldAlert size={16} />
                  Report Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {category?.name && (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            {category.name}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
          {title ?? "Untitled Discussion"}
        </h1>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex-shrink-0">
            {user?.profile ? (
              <img
                src={user.profile}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                {firstLetter}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">
              {user?.name || "Anonymous User"}
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              {formattedDate && <span>Published on {formattedDate}</span>}
              {isOwnPost && (
                <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Author
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ReportModal
        type="post"
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onReport}
        payload={payload}
        setPayload={setPayload}
      />

      <div className="border-b border-slate-100 pt-2" />
    </header>
  );
};

export default PostHeader;
