const DetailItem = ({ label, value, isAlert }) => (
  <div>
    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
    <p className={`mt-0.5 font-medium ${isAlert ? 'text-orange-400' : 'text-slate-200'}`}>{value}</p>
  </div>
);
export default DetailItem