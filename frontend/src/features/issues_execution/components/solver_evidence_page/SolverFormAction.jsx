import React from 'react'

const SolverFormAction = ({handleSubmit, isSubmitting, isUploading, evidences}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
              <button 
                onClick={() => {window.history.back()}}
                type="button" 
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || isUploading || evidences.length === 0}
                className={`px-8 py-2.5 text-white font-bold rounded-lg transition shadow-lg active:scale-95 flex items-center gap-2 ${
                  evidences.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Save & Continue
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </>
                )}
              </button>
            </div>
  )
}

export default SolverFormAction
