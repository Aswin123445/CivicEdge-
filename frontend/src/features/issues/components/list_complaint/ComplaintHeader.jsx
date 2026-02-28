const ComplaintHeader = () => (
  <header className="max-w-5xl mx-auto pt-16 px-6 mb-5">
    {/* Context tag */}
    <div className="inline-flex items-center mb-4">
      <span className="h-1 w-6 rounded-full bg-blue-600 mr-3" />
      <span className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
        CivicEdge
      </span>
    </div>

    {/* Title */}
    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
      My Issues
    </h1>

    {/* Description */}
    <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
      View the progress and outcomes of the complaints you’ve raised with local authorities.
    </p>
  </header>
);

export default ComplaintHeader;