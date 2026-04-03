// components/admin/events/create/FormPrimitives.jsx

// ─── SectionContainer ─────────────────────────────────
/**
 * @param {string}    title
 * @param {string}    subtitle
 * @param {ReactNode} children
 */
export const SectionContainer = ({ title, subtitle, children }) => (
  <section className="bg-[#1e1e1e] border border-slate-900 rounded-3xl p-6 relative overflow-hidden">
    <div className="mb-8">
      <h2 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 text-xs font-medium mt-1">{subtitle}</p>
      )}
    </div>
    {children}
  </section>
);

// ─── InputField ───────────────────────────────────────
/**
 * @param {string}    label
 * @param {string}    placeholder
 * @param {string}    type
 * @param {any}       value
 * @param {function}  onChange   - (value: string) => void
 * @param {ReactNode} icon
 * @param {string}    error
 */
export const InputField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  error,
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
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full bg-[#1e1e1e] border ${
          error ? "border-red-500/50" : "border-slate-800"
        } rounded-xl py-3.5 ${icon ? "pl-12" : "px-4"} pr-4 text-sm text-slate-100 placeholder:text-slate-700 outline-none focus:border-blue-500 transition-all`}
      />
    </div>
    {error && (
      <p className="text-[10px] text-red-500 font-bold ml-1">{error}</p>
    )}
  </div>
);
