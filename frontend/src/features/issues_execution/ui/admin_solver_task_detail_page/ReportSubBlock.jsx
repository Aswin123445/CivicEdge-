const ReportSubBlock = ({ label, value }) => (
  <div className="bg-[#1e1e1e] p-4 rounded-lg border border-slate-800">
    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</div>
    <p className="text-sm text-slate-300 leading-snug">{value}</p>
  </div>
); 

export default ReportSubBlock