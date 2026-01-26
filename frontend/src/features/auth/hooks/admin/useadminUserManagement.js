
import {
  useFlagCitizenMutation,
  useGetCitizensQuery,
  useRoleChangeMutation,
} from "../../services/adminAuthApi";
import { useState } from "react";
export default function useAdminUserManagement() {
  const [page,setPage] = useState(1)
  const { data, isLoading, isSuccess } = useGetCitizensQuery(page);
  const [roleChange, roleStatus] = useRoleChangeMutation();
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); //added for testing
  const [isFlagModalUser, setisFlagModalUser] = useState(null);
  const [flagCitizen, flagStatus] = useFlagCitizenMutation();

  const handleNextPage = () => {
    if (data?.next){
      setPage(pre => pre + 1)
    }
  }
  const handlePrePage = () => {
    if (data?.previous){
      setPage(pre => pre - 1)
    }
  }
  const handleExactPage = (page) => {
    setPage(page)
  }

  const handleSave = async (updatedCard) => {
    try {
      const data = await roleChange({
        role: updatedCard.role,
        id: updatedCard.id,
      }).unwrap();
      console.log(data);
      setSelectedCard(null); // Close modal
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlag = async (updatedUser) => {
    try {
      console.log(updatedUser, "updatedUser");
      const data = await flagCitizen({
        id: updatedUser.id,
        is_active: updatedUser.is_active,
      }).unwrap();
      console.log(data);
      setSelectedCard(null); // Close modal
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    isSuccess,
    roleChange,
    roleStatus,
    search,
    setSearch,
    selectedCard,
    setSelectedCard,
    isFlagModalUser,
    setisFlagModalUser,
    flagCitizen,
    flagStatus,
    handleSave,
    handleFlag,
    data,
    handleNextPage,
    handlePrePage,
    handleExactPage
  };
}
