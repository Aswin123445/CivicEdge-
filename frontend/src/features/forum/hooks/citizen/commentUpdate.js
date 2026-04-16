import { useState } from "react";
import { useCommentsUpdateMutation } from "../../services/citizen/forumServices";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

export default function useUpdateComment() {
    const [isCommentUpdateModalOpen, setIsCommentUpdateModalOpen] = useState(false);
    const [updateCommentId, setUpdateCommentId] = useState(null);
    const [updateCommentInitialContent,setUpdateCommentInitialContent] = useState(null)
    const [updateComment,{isLoading:updateCommentLoading}] = useCommentsUpdateMutation();
    const handleUpdateComment = async() => {
        try {
            await updateComment({id:updateCommentId,data:{content:updateCommentInitialContent}}).unwrap();
            successToast({ title: "Success", description: "Comment updated successfully" });
            setIsCommentUpdateModalOpen(false);
        } catch (error) {
            const message = extractErrorMessage(error);
            errorToast({ title: "Error", description: message || "An error occurred" });
        }finally{
            setIsCommentUpdateModalOpen(false);
        }
    }
    return {
        updateCommentLoading,
        isCommentUpdateModalOpen,
        setIsCommentUpdateModalOpen,
        updateCommentId,
        setUpdateCommentId,
        updateCommentInitialContent,
        setUpdateCommentInitialContent,
        handleUpdateComment 
    }
}