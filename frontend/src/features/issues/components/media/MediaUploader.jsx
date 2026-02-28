import React from "react";
import { Camera } from "lucide-react";

const MAX_IMAGES = 3;

const MediaUploader = ({
  images,
  setImages,
  fileInputRef,
  imageUrls,
  setImageUrls,
  setLoadingPreviews,
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) return;

    const selectedFiles = files.slice(0, remainingSlots);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    
    const fileObjects = selectedFiles.map((file) => file);

    setImages((prev) => [...prev, ...fileObjects]);
    setImageUrls((prev) => [...prev, ...previews]);
    setLoadingPreviews((prev) => [
      ...prev,
      ...new Array(previews.length).fill(true),
    ]);
  };

  return (
    <section>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={images.length >= MAX_IMAGES}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={images.length >= MAX_IMAGES}
        className={`
          w-full group aspect-video sm:aspect-[21/9]
          rounded-[2rem] border-2 border-dashed
          transition-all flex flex-col items-center justify-center gap-3
          ${
            images.length >= MAX_IMAGES
              ? "bg-slate-100 border-slate-200 cursor-not-allowed"
              : "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm hover:shadow-md"
          }
        `}
      >
        <div
          className={`p-4 rounded-2xl transition-colors ${
            images.length >= MAX_IMAGES
              ? "bg-slate-200 text-slate-400"
              : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
          }`}
        >
          <Camera size={32} />
        </div>

        <div className="text-center">
          <p className="font-bold text-slate-700">
            {images.length >= MAX_IMAGES
              ? "Maximum photos added"
              : "Click to upload photos"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            JPEG or PNG • Clear images work best
          </p>
        </div>
      </button>
    </section>
  );
};

export default MediaUploader;
