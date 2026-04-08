import { Info } from "lucide-react";
import {
  PollContextSkeleton,
  PollDidYouKnowSkeleton,
} from "./PollDetailSkeleton";

/**
 * PollContext
 *
 * Props:
 *   context    string | null
 *   isLoading  boolean
 */
export const PollContext = ({ context = null, isLoading = false }) => {
  if (isLoading) return <PollContextSkeleton />;
  if (!context) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-6">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
        Background & Context
      </h2>
      <p className="text-slate-700 leading-relaxed text-lg">{context}</p>
    </section>
  );
};

/**
 * PollDidYouKnow
 *
 * Props:
 *   fact       string | null
 *   isLoading  boolean
 */
export const PollDidYouKnow = ({ fact = null, isLoading = false }) => {
  if (isLoading) return <PollDidYouKnowSkeleton />;
  if (!fact) return null;

  return (
    <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex gap-4 items-start">
      <div className="bg-blue-600 p-2 rounded-lg text-white shrink-0">
        <Info size={20} />
      </div>
      <div>
        <h3 className="font-bold text-blue-900 mb-1">Did you know?</h3>
        <p className="text-blue-800/80 text-sm leading-relaxed">{fact}</p>
      </div>
    </section>
  );
};
