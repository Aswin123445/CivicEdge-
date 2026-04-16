import React from "react";
import { Send } from "lucide-react";

/**
 * CommentForm
 * Props:
 *   value      {string}
 *   onChange   {function} - (value: string) => void
 *   onSubmit   {function} - (e) => void
 */
const CommentForm = ({ value = "", onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="relative">
    <textarea
      placeholder="Add your perspective…"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full p-4 pr-12 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all resize-none min-h-[100px] text-sm text-slate-700 bg-slate-50"
    />
    <button
      type="submit"
      disabled={!value.trim()}
      aria-label="Post comment"
      className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
    >
      <Send size={16} />
    </button>
  </form>
);

export default CommentForm;
