import React from "react";
import ExecutionProofRow from "../../ui/admin_proof_list_page/ExecutionProofRow";

const AdminProofTable = ({ proofs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#1e1e1e] border-b border-slate-700">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Proof ID
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Issue Reference
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Submitted At
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {proofs.map((proof) => (
            <ExecutionProofRow key={proof.id} proof={proof} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProofTable;
