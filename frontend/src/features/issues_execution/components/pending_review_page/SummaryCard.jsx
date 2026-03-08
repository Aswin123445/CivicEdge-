const SummaryCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[#1e1e1e] border border-[#1f2937] p-5 rounded-xl flex items-center justify-between">
    <div>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-semibold text-slate-100">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg bg-opacity-10 ${color}`}>
      <Icon size={20} />
    </div>
  </div>
);

export default SummaryCard;