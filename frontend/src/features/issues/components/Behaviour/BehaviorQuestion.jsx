const BehaviorQuestion = ({ question, value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-800">
        {question.question_text}
      </h3>

      {/* MULTIPLE CHOICE */}
      {question.response_type === "MULTIPLE_CHOICE" && (
        <div className="space-y-3">
          {question.options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={`w-full p-4 rounded-xl border text-left
                ${
                  value === opt.key
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* YES / NO */}
      {question.response_type === "YES_NO" && (
        <div className="grid grid-cols-2 gap-4">
          {["YES", "NO"].map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`py-4 rounded-xl border
                ${
                  value === opt
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white"
                }
              `}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BehaviorQuestion;