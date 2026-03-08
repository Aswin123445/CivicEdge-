
const DetailItem = ({ label, value, highlight }) => (
  <div>
    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}
    </span>
    <p
      className={`mt-1 font-medium ${highlight ? "text-blue-400" : "text-slate-200"}`}
    >
      {value}
    </p>
  </div>
);

export default DetailItem
