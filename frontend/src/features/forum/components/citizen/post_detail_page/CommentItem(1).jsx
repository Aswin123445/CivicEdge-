import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, ShieldAlert, Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

/**
 * CommentItem
 * Displays a single comment with context-aware actions (Edit/Delete for author, Report for others).
 */
const CommentItem = ({ 
  comment, 
  onReportClick, 
  onEditClick, 
  onDeleteClick,
  setIsCommentUpdateModalOpen,
  updateCommentId,
  setUpdateCommentId,
  updateCommentInitialContent,
  setUpdateCommentInitialContent,
  setIsCommentDeleteModalOpen,
  setDeleteCommentId

}) => {
  const email = useSelector((state) => state.auth.user);
  const isOwnComment = email === comment?.user?.email;
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
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

  if (!comment) return null;

  const { content, created_at, user, id } = comment;

  const formatted = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Avatar Initial Fallback
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="flex gap-4 py-6 border-b border-slate-50 last:border-0 relative group">
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        {user?.profile ? (
          <img
            src={user.profile}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
            {firstLetter}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 text-sm truncate flex items-center gap-2">
              {user?.name ?? "Anonymous"}
              {isOwnComment && (
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-blue-100">
                  Author
                </span>
              )}
            </h4>
            {formatted && (
              <span className="text-slate-400 text-[11px] font-medium">
                {formatted}
              </span>
            )}
          </div>

          {/* Contextual Actions Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className={`p-1.5 rounded-lg transition-all ${
                openMenu
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 opacity-0 group-hover:opacity-100"
              }`}
              aria-label="Comment options"
            >
              <MoreVertical size={16} />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {isOwnComment ? (
                  <>
                    {/* Author Options */}
                    <button
                      onClick={() => {
                        setOpenMenu(false);
                        setIsCommentUpdateModalOpen(true);
                        setUpdateCommentId(id);
                        setUpdateCommentInitialContent(content);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors border-b border-slate-50"
                    >
                      <Pencil size={14} className="text-slate-400" />
                      Edit Comment
                    </button>
                    <button
                      onClick={() => {
                        setOpenMenu(false);
                        setIsCommentDeleteModalOpen(true);
                        setDeleteCommentId(id);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 font-medium hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 size={14} className="text-red-500" />
                      Delete Comment
                    </button>
                  </>
                ) : (
                  /* Other User Options */
                  <button
                    onClick={() => {
                      setOpenMenu(false);
                      onReportClick(id);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 font-medium hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <ShieldAlert size={14} className="text-red-500" />
                    Report Comment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed break-words pr-2">
          {content ?? ""}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;