// components/admin/events/update/FormPrimitives.jsx
import { AlertCircle } from "lucide-react";

// ─── SectionCard ──────────────────────────────────────
export const SectionCard = ({ title, subtitle, children }) => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm mb-6">
    <div className="px-8 py-6 border-b border-slate-800/50">
      <h3 className="text-lg font-black text-slate-100 tracking-tight italic">
        {title}
      </h3>
      {subtitle && (
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
          {subtitle}
        </p>
      )}
    </div>
    <div className="p-8">{children}</div>
  </div>
);

// ─── InputField ───────────────────────────────────────
export const InputField = ({
  label,
  icon,
  value,
  onChange,
  error,
  type = "text",
  disabled = false,
  placeholder = "",
}) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1 group-focus-within:text-blue-500 transition-colors">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value ?? ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full bg-[#1e1e1e] border ${
          error ? "border-red-500/50" : "border-slate-800"
        } rounded-xl py-3.5 ${icon ? "pl-12" : "px-4"} pr-4 text-sm text-slate-200 outline-none focus:border-blue-500 transition-all disabled:opacity-50`}
      />
    </div>
    {error && (
      <div className="flex items-center gap-1.5 text-red-500 mt-1 ml-1">
        <AlertCircle size={12} />
        <p className="text-[10px] font-bold uppercase tracking-tight">{error}</p>
      </div>
    )}
  </div>
);
