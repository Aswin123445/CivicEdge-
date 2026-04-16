const LoadingState = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-16 bg-[#1e1e1e]/50 border border-slate-800 rounded-xl"
      />
    ))}
  </div>
);

export default LoadingState;