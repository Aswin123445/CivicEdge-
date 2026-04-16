import { Plus, Clock, ChevronRight } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "Recently";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
}

/**
 * ActivityCard
 *
 * Props:
 *  - post     {object}   Activity post object. All fields are null-safe.
 *  - onClick  {function} Called with post.id when the card is clicked.
 */
const ActivityCard = ({ post, onClick }) => {
  const id           = post?.id ?? null;
  const title        = post?.title ?? "Untitled discussion";
  const categoryName = post?.category?.name ?? null;
  const mediaPreview = post?.media_preview ?? null;
  const formattedDate = formatDate(post?.created_at);

  const handleClick = () => {
    if (id != null) onClick?.(id);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white border border-slate-200 rounded-xl p-4 transition-all duration-200 hover:bg-slate-50 cursor-pointer"
    >
      <div className="flex flex-col space-y-3">

        {/* Type label + category badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-md">
              <Plus size={14} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              You Involved in the discussion
            </span>
          </div>
          {categoryName && (
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {categoryName}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Optional media preview */}
        {mediaPreview && (
          <div className="relative w-full h-40 overflow-hidden rounded-lg border border-slate-100">
            <img
              src={mediaPreview}
              alt="Discussion preview"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={12} />
            <span className="text-xs">{formattedDate}</span>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1"
          />
        </div>

      </div>
    </div>
  );
};

export default ActivityCard;
