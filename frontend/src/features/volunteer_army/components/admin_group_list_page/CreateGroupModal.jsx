// components/admin/volunteer-groups/CreateGroupModal.jsx
import { useState } from "react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";

const INITIAL_FORM = {
  name:            "",
  description:     "",
  membership_type: "OPEN",
  risk_level:      "LOW",
  requirements:    "",
};

/**
 * @param {boolean}  isOpen
 * @param {function} onClose
 * @param {function} onSubmit  - (formData: object) => void
 */
const CreateGroupModal = ({ isOpen, onClose, onSubmit,createGroupLoading }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onSubmit?.(formData);
    setFormData(INITIAL_FORM);
    onClose?.();
  };

  const inputClass =
    "w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3.5 px-4 text-sm focus:border-blue-500 outline-none text-slate-200 transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1e1e1e]/10 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#1e1e1e] border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-100 tracking-tight">
              Create Volunteer Group
            </h2>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Initialize a new specialized squad for the community.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Group Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., Medical First Responders"
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Mission and scope..."
              className={`${inputClass} resize-none`}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Membership + Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Membership Type
              </label>
              <select
                name="membership_type"
                className={`${inputClass} font-bold`}
                value={formData.membership_type}
                onChange={handleChange}
              >
                <option value="OPEN">OPEN (Public Access)</option>
                <option value="APPROVAL_REQUIRED">APPROVAL REQUIRED</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Risk Level
              </label>
              <select
                name="risk_level"
                className={`${inputClass} font-bold`}
                value={formData.risk_level}
                onChange={handleChange}
              >
                <option value="LOW">LOW RISK</option>
                <option value="MEDIUM">MEDIUM RISK</option>
                <option value="HIGH">HIGH RISK</option>
              </select>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Requirements
            </label>
            <textarea
              name="requirements"
              rows="2"
              placeholder="Skills or certifications required..."
              className={`${inputClass} resize-none italic`}
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>

          {/* High risk warning */}
          {formData.risk_level === "HIGH" && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 items-center">
              <AlertTriangle className="text-red-400 shrink-0" size={20} />
              <p className="text-[11px] text-red-300 font-medium">
                High Risk groups require strict verification protocols.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <CheckCircle2 size={18} /> {createGroupLoading ? 'Creating...' : 'Initialize Group'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
