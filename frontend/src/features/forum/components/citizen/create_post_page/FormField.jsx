import React from "react";
import { AlertCircle } from "lucide-react";

/**
 * FormField
 * Wraps a label + any input child + inline error message.
 *
 * Props:
 *   label    {string}       - Field label text
 *   error    {string|null}  - Error message (falsy = no error)
 *   children {ReactNode}    - The actual input/select/textarea
 *   hint     {string}       - Optional hint below label (right-aligned)
 */
const FormField = ({ label, error, hint, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>

    {children}

    {error && (
      <p className="flex items-center gap-1 text-red-500 text-xs mt-0.5">
        <AlertCircle size={11} />
        {error}
      </p>
    )}
  </div>
);

/**
 * Shared input class builder — keeps error/normal states DRY.
 * Usage: className={inputCls(error)}
 */
export const inputCls = (error) =>
  `w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none focus:ring-4 ${
    error
      ? "border-red-400 focus:ring-red-50 bg-red-50/30"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-50 bg-white"
  }`;

export default FormField;
