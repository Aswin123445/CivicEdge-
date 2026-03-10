import React from 'react'

const Resolved = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">
                Recently Resolved
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-slate-600 font-medium">
                      Park Cleanup
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-xs">13m ago</span>
                      <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                        Resolved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default Resolved
