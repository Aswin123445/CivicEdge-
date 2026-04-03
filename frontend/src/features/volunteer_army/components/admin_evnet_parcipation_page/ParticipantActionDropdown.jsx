// components/admin/events/participants/ParticipantActionDropdown.jsx
import { useState } from "react";

/**
 * @param {object}   participant
 * @param {function} onView      - (participant) => void
 */
const ParticipantActionDropdown = ({ participant, onView }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="text-slate-400 hover:text-slate-200 transition text-lg font-bold px-2"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-[#1e1e1e] border border-slate-700 rounded-lg shadow-md z-10">
          <button
            onClick={() => { onView?.(participant); setOpen(false); }}
            className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
          >
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default ParticipantActionDropdown;
