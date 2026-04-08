import { useState } from "react";
import { useAdminClosePollMutation, useAdminPollDetailQuery } from "../../services/admin/pollService";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { useNavigate } from "react-router-dom";
export default function useAdminPollDetails(id) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: adminPollDetail,
    isLoading: adminPollDetailLoading,
    isFetching: adminPollDetailFetching,
  } = useAdminPollDetailQuery(id);

  const [closePoll,{ isLoading: closePollLoading}] = useAdminClosePollMutation();
  const handleClosePoll = async() => {
    try{
      await closePoll(adminPollDetail?.id).unwrap(); 
      successToast({ title: "Action Successfull", description: "Poll closed successfully" });
    }catch(e){
      const message = extractErrorMessage(e); 
      errorToast({ title: "Something went wrong", description: message });
    }finally{
      setIsModalOpen(false);
    } 
  };
  return {
    adminPollDetail,
    adminPollDetailLoading,
    adminPollDetailFetching,
    handleClosePoll,
    closePollLoading,
    isModalOpen,
    setIsModalOpen,
    navigate
  };
}
