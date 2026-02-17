import { useState } from "react";
import { Pencil } from "lucide-react";

export default function InlineEditableText({
  value,
  onSave,
  className = "",
  placeholder = "Add text",
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || "");

  const save = () => {
    setEditing(false);
    if (text !== value) onSave(text);
  };

  return (
    <div className="group relative">
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className={`bg-transparent border-b border-blue-500 outline-none ${className}`}
          placeholder={placeholder}
        />
      ) : (
        <div
          onClick={() => setEditing(true)}
          className={`cursor-text ${className}`}
        >
          {value || <span className="text-slate-400">{placeholder}</span>}
          <Pencil
            size={14}
            className="cursor-pointer inline ml-2 opacity-0 group-hover:opacity-100 text-slate-400"
          />
        </div>
      )}
    </div>
  );
}
