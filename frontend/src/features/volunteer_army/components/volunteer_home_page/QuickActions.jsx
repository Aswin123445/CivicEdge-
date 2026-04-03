// components/volunteer/QuickActions.jsx
import { ShieldCheck, Clock, Award, Search } from "lucide-react";
import React from "react";

const ACTIONS = [
  {
    key: "memberships",
    label: "Memberships",
    icon: <ShieldCheck />,
    countKey: "memberships_count",
    color: "bg-purple-50 text-purple-600",
  },
  {
    key: "participations",
    label: "Participations",
    icon: <Clock />,
    countKey: "participations_count",
    color: "bg-blue-50 text-blue-600",
  },
  {
    key: "recognitions",
    label: "Recognitions",
    icon: <Award />,
    countKey: "recognitions_count",
    color: "bg-amber-50 text-amber-600",
  },
  {
    key: "find",
    label: "Find Groups",
    icon: <Search />,
    countKey: null,
    color: "bg-slate-50 text-slate-600",
  },
];

/**
 * @param {object} quickActions - { memberships_count, participations_count, recognitions_count }
 * @param {function} onActionClick - (key) => void
 */
const QuickActions = ({ quickActions = {}, onActionClick }) => (
  <section>
    <h3 className="text-xl font-bold mb-6">Dashboard Shortcuts</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ACTIONS.map((action) => (
        <button
          key={action.key}
          onClick={() => onActionClick?.(action.key)}
          className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 transition-all group"
        >
          <div
            className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
          >
            {React.cloneElement(action.icon, { size: 20 })}
          </div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {action.label}
          </div>
          {action.countKey && quickActions[action.countKey] !== undefined && (
            <div className="text-2xl font-bold text-slate-900">
              {quickActions[action.countKey]}
            </div>
          )}
        </button>
      ))}
    </div>
  </section>
);

export default QuickActions;
