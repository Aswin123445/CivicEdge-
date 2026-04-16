import { useState } from "react";
import { useUpdatePostMutation } from "../../services/citizen/forumServices";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";

export default function useUpdatePost(id) {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatePost,{isLoading:updatePostLoading}] = useUpdatePostMutation();
    const handleUpdatePost = async(data) => {
        try {
          await updatePost({data,id}).unwrap();
          successToast({ title: "Success", description: "Post updated successfully" });
        }catch (error) {
            const message = extractErrorMessage(error);
            errorToast({ title: "Error", description: message || "An error occurred" });
        }
    }
    return {
        updatePostLoading,
        isUpdateModalOpen,
        setIsUpdateModalOpen,
        handleUpdatePost
    }
}