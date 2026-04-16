import React from "react";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * PostCard
 * Props:
 *   post {object} - Post object following API schema:
 *     { id, title, created_at, category: { id, name }, media_preview }
 */
const PostCard = ({ post,handleDetailsClick }) => {
  if (!post) return null;

  const { title, created_at, category, media_preview, id } = post;

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all ">
      <div className="flex flex-col gap-4">
        {/* Media Preview */}
        {media_preview && (
          <div className="w-full h-48 rounded-lg overflow-hidden bg-slate-100">
            <img 
              onClick={()=>handleDetailsClick(id)}
              src={media_preview}
              alt={title ?? "Post image"}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {category?.name && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {category.name}
              </span>
            )}
            {category?.name && created_at && (
              <span className="text-slate-400 text-xs">•</span>
            )}
            {created_at && (
              <span className="text-slate-500 text-xs">
                {formatDate(created_at)}
              </span>
            )}
          </div>

          <h3 onClick={()=>handleDetailsClick(id)} className="text-lg font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer ">
            {title ?? "Untitled post"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
