import { useState } from "react";
import { useModeratePostsMutation } from "../../services/admin/forumServices";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";

export default function useModeratePosts(id) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modAction, setModAction] = useState("");
  const [modReason, setModReason] = useState("");
  const [modError, setModError] = useState("");
    const [moderatePosts,{isLoading:moderatePostsLoading}] = useModeratePostsMutation();
  const handleModeration = async () => {
    try{
      await moderatePosts({data:{action:modAction,reason:modReason},id}).unwrap();
    }catch(err){
      const message = extractErrorMessage(err);
      errorToast({
        title: "Error",
        description: message || "An error occurred",
      });
      setModError("Failed to process action. Please try again.");
    }finally{
        setModalOpen(false);
        setModAction("");
        setModReason("");

    }
  };
  return {
    modalOpen,
    setModalOpen,
    modAction,
    setModAction,
    modReason,
    setModReason,
    modError,
    setModError,
    handleModeration,
    moderatePostsLoading
  }
}