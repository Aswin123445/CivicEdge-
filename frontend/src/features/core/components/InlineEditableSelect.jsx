import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function InlineEditableSelect({
  value,
  options = [],
  onSave,
  className = "",
  placeholder = "Select",
}) {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(value || "");

  const save = (val) => {
    setEditing(false);
    onSave({zone_id:val});
  };

  return (
    <div className={`relative ${className}`}>
      {editing ? (
        <select
          autoFocus
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            save(e.target.value);
          }}
          onBlur={() => setEditing(false)}
          className="
            bg-white border border-slate-300 rounded-md
            px-2 py-1 text-sm
            shadow-sm outline-none
            focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="" disabled>
             place near you
          </option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="cursor-pointer flex items-center gap-1 hover:text-slate-700"
        >
          {value || (
            <span className="text-slate-400">{placeholder}</span>
          )}
          <ChevronDown size={14} className="opacity-60" />
        </div>
      )}
    </div>
  );
}
