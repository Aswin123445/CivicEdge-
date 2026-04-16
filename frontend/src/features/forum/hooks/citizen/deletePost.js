import { useState } from "react";
import { usePostDeleteMutation } from "../../services/citizen/forumServices";
import { useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
export default function useDeletePost(id){
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePost,{isLoading:deletePostLoading}] = usePostDeleteMutation(id);
    const handleDeletePost = async() => {
        try {
            await deletePost(id).unwrap();
            successToast({ title: "Success", description: "Post deleted successfully" });
            navigate("/forum/home");
        } catch (error) {
            const message = extractErrorMessage(error);
            errorToast({ title: "Error", description: message || "An error occurred" });
        }
        finally{
            setIsDeleteModalOpen(false);
        }
    }
    return {
        deletePostLoading,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        handleDeletePost
    }
}