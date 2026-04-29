// components/admin/volunteer-groups/EditGroupModal.jsx
import { useEffect, useState } from "react";
import { X, AlertTriangle, Save } from "lucide-react";

const EditGroupModal = ({
  isOpen,
  onClose,
  onSubmit,
  group,
  updateGroupLoading,
  serverErrors = {},
}) => {
  const INITIAL_FORM = {
    name: "",
    description: "",
    risk_level: "LOW",
    requirements: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  console.log(errors)
  useEffect(() => {
    if (group && isOpen) {
      setFormData({
        name: group?.name || "",
        description: group?.description || "",
        membership_type: group?.membership_type || "OPEN",
        risk_level: group?.risk_level || "LOW",
        requirements: group?.requirements || "",
      });
      setErrors({});
    }
  }, [group, isOpen]);

  if (!isOpen) return null;

  const validate = (data) => {
    const newErrors = {};

    const name = data.name?.trim();
    const description = data.description?.trim();
    const requirements = data.requirements?.trim();

    // Name
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Must be at least 3 characters";
    } else if (name.length > 255) {
      newErrors.name = "Maximum 255 characters allowed";
    } else if (!/[a-zA-Z]/.test(name)) {
      newErrors.name = "Must contain valid text";
    }

    // Description
    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Minimum 10 characters required";
    } else if (!/[a-zA-Z]/.test(description)) {
      newErrors.description = "Must contain meaningful text";
    }



    // Risk Level
    if (!data.risk_level) {
      newErrors.risk_level = "Select risk level";
    }

    // Requirements (optional)
    if (requirements && requirements.length < 10) {
      newErrors.requirements = "Must be at least 10 characters if provided";
    }

    if (group?.membership_type === "APPROVAL_REQUIRED"){
      if (!data.requirements) {
        newErrors.requirements = "Requirements are required";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit?.({...formData, id: group?.id});
  };

  const inputClass =
    "w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3.5 px-4 text-sm focus:border-blue-500 outline-none text-slate-200 transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={()=> {
          onClose();
          setErrors({});
          setFormData(INITIAL_FORM);
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#1e1e1e] border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-100 tracking-tight">
              Edit Volunteer Group
            </h2>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Update squad details and membership rules.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Group Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter group name"
              className={inputClass}
            />

            {(errors.name || serverErrors.name) && (
              <p className="text-red-500 text-sm">
                {errors.name || serverErrors.name?.[0]}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Description
            </label>

            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mission and scope..."
              className={`${inputClass} resize-none`}
            />

            {(errors.description || serverErrors.description) && (
              <p className="text-red-500 text-sm">
                {errors.description || serverErrors.description?.[0]}
              </p>
            )}
          </div>

          {/* Membership + Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Risk */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Risk Level
              </label>

              <select
                name="risk_level"
                value={formData.risk_level}
                onChange={handleChange}
                className={`${inputClass} font-bold`}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              {(errors.risk_level || serverErrors.risk_level) && (
                <p className="text-red-500 text-sm">
                  {errors.risk_level || serverErrors.risk_level?.[0]}
                </p>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Requirements
            </label>

            <textarea
              rows="2"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Skills / certificates..."
              className={`${inputClass} resize-none italic`}
            />

            {(errors.requirements || serverErrors.requirements) && (
              <p className="text-red-500 text-sm">
                {errors.requirements || serverErrors.requirements?.[0]}
              </p>
            )}
          </div>

          {/* Backend non-field errors */}
          {serverErrors.non_field_errors && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
              <p className="text-red-400 text-sm font-medium">
                {serverErrors.non_field_errors[0]}
              </p>
            </div>
          )}

          {/* High Risk Warning */}
          {formData.risk_level === "HIGH" && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-center">
              <AlertTriangle className="text-yellow-400 shrink-0" size={18} />
              <p className="text-[12px] text-yellow-300 font-medium">
                High risk groups may require stronger screening, training, and
                admin monitoring.
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
            disabled={updateGroupLoading}
            className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Save size={18} />
            {updateGroupLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModal;
