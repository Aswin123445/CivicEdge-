import React from 'react'
import IssueInfoPanel from './IssueInfoPanel'
import SidebarItem from '../../ui/admin_execution_proof_details_page/SidebarItem'

const AdminProofDetailsRightSide = ({proofData, handleOpenModal, isSubmitting, setIsSubmitting}) => {
  return (
    <div className="sticky top-6 space-y-6">
              
              {/* COMPONENT: IssueInfoPanel */}
              <IssueInfoPanel proofData={proofData} />

              {/* COMPONENT: SolverInfoPanel */}
              <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Supervisor Details</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold border border-slate-700">
                    {proofData?.solver.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">{proofData?.solver.email}</p>
                    <p className="text-xs text-slate-500">Field Solver</p>
                  </div>
                </div>
                <SidebarItem label="Role" value="Solver" />
              </div>

              {/* COMPONENT: AdminDecisionPanel (Duplicate Actions for Mobile/Quick access) */}
              <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => handleOpenModal('APPROVE')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Confirm Resolution
                  </button>
                  <button 
                    onClick={() => handleOpenModal('REJECT')}
                    className="w-full bg-slate-800 text-slate-200 py-3 rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors font-medium"
                  >
                    Send Back for Rework
                  </button>
                </div>
              </div>

            </div>
  )
}

export default AdminProofDetailsRightSide
