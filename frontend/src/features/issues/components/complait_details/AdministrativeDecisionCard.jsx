const AdministrativeDecisionCard = ({ decision }) => (
  <section className="
    bg-blue-50/60
    rounded-2xl
    p-8
    border border-blue-100
  ">
    {/* Section Label */}
    <h2 className="
      text-blue-700
      font-semibold
      text-xs
      uppercase
      tracking-[0.18em]
      mb-3
    ">
      Administrative Update
    </h2>

    {/* Decision Type */}
    <h3 className="
      text-lg
      font-medium
      text-slate-900
      mb-3
    ">
      {decision.type}
    </h3>

    {/* Reason */}
    <p className="
      text-slate-700
      leading-relaxed
      max-w-2xl
    ">
      {decision.reason}
    </p>

    {/* Footer Meta */}
    <div className="
      mt-5
      pt-4
      border-t border-blue-100
      text-sm
      text-slate-500
    ">
      Updated on {decision.date}
    </div>
  </section>
);

export default AdministrativeDecisionCard;