const UserSkeleton = () => {
  return (
    <div className="hidden md:flex items-center gap-3 bg-blue-700/30 px-3 py-1.5 rounded-full animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-7 h-7 rounded-full bg-blue-200/60" />

      {/* Name skeleton */}
      <div className="h-3 w-20 rounded bg-blue-200/60" />
    </div>
  );
};
export default UserSkeleton;