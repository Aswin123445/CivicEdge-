import { 
    useCreateSolverMutation, 
    useListSolversQuery, 
    useUpdateSolverMutation 
} from "../../services/adminAuthApi";
import { useEffect ,useState} from "react";
export const useAdminSolver = () => {
    const [addSolver, addStatus] = useCreateSolverMutation();
    const { data,  isSuccess } = useListSolversQuery();
    const [solvers, setSolvers] = useState([]);
    const [search, setSearch] = useState("");
    const [isCreateModal,setIsCreateModal] = useState(false)
    const [roleData, setRoleData] = useState(null);
    const [flagData, setFlagData] = useState(null);
    const [updateSolver, updateStatus] = useUpdateSolverMutation();
    const handleSave = async (updatedCard) => {
      try {
        const data = await updateSolver({
          role: updatedCard.role,
          id: updatedCard.id,
        }).unwrap();
        setSolvers((prev) =>
          prev.filter((role) => role.id !== updatedCard.id || role.role === updatedCard.role)
        );

        setRoleData(null); 
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleFlag = async (updatedUser) => {
      try {
        console.log(updatedUser, "updatedUser");
        const data = await updateSolver({
          id: updatedUser.id,
          is_active: updatedUser.is_active,
        }).unwrap();
        console.log(data);
        setRoleData(null); // Close modal
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        if(isSuccess && data?.results){
            setSolvers(data.results);
        }

    },[isSuccess, data]);

    return { 
        solvers, 
        setSolvers,
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
        updateSolver,
        updateStatus,
        handleSave,
        handleFlag  
    };
}