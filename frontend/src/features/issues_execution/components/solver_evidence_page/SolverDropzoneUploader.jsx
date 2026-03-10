import React from "react";

const SolverDropzoneUploader = ({
  fileInputRef,
  handleFileUpload,
  isUploading,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <div
        onClick={() => fileInputRef.current.click()}
        className={`border-2 border-dashed rounded-2xl p-10 transition-all cursor-pointer group ${
          isUploading
            ? "border-blue-300 bg-blue-50/30"
            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isUploading
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600"
            }`}
          >
            {isUploading ? (
              <svg
                className="w-8 h-8 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isUploading ? "Uploading files..." : "Upload field evidence"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Drag and drop files here, or{" "}
              <span className="text-blue-600 font-bold underline">browse</span>
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded">
              Images (JPG, PNG)
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded">
              Videos (MP4)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolverDropzoneUploader;
