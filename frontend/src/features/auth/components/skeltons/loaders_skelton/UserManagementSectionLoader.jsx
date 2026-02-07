// components/loaders/SectionLoader.jsx
import AdminUserGridSkelton from "../AdminUserGridSkelton"

const UserManagementSectionLoader = () => {
  return (
    <div className="p-4">
      <AdminUserGridSkelton count={6} />
    </div>
  );
};

export default UserManagementSectionLoader;
