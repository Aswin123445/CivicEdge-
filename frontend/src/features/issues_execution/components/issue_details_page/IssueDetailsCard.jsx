const IssueDetailsCard = ({ issue }) => {
  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Issue Details</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Title
          </label>
          <p className="text-slate-200 mt-1">{issue?.title}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Description
          </label>
          <p className="text-slate-300 mt-1 leading-relaxed">
            {issue?.description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Reporter
            </label>
            <p className="text-slate-300 text-sm truncate">{issue?.reporter_mail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueDetailsCard;
