import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
function UserFlagModal({ user, onClose, onSave }) {
  const [status, setStatus] = useState(true); // default value

  useEffect(() => {
    if (user) {
      setStatus(user.is_active || true);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = () => {
    onSave({ ...user, is_active:status }); // send updated values back
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Control {user.role ? user.role[0].toUpperCase() + user.role.slice(1) : ""}</h2>

        {/* Status Select */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Status</label>
          <select
            value={status ? "active" : "suspend"}
            onChange={(e) => setStatus(e.target.value === "active"? true : false)}
            className="w-full p-2 rounded-md bg-[#1e1e1e] text-white border border-gray-600 focus:outline-none"
          >
            <option value={`${status? "active" : "suspend"}`}>{status? "Activate" : "Suspend"}</option>
            <option value={`${status? "suspend" : "acitve"}`}>{status? "Suspend" : "Activate"}</option>
          </select>
        </div>
        {/* Confirmation Message */}
        <div className="mb-3p-3  rounded mb-2 text-gray-300 text-sm">
          You are about to change flag of  <span className="font-bold ">{user.name}</span>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default UserFlagModal;
