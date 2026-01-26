import { User } from "lucide-react";
import UserUpdateModal from "../../components/modaals/UserUpdateModal";
import FlagModal from "../../components/modaals/UserFlagModal";
import UserCard from "../../components/UserCard";
import { useAdmin } from "../../hooks/admin/useAdminAdminsMangement";

const AdminManagement = () => {

  const {
    data,
    isLoading,
    // errir,
    // isSuccess,
    search,
    setSearch,
    // isFlagModalUser,
    setisFlagModalUser,
    setSelectedCard,
    // selectedCard
  } = useAdmin();



  if(isLoading){
    return (
      <div>loading</div>
    )
  }


  const filteredUsers = data?.results.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
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
         role = 'admin'
        />)}

      </div>
    </>
  );
};

export default AdminManagement;
