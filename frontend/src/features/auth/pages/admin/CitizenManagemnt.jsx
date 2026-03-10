// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import UserUpdateModal from "../../components/modaals/UserUpdateModal";
import FlagModal from "../../components/modaals/UserFlagModal";
import useAdminUserManagement from "../../hooks/admin/useadminUserManagement";
import UserCard from "../../components/UserCard";
import Pagination from "../../../../components/common/PaginationBar";
import UserManagementSectionLoader from "../../components/skeltons/loaders_skelton/UserManagementSectionLoader";
import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

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
    roleStatus
  } = useAdminUserManagement();
  if (isLoading) {
    return <UserManagementSectionLoader />;
  }

  return (
    <motion.section
      {...fadeUp}
      className="px-4 py-4 text-slate-100"
    >
      {/* ===================== */}
      {/* SEARCH BAR */}
      {/* ===================== */}
      <div className="relative mb-6 w-56">
        <input
          type="text"
          placeholder="Search users"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="
            w-full h-9 pl-3 pr-9 rounded-md
            bg-neutral-800 border border-neutral-600
            text-sm text-white
            focus:outline-none focus:ring-1 focus:ring-blue-500
          "
        />

        {isFetching && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <DottedLoaderIndicator />
          </div>
        )}
      </div>

      {/* ===================== */}
      {/* USER CARDS GRID */}
      {/* ===================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {citizens?.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
              delay: index * 0.04,
            }}
          >
            <UserCard
              user={user}
              setSelectedCard={setSelectedCard}
              setIsFlagModalUser={setisFlagModalUser}
            />
          </motion.div>
        ))}
      </div>

      {/* ===================== */}
      {/* MODALS */}
      {/* ===================== */}
      {selectedCard && (
        <UserUpdateModal
          user={selectedCard}
          onClose={() => setSelectedCard(null)}
          onSave={(updatedUser) => handleSave(updatedUser)}
          options={{ role1: "citizen", role2: "solver" }}
          status = {roleStatus}
        />
      )}

      {isFlagModalUser && (
        <FlagModal
          user={isFlagModalUser}
          onClose={() => setisFlagModalUser(null)}
          onSave={(updatedUser) => handleFlag(updatedUser)}
        />
      )}

      {/* ===================== */}
      {/* PAGINATION */}
      {/* ===================== */}
      {!isSinglePage && (
        <div className="sticky bottom-0 mt-6 py-4 bg-neutral-900">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            onPageChange={goToPage}
          />
        </div>
      )}
    </motion.section>
  );
};

export default UserManagement;
