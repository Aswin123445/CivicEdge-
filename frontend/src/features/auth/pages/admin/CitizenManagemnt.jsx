import UserUpdateModal from "../../components/modaals/UserUpdateModal";
import FlagModal from "../../components/modaals/UserFlagModal";
import useAdminUserManagement from "../../hooks/admin/useadminUserManagement";
import UserCard from "../../components/UserCard";
import Pagination from "../../../../components/common/PaginationBar";
import UserManagementSectionLoader from "../../components/skeltons/loaders_skelton/UserManagementSectionLoader";
import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator";
const UserManagement = () => {
  const {
    selectedCard,
    setSelectedCard,
    setisFlagModalUser,
    isFlagModalUser,
    handleSave,
    handleFlag,
    citizens,
    totalPages,
    isSinglePage,
    isFirstPage,
    isLastPage,
    goToPage,
    page,
    setSearchValue,
    searchValue,
    isLoading,
    isFetching,
  } = useAdminUserManagement();
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
        {citizens?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            setSelectedCard={setSelectedCard}
            setIsFlagModalUser={setisFlagModalUser}
          />
        ))}
        {selectedCard && (
          <UserUpdateModal
            user={selectedCard}
            onClose={() => setSelectedCard(null)}
            onSave={(updatedUser) => handleSave(updatedUser)}
            options={{ role1: "citizen", role2: "solver" }}
          />
        )}
        {isFlagModalUser && (
          <FlagModal
            user={isFlagModalUser}
            onClose={() => setisFlagModalUser(null)}
            onSave={(updatedUser) => handleFlag(updatedUser)}
          />
        )}
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
      )}{" "}
    </>
  );
};

export default UserManagement;
