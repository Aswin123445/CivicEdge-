import { User } from "lucide-react";
import UserUpdateModal from "../../components/modaals/UserUpdateModal";
import FlagModal from "../../components/modaals/UserFlagModal";
import UserCard from "../../components/UserCard";
import { useAdmin } from "../../hooks/admin/useAdminAdminsMangement";
import Pagination from "../../../../components/common/PaginationBar";
import UserManagementSectionLoader from "../../components/skeltons/loaders_skelton/UserManagementSectionLoader";
import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator";


const AdminManagement = () => {
  const {
    admins,
    isLoading,
    isFetching,
    // isSuccess,
    // isFlagModalUser,
    setisFlagModalUser,
    setSelectedCard,
    // selectedCard
    isSinglePage,
    isFirstPage,
    isLastPage,
    totalPages,
    goToPage,
    page,
    searchValue,
    setSearchValue
  } = useAdmin();

  if (isLoading) {
    return <UserManagementSectionLoader />;
  }



  return (
    <>
      <div className="relative mb-6 ml-2 w-48">
        <input
          type="text"
          placeholder="search for user"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-8 pl-3 pr-8 rounded-md bg-[#2B2B2B] border border-gray-600 text-white"
        />

        {isFetching && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <DottedLoaderIndicator />
          </div>
        )}
      </div>

      {/* User cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {admins?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            setSelectedCard={setSelectedCard}
            setIsFlagModalUser={setisFlagModalUser}
            role="admin"
          />
        ))}
      </div>
      {!isSinglePage && (
        <div className="sticky bottom-0 py-4 ">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            onPageChange={goToPage}
          />
        </div>
      )}
    </>
  );
};

export default AdminManagement;
