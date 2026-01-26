import { User } from "lucide-react";
import UserUpdateModal from "../../components/modaals/UserUpdateModal";
import FlagModal from "../../components/modaals/UserFlagModal";
import useAdminUserManagement from "../../hooks/admin/useadminUserManagement";
import UserCard from "../../components/UserCard";
import Pagination from "../../../../components/common/PaginationBar";

const UserManagement = () => {
  const {
    search,
    setSearch,
    selectedCard,
    setSelectedCard,
    setisFlagModalUser,
    isFlagModalUser,
    handleSave,
    handleFlag,
    data,
    handleNextPage,
    handlePrePage,
    handleExactPage
  } = useAdminUserManagement();




  console.log(data,'data is printed');

  const filteredUsers = data?.results.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="search for user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 h-8 pl-3 pb-1 rounded-md bg-[#2B2B2B] border border-gray-600 text-white"
        />
      </div>

      {/* User cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredUsers?.map((user) => <UserCard
         key={user.id}
         user={user}
         setSelectedCard={setSelectedCard} 
         setIsFlagModalUser={setisFlagModalUser} 
        />)}
        {selectedCard && (
          <UserUpdateModal
            user={selectedCard}
            onClose={() => setSelectedCard(null)}
            onSave={(updatedUser) => handleSave(updatedUser)}
            options = { {role1:"citizen",role2:"solver"} }

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
      <Pagination currentPage={1} totalPages={5} onNext={handleNextPage} onPrev={handlePrePage} onPage={handleExactPage}/>
    </>
  );
};

export default UserManagement;
