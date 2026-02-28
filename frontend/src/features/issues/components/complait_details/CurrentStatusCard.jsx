import { ShieldCheck } from "lucide-react";

export default function CurrentStatusCard({ complaint }) {
  const currentEvent = complaint?.timeline.find(e => e.is_current === true);
  const currentMessage = currentEvent?.description;
  return (
    <section
      className="
      relative
      rounded-2xl
      p-8
      bg-blue-50/60
      border border-blue-100
      overflow-hidden
    "
    >
      {/* Soft background icon */}
      <div className="absolute top-6 right-6 opacity-[0.06] pointer-events-none">
        <ShieldCheck className="w-20 h-20 text-blue-600" />
      </div>

      {/* Label */}
      <h2
        className="
        text-blue-700
        font-semibold
        text-xs
        uppercase
        tracking-[0.18em]
        mb-3
      "
      >
        Current Update
      </h2>

      {/* Message */}
      <p
        className="
        text-lg
        text-slate-800
        leading-relaxed
        max-w-2xl
      "
      >
        {currentMessage ||
          "Your complaint is currently under review by our team. We will share updates as progress is made."}
      </p>
    </section>
  );
}
