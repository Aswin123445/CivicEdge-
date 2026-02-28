const EvidenceSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-3 gap-3 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            aspect-square
            rounded-xl
            bg-slate-200
          "
        />
      ))}
    </div>
  );
};

export default EvidenceSkeleton;