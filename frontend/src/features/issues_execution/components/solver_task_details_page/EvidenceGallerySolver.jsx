import React from "react";

const EvidenceGallerySolver = ({ taskData, setSelectedImage }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Evidence</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {taskData.evidences.map((img) => (
          <div
            key={img.id}
            className="relative group cursor-zoom-in overflow-hidden rounded-lg border border-slate-200 aspect-square"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img?.cloudinary_url}
              alt="Citizen evidence"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EvidenceGallerySolver;
