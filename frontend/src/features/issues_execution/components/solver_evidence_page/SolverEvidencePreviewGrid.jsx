import React from "react";

const SolverEvidencePreviewGrid = ({ evidences, removeEvidence ,setEvidences}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Uploaded Media ({evidences?.length})
        </h3>
        <button
          onClick={() => setEvidences([])}
          className="text-xs font-bold text-red-500 hover:text-red-600"
        >
          Remove All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {evidences?.map((file) => (
          <div
            key={file.public_id}
            className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="aspect-video bg-slate-100 relative">
              {file.resource_type === "video" ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white">
                  <svg
                    className="w-8 h-8 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                </div>
              ) : (
                <img
                  src={file.secure_url}
                  alt="Evidence"
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => removeEvidence(file.public_id)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-3">
              <p className="text-[10px] font-mono font-bold text-slate-400 truncate mb-1">
                {file.file_name}
              </p>
              <div className="flex justify-between items-center">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolverEvidencePreviewGrid;
