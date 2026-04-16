import React, { useState } from "react";
import { ThumbsUp, Sparkles, AlertCircle } from "lucide-react";

const REACTIONS = [
  { type: "like", label: "Like", Icon: ThumbsUp, countKey: "like" },
  {
    type: "appreciate",
    label: "Appreciate",
    Icon: Sparkles,
    countKey: "appreciate",
  },
  {
    type: "important",
    label: "Important",
    Icon: AlertCircle,
    countKey: "important",
  },
];

/**
 * ReactionBar
 * Props:
 *   summary      {{ like, appreciate, important }}
 *   userReaction {string|null}  - currently active reaction type
 *   onReact      {function}     - (type: string|null) => void
 */
const ReactionBar = ({ summary = {}, userReaction = null, onReact }) => {
  const [active, setActive] = useState(userReaction ?? null);
  const handleReact = (type) => {
    const next = type;

    if (type === userReaction) {
      onReact?.(next);
      setActive(null);
    } else {
      onReact?.(next);
      setActive(next);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 border-y border-slate-100">
      {REACTIONS.map(({ type, label, Icon, countKey }) => {
        const isActive = active === type;
        const count = summary?.[countKey] ?? 0;
        return (
          <button
            key={type}
            onClick={() => handleReact(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
            />
            {label}
            <span className={isActive ? "text-blue-100" : "text-slate-400"}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ReactionBar;
