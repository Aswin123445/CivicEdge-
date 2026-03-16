import React from 'react'

const SolverEvidenceGallery = ({reportData}) => {
  return (
    <section className="bg-[#1e1e1e]0 border border-slate-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Verification Photos (Solver)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {reportData?.evidence?.map((i) => (
                  <div key={i.id} className="aspect-video bg-slate-800 rounded-lg border border-slate-700 overflow-hidden group cursor-zoom-in relative">
                     <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="h-full w-full flex items-center justify-center text-slate-600 italic text-xs">
                      <img
                        src={i?.secure_url} 
                        alt={`Evidence ${i?.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
  )
}

export default SolverEvidenceGallery
