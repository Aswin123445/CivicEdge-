import AdminUserCardSkeleton from "./AdminUserCardSkelton";
const AdminUserGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <AdminUserCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default AdminUserGridSkeleton;
