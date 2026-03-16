import React from 'react'
import ProgressUpdateCard from '../../ui/admin_execution_proof_details_page/ProgressUpdateCard'

const AdminProofDetailsExecutionTimeLine = ({proofData}) => {
  return (
    <section className="space-y-4">
              <h2 className="text-lg font-semibold">Execution Progress Timeline</h2>
              <div className="space-y-4">
                {proofData?.progress.map((update) => (
                  <ProgressUpdateCard key={update.reference_id} update={update} />
                ))}
              </div>
            </section>
  )
}

export default AdminProofDetailsExecutionTimeLine
