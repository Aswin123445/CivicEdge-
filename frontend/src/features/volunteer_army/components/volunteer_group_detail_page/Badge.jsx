// components/shared/Badge.jsx

/**
 * @param {"blue"|"green"|"yellow"|"red"|"neutral"} variant
 */
const Badge = ({ children, variant = "neutral" }) => {
  const variants = {
    blue:    "bg-blue-50 text-blue-700 border-blue-100",
    green:   "bg-green-50 text-green-700 border-green-100",
    yellow:  "bg-yellow-50 text-yellow-700 border-yellow-100",
    red:     "bg-red-50 text-red-700 border-red-100",
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
