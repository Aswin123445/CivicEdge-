import React from 'react'

const SolverEstimationForm = ({ formData, handleInputChange, handleSubmit,loading }) => {
  return (
    <main className="col-span-12 lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-10">
                
                {/* --- Section: Financial & Time Estimation --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Estimated Budget */}
                  <section className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider block">Estimated Budget</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-500 font-bold">₹</span>
                      </div>
                      <input 
                        type="number"
                        name="estimated_budget"
                        value={formData.estimated_budget}
                        onChange={handleInputChange}
                        placeholder="25000"
                        className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic">Approximate cost for materials, labor, and equipment.</p>
                  </section>

                  {/* Estimated Duration */}
                  <section className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider block">Estimated Duration</label>
                    <div className="relative group">
                      <input 
                        type="number"
                        name="estimated_duration_days"
                        min="1"
                        value={formData.estimated_duration_days}
                        onChange={handleInputChange}
                        placeholder="3"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-slate-400 text-xs font-bold uppercase">Days</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">Expected time to reach completion.</p>
                  </section>
                </div>

                <hr className="border-slate-100" />

                {/* --- Section: Site Constraints --- */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Site Constraints</label>
                  </div>
                  <textarea 
                    name="site_constraints"
                    value={formData.site_constraints}
                    onChange={handleInputChange}
                    placeholder="e.g., Limited vehicle access, Heavy traffic area, Waterlogged ground..."
                    className="w-full h-28 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm leading-relaxed"
                  ></textarea>
                </section>

                {/* --- Section: Execution Risks --- */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Execution Risks</label>
                  </div>
                  <textarea 
                    name="execution_risks"
                    value={formData.execution_risks}
                    onChange={handleInputChange}
                    placeholder="e.g., Heavy rainfall may delay excavation, Nearby electrical lines..."
                    className="w-full h-28 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm leading-relaxed"
                  ></textarea>
                </section>
              </div>

              {/* --- Form Actions --- */}
              <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={() => {window.history.back()}}
                  type="button" 
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  back
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Save & Continue
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </main>
  )
}

export default SolverEstimationForm
