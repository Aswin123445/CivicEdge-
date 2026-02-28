const LocationSkeleton = () => {
  return (
    <div className="space-y-2 animate-pulse">
      {/* Zone name */}
      <div className="h-4 w-1/2 rounded-md bg-slate-200" />

      {/* Lat / Lng line */}
      <div className="h-3 w-2/3 rounded-md bg-slate-200" />
    </div>
  );
};

export default LocationSkeleton;