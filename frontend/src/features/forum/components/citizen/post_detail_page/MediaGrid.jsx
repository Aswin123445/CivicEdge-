import React from "react";

/**
 * MediaGrid
 * Props:
 *   media {Array<{ url, public_id }>}
 */
const MediaGrid = ({ media }) => {
  const items = Array.isArray(media) ? media.filter(Boolean) : [];
  if (items.length === 0) return null;

  return (
    <div
      className={`grid gap-3 ${
        items.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {items.map((item) => (
        <div
          key={item?.public_id ?? item?.url}
          className="rounded-xl overflow-hidden border border-slate-200"
        >
          {item?.url && (
            <img
              src={item.url}
              alt="Post media"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
