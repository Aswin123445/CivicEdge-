/**
 * Skeleton
 * Shared pulse primitive. bg-gray-700/60 as specified.
 * Usage: <Skeleton className="h-4 w-32 rounded-xl" />
 */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded ${className}`} />
);

export default Skeleton;
