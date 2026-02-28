import { X, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

const MediaPreviewGrid = ({ images, removeImage,loadingPreviews,setLoadingPreviews }) => {
  // track loading state per slot
  return (
    <div className="grid grid-cols-3 gap-4">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="relative aspect-square rounded-2xl border bg-white overflow-hidden"
        >
          {images[index] ? (
            <>
              {/* Skeleton */}
              {loadingPreviews[index] && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse z-10" />
              )}

              {/* Image */}
              <img
                src={images[index]}
                alt={`Evidence ${index + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  loadingPreviews[index] ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() =>
                  setLoadingPreviews((prev) => {
                    const copy = [...prev];
                    copy[index] = false;
                    return copy;
                  })
                }
              />

              {/* Remove button */}
              {!loadingPreviews[index] && (
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-white rounded shadow z-20"
                >
                  <X size={14} />
                </button>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <ImageIcon size={24} />
              <span className="text-xs">Slot {index + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaPreviewGrid;