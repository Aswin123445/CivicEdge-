// ReviewBehaviorSummary.jsx
import { BrainCircuit } from "lucide-react";
import ReviewCard from "./ReviewCard";

export default function ReviewBehaviorSummary({ responses, isLoading }) {
  return (
    <ReviewCard title="Reflection Summary" icon={<BrainCircuit size={18} />}>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {responses.map((item) => (
          <div
            key={item?.id}
            className="bg-slate-50 p-3 rounded-xl border border-slate-200"
          >
            {/* Question */}
            <p className="text-xs text-slate-400 leading-snug">
              {item?.prompt_text}
            </p>

            {/* Answer */}
            <p className="mt-2 font-semibold text-slate-700">
              {item?.response_label ?? item?.response_value}
            </p>

            {/* Optional text (if present) */}
            {item?.optional_text && (
              <p className="mt-1 text-xs text-slate-500 italic">
                {item?.optional_text}
              </p>
            )}
          </div>
        ))}
      </div>
      
    </ReviewCard>
  );
}
