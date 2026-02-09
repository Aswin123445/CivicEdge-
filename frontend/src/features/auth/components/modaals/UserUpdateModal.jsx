import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function UserUpdateModal({ user, onClose, onSave,options }) {
  const [role, setRole] = useState("");
  const {role1,role2} = options

  // Initialize form with user data
  useEffect(() => {
    if (role1) {
      setRole(role1);
    }
  }, [role1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, role }); // Pass updated values
    onClose();
  };

  if (!user) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1e1e1e] text-white rounded-2xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
          <h2 className="text-lg font-semibold">Edit {user.name}</h2>
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
            <label className="block p2 text-sm text-gray-400 mb-1">Role</label>
            <select
              value={user.role === role ? role1 : role2}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
            >
              <option value={user.role}>{user.role === role1 ? role1 : role2}</option>
              <option value={user.role === role1? role2 :role1}>{user.role === role1? role2 :role1}</option>
            </select>
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
              className="px-4 py-2 rounded-md font-semibold bg-cyan-400 hover:bg-cyan-500 text-sm"
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
export default UserUpdateModal