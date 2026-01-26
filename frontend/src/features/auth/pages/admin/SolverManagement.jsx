import { User } from "lucide-react";
import UserUpdateModal from "../../components/modaals/UserUpdateModal";
import FlagModal from "../../components/modaals/UserFlagModal";
import { useAdminSolver } from "../../hooks/admin/useAdminSolver";
import { UserPlus } from "lucide-react";
import SolverCreateModal from "../../components/modaals/SolverCreateModal";

// Sample user data
const SolverManagement = () => {
  const { 
    setSolvers,
    solvers,
    search,
    setSearch,
    isCreateModal,
    setIsCreateModal,
    addSolver,
    addStatus,
    roleData,
    setRoleData,
    flagData,
    setFlagData,
    handleSave,
    handleFlag
    
  } = useAdminSolver();


  const filteredsolvers = solvers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async(createdUser)=>{
    try{
      const data = await addSolver(createdUser).unwrap();
      setSolvers((prev) => [...prev, data]);

    }catch{
      console.log(addStatus.error);
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-between">
        <input
          type="text"
          placeholder="search for user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 h-8 pl-3 pb-1 rounded-md bg-[#2B2B2B] border border-gray-600 text-white"
        />
        <div className="bg-[#222121] hover:bg-gray-800 h-9 w-9 mr-4 p-1 flex justify-center items-center rounded-lg">
          <UserPlus
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsCreateModal(true)}
          />
        </div>
      </div>

      {/* User cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredsolvers.map((solver) => (
          <div
            key={solver.id}
            className="flex justify-between items-center p-4 border border-gray-700 rounded-md bg-[#1e1e1e]"
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-700   rounded-full hidden md:block h-12 w-12">
                {solver?.profile ? (
                  <img
                    src={solver.profile}
                    alt="profile"
                    className=" w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 ml-2 mt-1" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">
                  {solver.name ? solver.name : "N/A"}
                </h3>
                <p className="text-sm text-gray-400">{solver.email}</p>
                <p className="text-sm text-gray-400">
                  ID: {solver.id.substring(solver.id.length - 6)}
                </p>
                <p className="text-sm text-gray-400">
                  Zone: {solver.zone ? solver.zone : "N/A"}
                </p>
                <p className="text-sm text-gray-400">
                  Phone: {solver.phone ? solver.phone : "N/A"}
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="text-right">
              <p className="font-semibold">{solver.role}</p>
              <p className="text-sm text-gray-400">
                Member Since: {solver.created_at.substring(0, 10)}
              </p>
              <p className="text-sm text-gray-400">
                Status: {solver.is_active ? "Active" : "Suspended"}
              </p>

              {/* Buttons (large screens) */}
              <div className="hidden md:flex justify-end gap-2 mt-2">
                <button
                  className="px-2 py-1 font-semibold text-sm rounded bg-cyan-400 hover:bg-cyan-600 text-white"
                  onClick={() => setRoleData(solver)} //open modal with user data
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 rounded font-semibold text-sm bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => setFlagData(solver)}
                >
                  Flag
                </button>
              </div>

              {/* Dropdown (small screens) */}
              <div className="md:hidden relative mt-2">
                <details className="inline-block">
                  <summary className="cursor-pointer px-3 py-1 rounded bg-gray-700 text-white">
                    ⋮
                  </summary>
                  <div className="absolute right-0 mt-1 w-28 bg-[#2a2a2a] border border-gray-700 rounded shadow-lg">
                    <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600">
                      Update
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600">
                      Flag
                    </button>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ))}
        {roleData && (
          <UserUpdateModal
            user={roleData}
            onClose={() => setRoleData(null)}
            onSave={(updatedUser) => handleSave(updatedUser)}
            options = { {role1:"solver",role2:"admin"} }
          />
        )}
        {flagData && (
          <FlagModal
            user={flagData}
            onClose={() => setFlagData(null)}
            onSave={(updatedUser) => handleFlag(updatedUser)}
          />
        )}
        {isCreateModal && (
          <SolverCreateModal
            onClose={() =>setIsCreateModal(false)}
            onSave = {(createdUser) => handleCreate(createdUser)}
          />

        )}
      </div>
    </>
  );
};

export default SolverManagement;
