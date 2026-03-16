const ReportCard = ({ title, content }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5">
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</h4>
    <p className="text-slate-200 leading-relaxed text-sm">{content }</p>
  </div>
);

export default ReportCard;