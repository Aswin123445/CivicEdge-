import { useState } from "react";
import ReactDOM from "react-dom";
import { useAdminSolver } from "../../hooks/admin/useAdminSolver";

function SolverCreateModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setMail] = useState("")
  const [zoneId,setZoneId] = useState("")

  const {zones} = useAdminSolver()
  console.log(zones,"zones in modal");
  const handleSubmit = (e) => {
    e.preventDefault();
    const zone_id = zoneId;
    onSave({  name ,password, email, zone_id }); // Pass updated values
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1e1e1e] text-white rounded-2xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
          <h2 className="text-lg font-semibold">Create Solver</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (read-only or editable depending on need) */}

          {/* Role Select */}
          <div>
            <label className="block  text-sm text-gray-400 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
              required
            />
            <div className="pt-2">
             <label className="block text-sm text-gray-400 mb-1">
               Zone of Operation
             </label>
           
             <select
               value={zoneId}
               onChange={(e) => setZoneId(e.target.value)}
               className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
               required
             >
               {/* Default message */}
               <option value="" disabled>
                 Select a zone
               </option>
               {/* Options from list */}
               {zones.map((r) => (
                 <option key={r.id} value={r.id}>
                   {r.name}
                 </option>
               ))}
             </select>
           </div>

            <label className="block pt-2 text-sm text-gray-400 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setMail(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
              required
            />
            <label className="block pt-2 text-sm text-gray-400 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold bg-cyan-600 hover:bg-cyan-700 text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
export default SolverCreateModal