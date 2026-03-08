const PageHeader = ({ issue }) => {
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav className="text-xs font-semibold text-slate-100 uppercase tracking-widest mb-2">
          Decision Workspace
        </nav>
        <h1 className="text-3xl font-bold">Issue Assignment</h1>
        <p className="text-slate-400 mt-1">
          Assign a qualified civic solver to begin execution.
        </p>
      </div>
      <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg inline-flex items-center gap-3">
        <span className="text-slate-500 text-sm font-mono">REF:</span>
        <span className="font-mono text-blue-400 font-bold">
          {issue.reference_id}
        </span>
      </div>
    </header>
  );
};

export default PageHeader;
