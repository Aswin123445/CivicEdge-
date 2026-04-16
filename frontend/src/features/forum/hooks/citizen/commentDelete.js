import { useState } from "react";
import { useCommentDeleteMutation } from "../../services/citizen/forumServices";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

export default function useDeleteComment() {
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useCommentDeleteMutation();
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const handleDeleteComment = async () => {
    try {
      await deleteComment(deleteCommentId).unwrap();
      successToast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Error",
        description: message || "An error occurred",
      });
    } finally {
      setIsCommentDeleteModalOpen(false);
    }
  };
  return {
    deleteComment,
    deleteCommentLoading,
    isCommentDeleteModalOpen,
    setIsCommentDeleteModalOpen,
    deleteCommentId,
    setDeleteCommentId,
    handleDeleteComment,
  };
}
