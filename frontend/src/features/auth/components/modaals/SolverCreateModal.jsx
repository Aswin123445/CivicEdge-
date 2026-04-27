import { useState } from "react";
import ReactDOM from "react-dom";
import { useAdminSolver } from "../../hooks/admin/useAdminSolver";

function SolverCreateModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [errors, setErrors] = useState({});
  const { zones } = useAdminSolver();

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Only alphabets and spaces allowed";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Must contain at least one number";
    }

    // Zone validation
    if (!zoneId) {
      newErrors.zoneId = "Please select a zone";
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

    const zone_id = zoneId;
    onSave({ name, password, email, zone_id }); // Pass updated values
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
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
              {errors.zoneId && <p className="text-red-500 text-sm">{errors.zoneId}</p>}
            </div>

            <label className="block pt-2 text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setMail(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <label className="block pt-2 text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
    document.getElementById("modal-root"),
  );
}
export default SolverCreateModal;
